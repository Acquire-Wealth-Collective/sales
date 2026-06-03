import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { motion } from "framer-motion";
import { LogIn, Loader2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const schema = z.object({
  username: z.string().trim().min(2, "Username too short").max(60),
  password: z.string().min(4, "Minimum 4 characters").max(120),
});

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
    <div
      className="relative flex min-h-screen overflow-hidden"
      style={{ background: "#0D1B2A" }}
    >
      {/* ── Ambient glow layers ── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-40 top-1/4 h-[600px] w-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #0D1B2A 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #1a3a5c 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3E606F 0%, transparent 70%)", filter: "blur(100px)" }}
        />
      </div>

      {/* ── Dot grid overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(rgba(145,170,157,0.6) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Diagonal mesh lines ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #91AA9D 1px, transparent 1px), linear-gradient(-45deg, #91AA9D 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Left panel — branding ── */}
      <div className="relative hidden flex-col justify-between p-14 lg:flex lg:w-[58%]">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ background: "rgba(145,170,157,0.12)", border: "1px solid rgba(145,170,157,0.25)" }}
          >
            <span className="text-xs font-bold tracking-tight" style={{ color: "#91AA9D" }}>SB</span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(145,170,157,0.6)" }}>
            Acquire Tax Credits
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "#91AA9D" }}
          >
            Enterprise Platform
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[clamp(2.8rem,5vw,4.5rem)] font-black uppercase leading-[1.0] tracking-tight"
            style={{ color: "#FCFFF5" }}
          >
            THE NEW<br />
            STANDARD<br />
            IN&nbsp;&nbsp;&nbsp;R&amp;D TAX<br />
            BILLING.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-7 max-w-sm text-sm leading-relaxed"
            style={{ color: "rgba(209,219,189,0.55)" }}
          >
            Streamline multi-entity R&D tax credit calculations, client billing,
            and engagement tracking in one secure workspace.
          </motion.p>

          {/* Stat chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {[
              { label: "Multi-Entity", sub: "Billing" },
              { label: "Real-Time", sub: "Calculations" },
              { label: "Secure", sub: "Workspace" },
            ].map((chip) => (
              <div
                key={chip.label}
                className="rounded-full px-4 py-2 text-xs"
                style={{
                  background: "rgba(145,170,157,0.07)",
                  border: "1px solid rgba(145,170,157,0.15)",
                  color: "#91AA9D",
                }}
              >
                <span style={{ color: "#D1DBBD" }}>{chip.label}</span> {chip.sub}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-[11px] uppercase tracking-widest"
          style={{ color: "rgba(145,170,157,0.25)" }}
        >
          © {new Date().getFullYear()} Acquire Tax Credits
        </motion.p>
      </div>

      {/* ── Right panel — login form ── */}
      <div className="relative flex flex-1 items-center justify-center p-8">
        {/* Vertical divider */}
        <div
          className="absolute bottom-0 left-0 top-0 hidden w-px lg:block"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(145,170,157,0.12) 30%, rgba(145,170,157,0.12) 70%, transparent)" }}
        />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[360px]"
        >
          {/* Form card */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "rgba(13,27,42,0.8)",
              border: "1px solid rgba(145,170,157,0.12)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="mb-8">
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{ color: "#FCFFF5" }}
              >
                Sign in
              </h2>
              <p className="mt-1.5 text-sm" style={{ color: "rgba(145,170,157,0.6)" }}>
                Access your billing workspace.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="username"
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: "rgba(209,219,189,0.6)" }}
                >
                  Username
                </label>
                <Input
                  id="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  maxLength={60}
                  className="h-11 rounded-lg text-sm text-white placeholder:text-white/20"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(145,170,157,0.15)",
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: "rgba(209,219,189,0.6)" }}
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  maxLength={120}
                  className="h-11 rounded-lg text-sm text-white placeholder:text-white/20"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(145,170,157,0.15)",
                  }}
                />
              </div>

              {error && (
                <div
                  className="rounded-lg px-4 py-2.5 text-xs"
                  style={{ background: "rgba(220,50,50,0.1)", border: "1px solid rgba(220,50,50,0.25)", color: "#ff8080" }}
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="mt-2 h-11 w-full rounded-lg text-sm font-semibold tracking-wide"
                style={{ background: "#3E606F", color: "#FCFFF5" }}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="mr-2 h-4 w-4" />
                )}
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </div>

          <p
            className="mt-5 text-center text-[11px] uppercase tracking-widest"
            style={{ color: "rgba(145,170,157,0.25)" }}
          >
            Azure AD / MSAL ready
          </p>
        </motion.div>
      </div>
    </div>
  );
}
