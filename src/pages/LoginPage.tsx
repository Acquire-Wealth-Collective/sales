import { useState, useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const schema = z.object({
  username: z.string().trim().min(2, "Username too short").max(60),
  password: z.string().min(4, "Minimum 4 characters").max(120),
});

/* ── Particle network canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouse = { x: -9999, y: -9999 };

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      r: number; opacity: number;
    }

    let particles: Particle[] = [];
    const COUNT = 90;
    const MAX_DIST = 140;
    const MOUSE_DIST = 180;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.5 + 0.3,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Subtle mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < MOUSE_DIST) {
          const force = (MOUSE_DIST - md) / MOUSE_DIST * 0.012;
          p.vx += (mdx / md) * force;
          p.vy += (mdy / md) * force;
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 1.2) { p.vx = (p.vx / speed) * 1.2; p.vy = (p.vy / speed) * 1.2; }
        }
      });

      // Lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(145,170,157,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Dots
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(145,170,157,${p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => { resize(); init(); };

    resize();
    init();
    draw();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />;
}

/* ── Login page ── */
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

      {/* Interactive particle canvas */}
      <ParticleCanvas />

      {/* Ambient glow layers */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-40 top-1/4 h-[600px] w-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #1a3a5c 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3E606F 0%, transparent 70%)", filter: "blur(100px)" }}
        />
      </div>

      {/* Left panel — branding */}
      <div className="relative z-10 hidden flex-col justify-between p-14 lg:flex lg:w-[58%]">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ background: "rgba(145,170,157,0.1)", border: "1px solid rgba(145,170,157,0.2)" }}
          >
            <span className="text-xs font-bold tracking-tight" style={{ color: "#91AA9D" }}>SB</span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(145,170,157,0.55)" }}>
            Acquire Tax Credits
          </span>
        </motion.div>

        {/* Headline */}
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "#91AA9D" }}
          >
            Enterprise Platform
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-black uppercase leading-[1.0] tracking-tight"
            style={{ color: "#FCFFF5", fontSize: "clamp(2.6rem,4.5vw,4.2rem)" }}
          >
            THE NEW<br />
            STANDARD<br />
            IN&nbsp;&nbsp;R&amp;D TAX<br />
            BILLING.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 max-w-sm text-sm leading-relaxed"
            style={{ color: "rgba(209,219,189,0.5)" }}
          >
            Streamline multi-entity R&D tax credit calculations, client billing,
            and engagement tracking in one secure workspace.
          </motion.p>

          {/* Chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {["Multi-Entity Billing", "Real-Time Calculations", "Secure Workspace"].map((chip) => (
              <div
                key={chip}
                className="rounded-full px-4 py-1.5 text-xs"
                style={{
                  background: "rgba(145,170,157,0.06)",
                  border: "1px solid rgba(145,170,157,0.14)",
                  color: "#91AA9D",
                }}
              >
                {chip}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-[11px] uppercase tracking-widest"
          style={{ color: "rgba(145,170,157,0.2)" }}
        >
          © {new Date().getFullYear()} Acquire Tax Credits
        </motion.p>
      </div>

      {/* Right panel — form */}
      <div className="relative z-10 flex flex-1 items-center justify-center p-8">
        {/* Divider */}
        <div
          className="absolute bottom-0 left-0 top-0 hidden w-px lg:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(145,170,157,0.1) 30%, rgba(145,170,157,0.1) 70%, transparent)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[360px]"
        >
          <div
            className="rounded-2xl p-8"
            style={{
              background: "rgba(13,27,42,0.75)",
              border: "1px solid rgba(145,170,157,0.1)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#FCFFF5" }}>
                Sign in
              </h2>
              <p className="mt-1.5 text-sm" style={{ color: "rgba(145,170,157,0.55)" }}>
                Access your billing workspace.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="username"
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: "rgba(209,219,189,0.5)" }}
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
                  className="h-11 rounded-lg text-sm text-white placeholder:text-white/20 focus-visible:ring-1"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(145,170,157,0.14)",
                    outline: "none",
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: "rgba(209,219,189,0.5)" }}
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
                  className="h-11 rounded-lg text-sm text-white placeholder:text-white/20 focus-visible:ring-1"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(145,170,157,0.14)",
                  }}
                />
              </div>

              {error && (
                <div
                  className="rounded-lg px-4 py-2.5 text-xs"
                  style={{
                    background: "rgba(220,50,50,0.08)",
                    border: "1px solid rgba(220,50,50,0.2)",
                    color: "#ff8080",
                  }}
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="mt-2 h-11 w-full rounded-lg text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
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
            style={{ color: "rgba(145,170,157,0.2)" }}
          >
            Azure AD / MSAL ready
          </p>
        </motion.div>
      </div>
    </div>
  );
}
