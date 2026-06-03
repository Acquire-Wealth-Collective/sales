import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2, LogIn } from "lucide-react";
import { I as Input } from "./input-C6vWqORp.js";
import { L as Label } from "./label-BB9sDVk8.js";
import { u as useAuthStore, B as Button } from "./router-Cxl4vns6.js";
import { toast } from "sonner";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@tanstack/react-query";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-slot";
import "zustand";
import "zustand/middleware";
const schema = z.object({
  username: z.string().trim().min(2, "Username too short").max(60),
  password: z.string().min(4, "Minimum 4 characters").max(120)
});
function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const submit = async (e) => {
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
          clientName: void 0,
          taxYears: void 0,
          latestCalculation: void 0,
          hasExistingCalculation: false
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-frost px-4 py-12", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      className: "w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-hover",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-navy px-8 py-8 text-navy-foreground", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-5 w-5", style: { color: "var(--logo)" } }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-white/70", children: "Secure access" }),
              /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-white", children: "Sales Billing Calculator" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-white/75", children: "Sign in to your enterprise R&D billing workspace." })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4 px-8 py-7", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "username", children: "Username" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "username",
                autoComplete: "username",
                value: username,
                onChange: (e) => setUsername(e.target.value),
                placeholder: "Michael Williams",
                maxLength: 60
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "password",
                type: "password",
                autoComplete: "current-password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "••••••••",
                maxLength: 120
              }
            )
          ] }),
          error && /* @__PURE__ */ jsx("div", { className: "rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-xs text-destructive", children: error }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "submit",
              disabled: loading,
              className: "w-full bg-orange text-orange-foreground hover:bg-orange/90 shadow-elevated",
              children: [
                loading ? /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(LogIn, { className: "mr-2 h-4 w-4" }),
                loading ? "Signing in..." : "Sign In"
              ]
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-muted-foreground", children: "Frontend mock authentication. Azure AD / MSAL integration ready for production." })
        ] })
      ]
    }
  ) });
}
const SplitComponent = LoginPage;
export {
  SplitComponent as component
};
