import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import appCss from "../styles.css?url";

// Site-wide access password. Change this value to update the lock.
const ACCESS_PASSWORD = "Bethebest1rr";
const ACCESS_STORAGE_KEY = "vi-site-access-granted";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nova X Trade · Solana Wallet Generator Bot" },
      { name: "description", content: "A Telegram bot that generates Solana wallets via BIP-39 HD derivation, manages user access and appeals, and monitors wallet balances." },
      { name: "author", content: "Nova X Trade" },
      { property: "og:title", content: "Nova X Trade · Solana Wallet Generator Bot" },
      { property: "og:description", content: "Telegram bot for unlimited deterministic Solana wallets from one seed phrase." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@novaxtrade" },
      { name: "twitter:title", content: "Nova X Trade · Solana Wallet Generator Bot" },
      { name: "twitter:description", content: "Telegram bot for unlimited deterministic Solana wallets from one seed phrase." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2aeeddab-cfcf-419e-b97f-4c66a015b868/id-preview-2b2b5574--d2dfcd5e-85ec-43e9-bacf-df7ffda5172b.lovable.app-1780692255108.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2aeeddab-cfcf-419e-b97f-4c66a015b868/id-preview-2b2b5574--d2dfcd5e-85ec-43e9-bacf-df7ffda5172b.lovable.app-1780692255108.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (window.localStorage.getItem(ACCESS_STORAGE_KEY) === "1") setUnlocked(true);
    } catch {
      /* storage unavailable — stay locked */
    }
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value === ACCESS_PASSWORD) {
      try {
        window.localStorage.setItem(ACCESS_STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setError("");
      setUnlocked(true);
      return;
    }
    setError("Incorrect password. Please try again.");
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Password required</CardTitle>
          <CardDescription>Enter the password to view this site.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-3">
            <Input
              type="password"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Password"
              autoFocus
            />
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Unlock
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PasswordGate>
        <Outlet />
      </PasswordGate>
    </QueryClientProvider>
  );
}
