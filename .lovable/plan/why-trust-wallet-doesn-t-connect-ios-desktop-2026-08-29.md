# Why Trust Wallet doesn't connect (iOS + desktop)

## What I found in the code

The EVM connect flow goes: `ConnectWalletButton` → `connectEVM(chainId)` → Privy `login()` → after login, a direct `wallet_switchEthereumChain` RPC call.

Three concrete problems, all in that path:

1. **Trust Wallet is not in the wallet list at all.**
   `src/providers/WalletProvider.tsx` configures Privy with
   `walletList: ['metamask', 'wallet_connect', 'coinbase_wallet', 'rainbow', 'detected_wallets']`.
   There is no Trust entry. So MetaMask gets a dedicated button (and its native deep link / extension handoff), while Trust users only ever get the generic "WalletConnect" option. That is exactly the reported symptom: MetaMask pops the app, Trust does not.

2. **`externalWallets: {}` plus a raw WalletConnect project id.**
   Nothing configures the WalletConnect connector behaviour, so on iOS the WalletConnect flow renders a QR code / generic list instead of a Trust-specific `wc:` deep link that would foreground the Trust app. On desktop, Trust's browser extension injects as `window.trustwallet` (not only `window.ethereum.isTrust`), and `detected_wallets` may not surface it depending on EIP-6963 announcement — the local check `hasInjectedEVM()` in `ConnectWalletButton.tsx:156` only looks at `ethereum.isTrust`, so it misreports Trust-extension desktops.

3. **The "Open in Trust Wallet" escape hatch is a dead end on iOS.**
   `openInTrustWallet()` uses `https://link.trustwallet.com/open_url?...`. That link opens Trust's in-app dApp browser — which Trust removed on iOS (App Store builds ship no dApp browser). So on iOS this either does nothing or lands the user on a page with no wallet to connect from. The same applies to the Solana Trust deep link at `ConnectWalletButton.tsx:119`.

Net: on iOS and on desktop, Trust can only realistically connect over **WalletConnect**, and the app currently neither surfaces Trust as a WalletConnect target nor deep-links into it.

## Proposed fix

1. Add Trust as a first-class wallet in the Privy `walletList` (alongside metamask / coinbase / rainbow) so it renders its own button with the proper connector, and keep `detected_wallets` for extensions.
2. Configure the WalletConnect connector explicitly (project id + app metadata with the real published URL) so the `wc:` URI is generated with valid metadata; without correct metadata some wallets silently refuse the session.
3. Ensure the WalletConnect modal is allowed to render on top of the app's dialog — close our own `Dialog` before calling `connectEVM` so Privy's modal isn't trapped behind/inside it (this alone can make "nothing happens" on mobile).
4. Broaden desktop detection: check `window.trustwallet`, `ethereum.providers[]`, and EIP-6963 announcements, not just `ethereum.isTrust`.
5. Replace the iOS "Open in Trust Wallet" button: on iOS show "Connect via WalletConnect" (Trust has no dApp browser there); keep the `open_url` deep link only for Android, where the dApp browser still exists.
6. Move chain switching to *after* a successful connection with a clear prompt, so a rejected/unsupported `wallet_switchEthereumChain` doesn't leave the UI looking disconnected.

## Verification

- Desktop: confirm Trust extension appears and connects, and that MetaMask still works.
- iOS: confirm the Trust button produces a WalletConnect session that foregrounds the Trust app.
- Check the browser console for Privy/WalletConnect errors during each attempt.

## Notes

One thing I could not confirm from code alone: whether the Privy app id `cmmumjclq04rm0ckyynizn99t` has the published domain allow-listed in the Privy dashboard, and whether WalletConnect project `2d51fe...` has the domain verified. If either is wrong, connections fail on real domains while appearing fine in preview. If Trust still fails after the code fix, that is the next thing to check.
