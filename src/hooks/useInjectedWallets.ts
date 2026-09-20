import { useEffect, useState } from 'react';

export interface InjectedWallet {
  /** Stable identifier (rdns when available) */
  id: string;
  name: string;
  icon?: string;
  provider: any;
}

interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

interface EIP6963AnnounceEvent extends CustomEvent {
  detail: {
    info: EIP6963ProviderInfo;
    provider: any;
  };
}

const nameFromFlags = (p: any): string | null => {
  if (!p) return null;
  if (p.isTrust || p.isTrustWallet) return 'Trust Wallet';
  if (p.isCoinbaseWallet) return 'Coinbase Wallet';
  if (p.isRabby) return 'Rabby';
  if (p.isBraveWallet) return 'Brave Wallet';
  if (p.isPhantom) return 'Phantom';
  if (p.isOkxWallet || p.isOKExWallet) return 'OKX Wallet';
  if (p.isBitKeep) return 'Bitget Wallet';
  if (p.isMetaMask) return 'MetaMask';
  return null;
};

/**
 * Detects EVM browser-extension wallets ourselves instead of relying on a third-party
 * modal. Uses EIP-6963 (the modern standard, which is how Trust Wallet's extension
 * announces itself when MetaMask has taken over `window.ethereum`) and falls back to
 * legacy globals for older extensions.
 */
export const useInjectedWallets = (): InjectedWallet[] => {
  const [wallets, setWallets] = useState<InjectedWallet[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const found = new Map<string, InjectedWallet>();

    const publish = () => setWallets(Array.from(found.values()));

    const add = (wallet: InjectedWallet) => {
      if (!wallet.provider) return;
      const key = wallet.id.toLowerCase();
      const existing = found.get(key);
      // Prefer entries that carry an icon (EIP-6963) over bare legacy entries
      if (existing && !wallet.icon) return;
      found.set(key, wallet);
      publish();
    };

    const onAnnounce = (event: Event) => {
      const { info, provider } = (event as EIP6963AnnounceEvent).detail || ({} as any);
      if (!info || !provider) return;
      add({
        id: info.rdns || info.name,
        name: info.name,
        icon: info.icon,
        provider,
      });
    };

    window.addEventListener('eip6963:announceProvider', onAnnounce as EventListener);
    window.dispatchEvent(new Event('eip6963:requestProvider'));

    const scanLegacy = () => {
      const w = window as any;

      const trust = w.trustwallet || w.trustWallet;
      if (trust && typeof trust.request === 'function') {
        add({ id: 'legacy:trust', name: 'Trust Wallet', provider: trust });
      }

      const eth = w.ethereum;
      const candidates: any[] = Array.isArray(eth?.providers) ? [...eth.providers] : [];
      if (eth) candidates.push(eth);

      candidates.forEach((p, index) => {
        const name = nameFromFlags(p);
        if (!name) {
          // Unknown injected provider: still offer it, but only the primary one
          if (p === eth && candidates.length === 1) {
            add({ id: 'legacy:injected', name: 'Browser Wallet', provider: p });
          }
          return;
        }
        add({ id: `legacy:${name}:${index === candidates.length - 1 ? 'main' : index}`, name, provider: p });
      });
    };

    scanLegacy();

    // Extensions can inject/announce late — re-probe for a few seconds.
    const timers = [150, 500, 1200, 2500].map((delay) =>
      window.setTimeout(() => {
        window.dispatchEvent(new Event('eip6963:requestProvider'));
        scanLegacy();
      }, delay)
    );

    return () => {
      window.removeEventListener('eip6963:announceProvider', onAnnounce as EventListener);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // De-duplicate by wallet name (a wallet may show up via both 6963 and legacy globals)
  const byName = new Map<string, InjectedWallet>();
  wallets.forEach((w) => {
    const key = w.name.toLowerCase();
    const existing = byName.get(key);
    if (!existing || (!existing.icon && w.icon)) byName.set(key, w);
  });

  return Array.from(byName.values());
};
