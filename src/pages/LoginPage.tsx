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
    <div className="relative flex min-h-screen overflow-hidden" style={{ background: "#0D1B2A" }}>
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #3E606F 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 left-1/3 h-[600px] w-[600px] rounded-full opacity-[0.10]"
          style={{ background: "radial-gradient(circle, #91AA9D 0%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(209,219,189,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(209,219,189,0.3) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* Left panel — branding */}
      <div className="relative hidden flex-col justify-between p-12 lg:flex lg:w-[55%]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg ring-1"
            style={{ background: "rgba(145,170,157,0.15)", borderColor: "rgba(145,170,157,0.3)" }}
          >
            <span className="text-sm font-bold" style={{ color: "#91AA9D" }}>SB</span>
          </div>
          <span className="text-sm font-semibold" style={{ color: "#D1DBBD" }}>Sales Billing Calculator</span>
        </div>

        {/* Main copy */}
        <div className="max-w-lg">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "#91AA9D" }}>
            Acquire Tax Credits
          </p>
          <h1 className="text-5xl font-bold leading-tight" style={{ color: "#FCFFF5" }}>
            Enterprise R&D<br />
            Tax Credit &<br />
            Billing Platform
          </h1>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: "#91AA9D" }}>
            Streamline your R&D tax credit calculations, client billing, and engagement tracking
            in one secure workspace built for modern sales teams.
          </p>

          {/* Feature list */}
          <ul className="mt-10 space-y-4">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: "#3E606F" }} />
                <span className="text-sm" style={{ color: "#D1DBBD" }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <p className="text-xs" style={{ color: "rgba(145,170,157,0.4)" }}>
          © {new Date().getFullYear()} Acquire Tax Credits. All rights reserved.
        </p>
      </div>

      {/* Right panel — login form */}
      <div
        className="relative flex flex-1 items-center justify-center p-6"
        style={{ background: "rgba(62,96,111,0.12)" }}
      >
        {/* Vertical divider */}
        <div
          className="absolute bottom-0 left-0 top-0 hidden w-px lg:block"
          style={{ background: "rgba(145,170,157,0.15)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          {/* Card header */}
          <div className="mb-8">
            <div
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl ring-1"
              style={{ background: "rgba(145,170,157,0.12)", borderColor: "rgba(145,170,157,0.25)" }}
            >
              <ShieldCheck className="h-6 w-6" style={{ color: "#91AA9D" }} />
            </div>
            <h2 className="text-2xl font-bold" style={{ color: "#FCFFF5" }}>Welcome back</h2>
            <p className="mt-1 text-sm" style={{ color: "#91AA9D" }}>
              Sign in to your secure billing workspace.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="username" style={{ color: "#D1DBBD" }}>
                Username
              </Label>
              <Input
                id="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                maxLength={60}
                className="text-white placeholder:text-white/25"
                style={{ background: "rgba(145,170,157,0.08)", borderColor: "rgba(145,170,157,0.2)" }}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" style={{ color: "#D1DBBD" }}>
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
                className="text-white placeholder:text-white/25"
                style={{ background: "rgba(145,170,157,0.08)", borderColor: "rgba(145,170,157,0.2)" }}
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
              className="w-full py-5 text-sm font-semibold text-white shadow-elevated"
              style={{ background: "#3E606F" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#4a7285")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#3E606F")}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-[11px]" style={{ color: "rgba(145,170,157,0.4)" }}>
            Azure AD / MSAL integration ready for production.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
