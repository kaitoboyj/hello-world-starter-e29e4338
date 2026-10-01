import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Wallet,
  Send,
  Shield,
  Users,
  Bot,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  Zap,
  Layers,
  Database,
  Activity,
  Clock,
  Copy,
  ExternalLink,
  Sparkles,
  MessageSquare,
  RefreshCw,
  Lock,
  Unlock,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/")({
  component: Index,
});

function StatCard({
  label,
  value,
  change,
  icon,
  accent,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <Card className="overflow-hidden border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
              <TrendingUp className="h-3 w-3" />
              <span>{change}</span>
            </div>
          </div>
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-lg ${accent}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur transition-all hover:border-white/20 hover:bg-white/[0.07]">
      <CardContent className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 ring-1 ring-violet-400/30">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function StepCard({
  step,
  title,
  description,
  icon,
}: {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Card className="h-full border-white/10 bg-white/5 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white">
              {step}
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
              {icon}
            </div>
          </div>
          <h4 className="mt-4 text-base font-semibold">{title}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function Index() {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [demoWallet, setDemoWallet] = useState<{
    address: string;
    key: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleDemoGenerate = () => {
    setGenerating(true);
    setDemoWallet(null);
    setTimeout(() => {
      const addr =
        "So1" +
        Array.from({ length: 40 }, () =>
          "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"[
            Math.floor(Math.random() * 58)
          ],
        ).join("");
      const key = Array.from({ length: 88 }, () =>
        "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"[
          Math.floor(Math.random() * 58)
        ],
      ).join("");
      setDemoWallet({ address: addr, key });
      setGenerating(false);
    }, 1400);
  };

  const recentWallets = [
    {
      id: "1",
      address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      user: "@crypto_whale",
      index: 127,
      time: "2m ago",
      status: "active",
    },
    {
      id: "2",
      address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
      user: "@sol_saver",
      index: 126,
      time: "14m ago",
      status: "active",
    },
    {
      id: "3",
      address: "3Kxz8Z6Q5DdT8yN7VwB4sF9aG2hJkLpRnXmYvCbTqWER",
      user: "@nova_user_42",
      index: 125,
      time: "31m ago",
      status: "active",
    },
    {
      id: "4",
      address: "Ek5QbN9sVp4rHjLm2xF8dT3aC6zWe7YuBgKpNnQqRrST",
      user: "@pocket_trader",
      index: 124,
      time: "1h ago",
      status: "imported",
    },
    {
      id: "5",
      address: "5fPdTqG28jWd9Lb4NzMkVsXa6YcRrEeFfGgHhIiJjKkL",
      user: "@hodl_daily",
      index: 123,
      time: "2h ago",
      status: "active",
    },
  ];

  const activityFeed = [
    {
      icon: <Wallet className="h-4 w-4 text-violet-400" />,
      text: "New HD wallet generated for @satoshi",
      time: "Just now",
      color: "bg-violet-500/10 border-violet-500/20",
    },
    {
      icon: <MessageSquare className="h-4 w-4 text-emerald-400" />,
      text: "Private key dispatched to group channel",
      time: "3s ago",
      color: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: <Users className="h-4 w-4 text-sky-400" />,
      text: "New user joined: @moon_bags",
      time: "31s ago",
      color: "bg-sky-500/10 border-sky-500/20",
    },
    {
      icon: <Unlock className="h-4 w-4 text-amber-400" />,
      text: "Wallet imported: 87x...FqK2",
      time: "1m ago",
      color: "bg-amber-500/10 border-amber-500/20",
    },
    {
      icon: <Lock className="h-4 w-4 text-rose-400" />,
      text: "Appeal approved, user unbanned",
      time: "3m ago",
      color: "bg-rose-500/10 border-rose-500/20",
    },
    {
      icon: <Sparkles className="h-4 w-4 text-fuchsia-400" />,
      text: "Mnemonic seed phrase secured (index #128)",
      time: "5m ago",
      color: "bg-fuchsia-500/10 border-fuchsia-500/20",
    },
  ];

  const schemaItems = [
    {
      name: "generated_wallets",
      desc: "HD-derived wallets + index + Telegram mapping",
      icon: <Layers className="h-4 w-4" />,
    },
    {
      name: "imported_wallets",
      desc: "External wallets with encrypted private keys",
      icon: <Unlock className="h-4 w-4" />,
    },
    {
      name: "bot_users",
      desc: "Telegram users with chat_id, username, last_seen",
      icon: <Users className="h-4 w-4" />,
    },
    {
      name: "bot_state",
      desc: "Master mnemonic + next derivation index",
      icon: <KeyRound className="h-4 w-4" />,
    },
    {
      name: "blocked_users",
      desc: "Banned users with on-chain appeal workflow",
      icon: <Lock className="h-4 w-4" />,
    },
    {
      name: "telegram_updates",
      desc: "Update id dedup to prevent double-processing",
      icon: <RefreshCw className="h-4 w-4" />,
    },
  ];

  return (
    <div
      className={`relative min-h-screen text-foreground transition-opacity duration-500 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -20%, oklch(0.45 0.2 290 / 0.35), transparent), radial-gradient(ellipse 60% 50% at 90% 30%, oklch(0.55 0.25 320 / 0.18), transparent), radial-gradient(ellipse 70% 60% at 10% 90%, oklch(0.45 0.2 260 / 0.22), transparent), oklch(0.129 0.042 264.695)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 shadow-lg shadow-fuchsia-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Nova X Trade</h1>
              <p className="text-xs text-muted-foreground">
                Solana Wallet Generator Bot
              </p>
            </div>
            <Badge className="ml-3 bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/30 hover:bg-violet-500/20">
              <Zap className="mr-1 h-3 w-3" /> HD · BIP-39 · BIP-44
            </Badge>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
            <Button variant="ghost" size="sm">
              Features
            </Button>
            <Button variant="ghost" size="sm">
              API Docs
            </Button>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-white/10 bg-white/5">
              <Database className="h-4 w-4" />
              Supabase
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/20 hover:from-violet-500 hover:to-fuchsia-500">
              <Bot className="h-4 w-4" />
              Open Telegram
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Bot online · Webhook active · 128 wallets derived
            </div>
            <h2 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Generate{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Solana wallets
              </span>
              <br />
              from one seed.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              A Telegram bot that generates unlimited deterministic Solana
              wallets from a single BIP-39 mnemonic. Every private key and
              address is delivered instantly to your DM and group channel —
              secured with Supabase.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-xl shadow-fuchsia-600/25 hover:from-violet-500 hover:to-fuchsia-500"
              >
                <Bot className="h-5 w-5" />
                Start Bot on Telegram
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/10 bg-white/5 backdrop-blur hover:bg-white/10"
              >
                <KeyRound className="h-5 w-5" />
                View Demo Flow
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/5 pt-8">
              {[
                { k: "BIP-39", v: "Seed Phrase" },
                { k: "ed25519", v: "HD Derivation" },
                { k: "Base58", v: "Solana Encoding" },
              ].map((it) => (
                <div key={it.k}>
                  <p className="font-mono text-sm font-semibold text-violet-300">
                    {it.k}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{it.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Demo panel */}
          <Card className="relative overflow-hidden border-white/10 bg-white/[0.03] p-1 backdrop-blur">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10" />
            <CardContent className="relative p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border-2 border-violet-400/40">
                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold text-white">
                      NX
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">
                      @NovaXTradeBot · Live Preview
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Simulated Telegram flow
                    </p>
                  </div>
                </div>
                <Badge className="bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30">
                  <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online
                </Badge>
              </div>

              {/* Chat */}
              <div className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="flex justify-end">
                  <div className="max-w-[75%] rounded-2xl rounded-br-md bg-gradient-to-br from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm text-white shadow-lg">
                    /generatewallet
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="bg-white/10 text-[10px] font-bold text-white">
                      NX
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-[80%] space-y-3 rounded-2xl rounded-tl-md border border-white/10 bg-white/5 px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-fuchsia-400" />
                      <p className="font-semibold">Generating wallet...</p>
                    </div>
                    <Progress
                      value={generating ? progress : demoWallet ? 100 : 0}
                      className="h-1.5"
                    />
                    {demoWallet && (
                      <div className="space-y-3 pt-1">
                        <Separator className="bg-white/10" />
                        <div>
                          <p className="mb-1 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-violet-300">
                            <Wallet className="h-3 w-3" /> Wallet Address
                          </p>
                          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 p-2">
                            <code className="flex-1 truncate font-mono text-xs text-foreground">
                              {demoWallet.address.slice(0, 18)}
                              ...
                              {demoWallet.address.slice(-8)}
                            </code>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 shrink-0"
                              onClick={() =>
                                handleCopy(demoWallet.address, "addr")
                              }
                            >
                              {copied === "addr" ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <p className="mb-1 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-rose-300">
                            <KeyRound className="h-3 w-3" /> Private Key
                          </p>
                          <div className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/5 p-2">
                            <code className="flex-1 truncate font-mono text-xs text-rose-200/90">
                              {demoWallet.key.slice(0, 18)}
                              ...
                              {demoWallet.key.slice(-8)}
                            </code>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 shrink-0"
                              onClick={() => handleCopy(demoWallet.key, "key")}
                            >
                              {copied === "key" ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300 ring-1 ring-emerald-500/20">
                          <Send className="h-3.5 w-3.5" />
                          Sent to group · -5157767003
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Index #{demoWallet ? 128 : "127"} · m/44'/501'/{demoWallet ? 128 : 127}'/0'
                </p>
                <Button
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500"
                  onClick={handleDemoGenerate}
                  disabled={generating}
                >
                  {generating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Deriving...
                    </>
                  ) : demoWallet ? (
                    <>
                      <RefreshCw className="h-4 w-4" />
                      Generate Another
                    </>
                  ) : (
                    <>
                      <Wallet className="h-4 w-4" />
                      Try Demo Generate
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Users"
            value="2,438"
            change="+128 this week"
            icon={<Users className="h-5 w-5 text-sky-400" />}
            accent="bg-sky-500/15 text-sky-400 ring-1 ring-sky-400/30"
          />
          <StatCard
            label="Wallets Generated"
            value="1,284"
            change="+62 today"
            icon={<Wallet className="h-5 w-5 text-violet-400" />}
            accent="bg-violet-500/15 text-violet-400 ring-1 ring-violet-400/30"
          />
          <StatCard
            label="Imported Wallets"
            value="317"
            change="+14 today"
            icon={<Unlock className="h-5 w-5 text-amber-400" />}
            accent="bg-amber-500/15 text-amber-400 ring-1 ring-amber-400/30"
          />
          <StatCard
            label="Appeals Resolved"
            value="94%"
            change="Avg 4.2h"
            icon={<Shield className="h-5 w-5 text-emerald-400" />}
            accent="bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/30"
          />
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 text-center">
          <Badge className="bg-white/5 text-foreground ring-1 ring-white/10">
            <Sparkles className="mr-1 h-3 w-3 text-fuchsia-400" />
            Core Features
          </Badge>
          <h3 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need,{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              inside Telegram
            </span>
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Keep the existing bot logic untouched — this dashboard is only a
            UI preview. Every command, webhook, and cron job runs exactly as before.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Wallet className="h-6 w-6 text-violet-400" />}
            title="HD Wallet Generation"
            description="Unlimited deterministic wallets from a single BIP-39 mnemonic using ed25519 HD derivation with path m/44'/501'/i'/0'."
          />
          <FeatureCard
            icon={<Send className="h-6 w-6 text-sky-400" />}
            title="Instant Telegram Delivery"
            description="Private keys and addresses are sent via bot reply and simultaneously posted to your configured group or channel."
          />
          <FeatureCard
            icon={<Unlock className="h-6 w-6 text-amber-400" />}
            title="Import Existing Wallets"
            description="Users can import their own Solana wallets. Keys are encrypted at rest before being stored in Supabase."
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6 text-emerald-400" />}
            title="Appeal Workflow"
            description="Blocked users can submit an on-chain appeal (tx hash + wallet). Admins approve and unban automatically with cron."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <Badge className="bg-white/5 text-foreground ring-1 ring-white/10">
              <Zap className="mr-1 h-3 w-3 text-violet-400" />
              How It Works
            </Badge>
            <h3 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              4 steps to your first wallet
            </h3>
          </div>
          <p className="hidden max-w-md text-sm text-muted-foreground md:block">
            The mnemonic is written once to bot_state and re-used for every
            future derivation — one seed, infinite wallets.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StepCard
            step={1}
            icon={<Bot className="h-5 w-5 text-violet-400" />}
            title="Start the Bot"
            description="User hits /start in Telegram. Bot registers chat_id, username and records last_seen."
          />
          <StepCard
            step={2}
            icon={<KeyRound className="h-5 w-5 text-fuchsia-400" />}
            title="Derive HD Index"
            description="Postgres function reserves next index. Bot derives keys from mnemonic via BIP-32 ed25519."
          />
          <StepCard
            step={3}
            icon={<Send className="h-5 w-5 text-sky-400" />}
            title="Send Address & Key"
            description="Wallet + private key dispatched as bot reply and mirrored to configured group channel."
          />
          <StepCard
            step={4}
            icon={<Database className="h-5 w-5 text-emerald-400" />}
            title="Persist & Monitor"
            description="Wallet written to generated_wallets with Telegram mapping. Index advances for next user."
          />
        </div>
      </section>

      {/* Tabs: Wallets / Activity / Schema */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <Tabs defaultValue="wallets" className="w-full">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                Live Operations Preview
              </h3>
              <p className="mt-2 text-muted-foreground">
                Mock data reflecting the live tables. Existing API routes
                (webhook, appeal-cron) are unchanged.
              </p>
            </div>
            <TabsList className="border border-white/10 bg-white/5">
              <TabsTrigger value="wallets">
                <Wallet className="mr-2 h-4 w-4" />
                Generated Wallets
              </TabsTrigger>
              <TabsTrigger value="activity">
                <Activity className="mr-2 h-4 w-4" />
                Activity Feed
              </TabsTrigger>
              <TabsTrigger value="schema">
                <Database className="mr-2 h-4 w-4" />
                Data Schema
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="wallets" className="mt-0">
            <Card className="border-white/10 bg-white/[0.03] backdrop-blur">
              <CardHeader className="flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle>Recent Generated Wallets</CardTitle>
                  <CardDescription>
                    HD-derived via m/44'/501'/i'/0' · Latest first
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/30">
                    {recentWallets.filter((w) => w.status === "active").length}{" "}
                    generated
                  </Badge>
                  <Badge className="bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30">
                    {recentWallets.filter((w) => w.status === "imported")
                      .length}{" "}
                    imported
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="text-muted-foreground">
                        Index
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Address
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Telegram
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Type
                      </TableHead>
                      <TableHead className="text-right text-muted-foreground">
                        <Clock className="ml-auto h-4 w-4" />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentWallets.map((w) => (
                      <TableRow
                        key={w.id}
                        className="border-white/5 hover:bg-white/[0.03]"
                      >
                        <TableCell className="font-mono text-sm text-violet-300">
                          #{w.index}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <code className="truncate font-mono text-xs md:max-w-xs">
                              {w.address.slice(0, 10)}...{w.address.slice(-6)}
                            </code>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7"
                              onClick={() => handleCopy(w.address, w.id)}
                            >
                              {copied === w.id ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="bg-white/5 text-[10px]">
                                {w.user.slice(1, 3).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{w.user}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {w.status === "imported" ? (
                            <Badge className="bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30">
                              Imported
                            </Badge>
                          ) : (
                            <Badge className="bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/30">
                              HD Generated
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          {w.time}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-white/5 py-4 text-xs text-muted-foreground">
                <span>Showing 5 of 1,284 wallets</span>
                <Button variant="ghost" size="sm">
                  View all rows <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-0">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 border-white/10 bg-white/[0.03] backdrop-blur">
                <CardHeader>
                  <CardTitle>Real-time Event Stream</CardTitle>
                  <CardDescription>
                    As processed by /telegram/webhook and appeal-cron
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activityFeed.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 rounded-xl border p-3 ${item.color}`}
                      >
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{item.text}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {item.time}
                          </p>
                        </div>
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500/80" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/[0.03] backdrop-blur">
                <CardHeader>
                  <CardTitle>Bot Health</CardTitle>
                  <CardDescription>
                    Last 24h availability
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Webhook Uptime
                      </span>
                      <span className="font-semibold text-emerald-400">
                        99.98%
                      </span>
                    </div>
                    <Progress value={99.98} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Telegram API Latency
                      </span>
                      <span className="font-semibold text-violet-300">
                        142ms p95
                      </span>
                    </div>
                    <Progress
                      value={72}
                      className="h-2 [&>div]:bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Appeal CRON Success
                      </span>
                      <span className="font-semibold text-emerald-400">
                        100%
                      </span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="text-xs text-muted-foreground">
                        Commands today
                      </p>
                      <p className="mt-1 text-xl font-bold">1,872</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="text-xs text-muted-foreground">
                        Failures
                      </p>
                      <p className="mt-1 text-xl font-bold text-emerald-400">
                        0
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schema" className="mt-0">
            <Card className="border-white/10 bg-white/[0.03] backdrop-blur">
              <CardHeader>
                <CardTitle>Supabase Public Schema</CardTitle>
                <CardDescription>
                  All 7 tables + the reserve_next_wallet_index stored
                  procedure — exactly as in your migrations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {schemaItems.map((s) => (
                    <div
                      key={s.name}
                      className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-violet-400/30 hover:bg-violet-500/5"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-300 ring-1 ring-violet-400/20">
                          {s.icon}
                        </div>
                        <div>
                          <p className="font-mono text-sm font-semibold">
                            {s.name}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
                    + 1 more: user_states
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10 p-5">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-violet-300">
                    <KeyRound className="h-4 w-4" />
                    reserve_next_wallet_index()
                  </div>
                  <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
{`-- Atomic index reservation — never two wallets get the same derivation path
UPDATE bot_state
SET    next_index = next_index + 1
WHERE  id = 1
RETURNING (next_index - 1) AS reserved_index;`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <Card className="relative overflow-hidden border-white/10 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/20 to-pink-600/20 p-8 backdrop-blur md:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                Ready to deploy on Telegram?
              </h3>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Bot code, webhook, and appeal cron are already live. Point your
                bot token and start generating wallets — the UI dashboard is
                purely cosmetic.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-white text-foreground hover:bg-white/90"
              >
                <Bot className="h-5 w-5" />
                Launch Bot
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 backdrop-blur hover:bg-white/10"
              >
                <Database className="h-5 w-4" />
                Supabase Dashboard
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-8 border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">Nova X Trade</p>
              <p className="text-xs text-muted-foreground">
                © 2026 · Built with TanStack Start + Supabase
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              All systems operational
            </span>
            <span>v1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
