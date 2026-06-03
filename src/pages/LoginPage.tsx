// Frontend Login page — enterprise split-panel design matching Acquire Tax Credits branding.

import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { motion } from "framer-motion";
import { LogIn, Loader2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const schema = z.object({
  username: z.string().trim().min(2, "Username too short").max(60),
  password: z.string().min(4, "Minimum 4 characters").max(120),
});

const FEATURES = [
  "Multi-entity R&D billing management",
  "Real-time calculation engine",
  "Client pipeline & engagement tracking",
  "Automated SOW & proposal workflow",
];

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ username, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setLoading(true);
    try {
      await login(parsed.data.username, parsed.data.password);
      toast.success("Welcome back", { description: parsed.data.username });
      navigate({
        to: "/",
        search: {
          clientName: undefined,
          taxYears: undefined,
          latestCalculation: undefined,
          hasExistingCalculation: false,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#09142A]">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #3B7DD8 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 left-1/3 h-[600px] w-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #1E56A0 0%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* Left panel — branding */}
      <div className="relative hidden flex-col justify-between p-12 lg:flex lg:w-[55%]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20">
            <span className="text-sm font-bold" style={{ color: "var(--orange)" }}>
              SB
            </span>
          </div>
          <span className="text-sm font-semibold text-white/90">Sales Billing Calculator</span>
        </div>

        {/* Main copy */}
        <div className="max-w-lg">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-orange/80">
            Acquire Tax Credits
          </p>
          <h1 className="text-5xl font-bold leading-tight text-white">
            Enterprise R&D<br />
            Tax Credit &<br />
            Billing Platform
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/55">
            Streamline your R&D tax credit calculations, client billing, and engagement tracking
            in one secure workspace built for modern sales teams.
          </p>

          {/* Feature list */}
          <ul className="mt-10 space-y-4">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-orange/80" />
                <span className="text-sm text-white/65">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <p className="text-xs text-white/25">
          © {new Date().getFullYear()} Acquire Tax Credits. All rights reserved.
        </p>
      </div>

      {/* Right panel — login form */}
      <div className="relative flex flex-1 items-center justify-center p-6 lg:bg-white/[0.03]">
        {/* Vertical divider */}
        <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-white/[0.07] lg:block" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          {/* Card header */}
          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
              <ShieldCheck className="h-6 w-6 text-orange/90" />
            </div>
            <h2 className="text-2xl font-bold text-white">Welcome back</h2>
            <p className="mt-1 text-sm text-white/50">
              Sign in to your secure billing workspace.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-white/70">
                Username
              </Label>
              <Input
                id="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                maxLength={60}
                className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus:border-orange/60 focus:ring-orange/25"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-white/70">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                maxLength={120}
                className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus:border-orange/60 focus:ring-orange/25"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-300">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange text-white hover:bg-orange/90 shadow-elevated py-5 text-sm font-semibold"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-[11px] text-white/25">
            Azure AD / MSAL integration ready for production.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
