# Fix: Trust Wallet extension not detected, QR shown instead of wallet popup

## What the code does today

The EVM connect path is entirely delegated to Privy:

- `src/components/ConnectWalletButton.tsx` — picking an EVM chain closes the dialog and calls `connectEVM(chainId)`.
- `src/providers/EVMWalletProvider.tsx` — `connectEVM` calls Privy's `login()`, which opens the Privy modal.
- `src/providers/WalletProvider.tsx` — `walletList: ['detected_ethereum_wallets', 'metamask', 'wallet_connect', 'coinbase_wallet', 'rainbow']`.

Nothing in the app enumerates browser-injected providers itself. Whether the Trust extension appears as a clickable button depends 100% on Privy's own EIP-6963 detection inside its modal. When Privy doesn't surface the extension, the only working entry left is `wallet_connect`, which on desktop is a QR code — which is exactly the symptom you see.

Common reasons Privy's detection misses Trust on desktop: Trust announces itself late (after Privy's provider snapshot), or another extension (MetaMask) has taken over `window.ethereum` so Trust is only reachable through its own EIP-6963 announcement or `window.trustwallet`. Either way, we should stop depending on a third-party modal for extension detection.

## Fix: own the wallet picker for EVM

1. **New EIP-6963 detection hook** (`src/hooks/useInjectedWallets.ts`)
   - Dispatch `eip6963:requestProvider` and listen for `eip6963:announceProvider`, keeping listening (extensions announce asynchronously), so late-injecting wallets still show up.
   - Merge in legacy fallbacks: `window.trustwallet` / `window.trustWallet`, `window.ethereum.providers[]`, and `window.ethereum` flags (`isTrust`, `isTrustWallet`, `isMetaMask`, `isCoinbaseWallet`).
   - De-duplicate by RDNS/name and return `{ name, icon, provider }`.

2. **EVM wallet step in the connect dialog** (`ConnectWalletButton.tsx`)
   - After choosing an EVM chain, show a new step listing every detected extension (Trust Wallet, MetaMask, etc.) with its real icon, plus:
     - "WalletConnect / QR code" as an explicit, clearly-labelled last option.
     - Mobile deep links kept as they are today (Android Trust link, MetaMask link).
   - Clicking a detected wallet connects directly to that specific provider — this triggers the extension's native popup instead of a QR code.

3. **Direct injected connect path** (`EVMWalletProvider.tsx`)
   - Add `connectInjected(provider, chainId)`: `eth_requestAccounts` → build `ethers.BrowserProvider` → `requestChainSwitch` (existing helper, failures stay non-fatal) → set address/signer/chainId state, mark chain `evm`.
   - Subscribe to that provider's `accountsChanged` / `chainChanged` and clear state on disconnect.
   - Keep the existing Privy `login()` route for the WalletConnect/QR option only.
   - `disconnectEVM` clears injected state and its listeners, and only calls Privy `logout()` when the session came from Privy.

4. **Privy config cleanup** (`WalletProvider.tsx`)
   - Keep `walletConnect` enabled with the project id (needed for the QR fallback and mobile).
   - Add `defaultChain` and keep `supportedChains` so WalletConnect sessions land on a supported chain.

## Notes

- Trust Wallet's extension does not expose Solana; the Solana list stays unchanged.
- On iOS the existing WalletConnect guidance stays, since Trust removed its in-app dApp browser there.
- For live domains, the domain must still be allow-listed in the Privy and WalletConnect (Reown) dashboards for the QR path to work.

## Verification

- Build + TypeScript check.
- Headless check that the new EVM step renders detected wallets and the WalletConnect fallback (a headless browser has no extensions, so it should show only the fallback plus deep links — confirming no crash and correct empty state).
- You then confirm on your desktop with the Trust extension installed that clicking "Trust Wallet" opens the extension popup.
