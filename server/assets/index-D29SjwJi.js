import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { BadgeCheck, AlertCircle, Trash2, ChevronDown, Building2, DollarSign, ArrowUpDown, Plus, Layers, Calculator, Share2, FileDown } from "lucide-react";
import { I as Input } from "./input-C6vWqORp.js";
import { L as Label } from "./label-BB9sDVk8.js";
import { c as cn, B as Button } from "./router-Cxl4vns6.js";
import { T as Textarea } from "./textarea-Df_onAUx.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CWKX9Xdb.js";
import { K as KpiCard } from "./KpiCard-D20NQduz.js";
import { A as ALL_TAX_YEARS, B as Badge, F as FILING_STATUSES, Y as YearChips, M as MultiYearSelect } from "./MultiYearSelect-CyogHz5O.js";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { create } from "zustand";
import { t as toNumber, a as formatCurrency } from "./format-msZ4TtaS.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-slot";
import "zustand/middleware";
import "@radix-ui/react-select";
import "@radix-ui/react-popover";
import "@radix-ui/react-separator";
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];
const STATE_CREDIT_ELIGIBLE = /* @__PURE__ */ new Set([
  "Arizona",
  "California",
  "Georgia",
  "Illinois",
  "Iowa",
  "New Jersey",
  "New York",
  "North Carolina",
  "Utah"
]);
const isStateCreditEligible = (s) => STATE_CREDIT_ELIGIBLE.has(s);
const newEntity = (i) => ({
  id: `ent_${Date.now()}_${i}_${Math.random().toString(36).slice(2, 7)}`,
  companyName: "",
  state: "",
  employeeCount: "",
  estimatedQRAs: "",
  grossCredit: "",
  w2Wages: "",
  contractResearch: "",
  supplies: "",
  otherQualified: "",
  notes: ""
});
const useCalculatorStore = create((set) => ({
  client: {
    clientName: "",
    taxYears: [2025],
    filingStatus: "mfj"
  },
  entityCountInput: 1,
  entities: [],
  notes: "",
  setClientField: (k, v) => set((s) => ({ client: { ...s.client, [k]: v } })),
  toggleTaxYear: (y) => set((s) => {
    const has = s.client.taxYears.includes(y);
    const next = has ? s.client.taxYears.filter((x) => x !== y) : [...s.client.taxYears, y];
    next.sort((a, b) => a - b);
    return { client: { ...s.client, taxYears: next } };
  }),
  selectAllTaxYears: () => set((s) => ({ client: { ...s.client, taxYears: [...ALL_TAX_YEARS] } })),
  clearTaxYears: () => set((s) => ({ client: { ...s.client, taxYears: [] } })),
  setEntityCountInput: (n) => set({ entityCountInput: Math.max(1, Math.min(50, n)) }),
  generateEntities: (n) => set(() => ({ entities: Array.from({ length: n }, (_, i) => newEntity(i)) })),
  addEntity: () => set((s) => ({ entities: [...s.entities, newEntity(s.entities.length)] })),
  removeEntity: (id) => set((s) => ({ entities: s.entities.filter((e) => e.id !== id) })),
  updateEntity: (id, k, v) => set((s) => ({ entities: s.entities.map((e) => e.id === id ? { ...e, [k]: v } : e) })),
  setNotes: (s) => set({ notes: s }),
  hydrateFromLead: (clientName, taxYears) => set((s) => ({
    client: { ...s.client, clientName, taxYears: taxYears.length ? taxYears : s.client.taxYears }
  }))
}));
const FINANCIAL_FIELDS = [
  {
    k: "grossCredit",
    label: "Gross Credit Amount",
    suffix: "(Eligible with more than $6,000 USD)"
  },
  { k: "w2Wages", label: "W2 Wages (Qualified Research)" },
  { k: "contractResearch", label: "Contract Research Payments" },
  { k: "supplies", label: "Supplies" },
  { k: "otherQualified", label: "Other Qualified Expenses" }
];
const GROSS_THRESHOLD = 6e3;
function EntityCard({ entity, index }) {
  const [open, setOpen] = useState(true);
  const update = useCalculatorStore((s) => s.updateEntity);
  const remove = useCalculatorStore((s) => s.removeEntity);
  const stateEligible = !!entity.state && isStateCreditEligible(entity.state);
  const grossNumber = toNumber(entity.grossCredit);
  const grossOk = grossNumber > GROSS_THRESHOLD;
  const fullyEligible = stateEligible && grossOk;
  const eligibilityReason = !entity.state ? "Select a state to evaluate eligibility" : !stateEligible && !grossOk ? "State not eligible · Gross Credit below $6,000" : !stateEligible ? "State not eligible" : !grossOk ? "Gross Credit Amount below $6,000" : "";
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: 0.35, ease: "easeOut" },
      className: "overflow-hidden rounded-xl border border-border bg-card shadow-card hover:shadow-elevated transition-shadow",
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((o) => !o),
            className: "flex w-full items-center justify-between gap-3 border-b border-border bg-gradient-frost px-5 py-4 text-left",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white text-sm font-bold", children: index + 1 }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-navy truncate", children: entity.companyName || `Entity ${index + 1}` }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                    entity.state || "State not selected",
                    stateEligible && " · State Credit Eligible"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                fullyEligible ? /* @__PURE__ */ jsxs(Badge, { className: "bg-green text-green-foreground hover:bg-green", children: [
                  /* @__PURE__ */ jsx(BadgeCheck, { className: "mr-1 h-3 w-3" }),
                  " Eligible"
                ] }) : entity.state ? /* @__PURE__ */ jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "border-destructive/40 text-destructive bg-destructive/5",
                    children: [
                      /* @__PURE__ */ jsx(AlertCircle, { className: "mr-1 h-3 w-3" }),
                      " Not eligible"
                    ]
                  }
                ) : null,
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    onClick: (e) => {
                      e.stopPropagation();
                      remove(entity.id);
                    },
                    className: "h-8 w-8 text-muted-foreground hover:text-destructive",
                    "aria-label": "Remove entity",
                    children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  ChevronDown,
                  {
                    className: cn(
                      "h-5 w-5 text-muted-foreground transition-transform",
                      open && "rotate-180"
                    )
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.25, ease: "easeInOut" },
            children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 p-5 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2 text-sm font-semibold text-navy", children: [
                  /* @__PURE__ */ jsx(Building2, { className: "h-4 w-4 text-cyan" }),
                  " Entity Information"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { children: "Company / Entity Name" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        value: entity.companyName,
                        onChange: (e) => update(entity.id, "companyName", e.target.value),
                        placeholder: "Acme Industries, Inc.",
                        maxLength: 120
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs(Label, { className: "flex items-center gap-2", children: [
                      "State of Entity",
                      /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
                        /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-green cursor-help", children: "State Credit Eligible" }) }),
                        /* @__PURE__ */ jsx(TooltipContent, { children: "Arizona, California, Georgia, Illinois, Iowa, New Jersey, New York, North Carolina, Utah." })
                      ] }) })
                    ] }),
                    /* @__PURE__ */ jsxs(
                      Select,
                      {
                        value: entity.state,
                        onValueChange: (v) => update(entity.id, "state", v),
                        children: [
                          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select state" }) }),
                          /* @__PURE__ */ jsx(SelectContent, { className: "max-h-72", children: US_STATES.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s, children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                            s,
                            isStateCreditEligible(s) && /* @__PURE__ */ jsx(
                              "span",
                              {
                                title: "State Credit Eligible",
                                className: "inline-block h-1.5 w-1.5 rounded-full bg-green"
                              }
                            )
                          ] }) }, s)) })
                        ]
                      }
                    ),
                    stateEligible && /* @__PURE__ */ jsxs(Badge, { className: "mt-2 bg-green text-green-foreground hover:bg-green", children: [
                      /* @__PURE__ */ jsx(BadgeCheck, { className: "mr-1 h-3 w-3" }),
                      " State Credit Eligible"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(Label, { children: "Employee Count" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          type: "number",
                          min: 0,
                          value: entity.employeeCount === "" ? "" : entity.employeeCount,
                          onChange: (e) => update(
                            entity.id,
                            "employeeCount",
                            e.target.value === "" ? "" : Number(e.target.value)
                          ),
                          placeholder: "0"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(Label, { children: "Estimated QRAs" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          type: "number",
                          min: 0,
                          value: entity.estimatedQRAs === "" ? "" : entity.estimatedQRAs,
                          onChange: (e) => update(
                            entity.id,
                            "estimatedQRAs",
                            e.target.value === "" ? "" : Number(e.target.value)
                          ),
                          placeholder: "0"
                        }
                      )
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2 text-sm font-semibold text-navy", children: [
                  /* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4 text-orange" }),
                  " Financial Inputs"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                  FINANCIAL_FIELDS.map(({ k, label, suffix }) => /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs(Label, { className: "flex items-baseline gap-2", children: [
                      /* @__PURE__ */ jsx("span", { children: label }),
                      suffix && /* @__PURE__ */ jsx("span", { className: "text-[11px] font-normal text-muted-foreground", children: suffix })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground", children: "$" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          type: "number",
                          min: 0,
                          className: "pl-7",
                          value: entity[k],
                          onChange: (e) => update(
                            entity.id,
                            k,
                            e.target.value === "" ? "" : Number(e.target.value)
                          ),
                          placeholder: "0"
                        }
                      )
                    ] })
                  ] }, k)),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: cn(
                        "rounded-lg border p-3 text-sm",
                        fullyEligible ? "border-green/30 bg-green/5 text-green" : "border-destructive/30 bg-destructive/5 text-destructive"
                      ),
                      children: fullyEligible ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 font-semibold", children: [
                        /* @__PURE__ */ jsx(BadgeCheck, { className: "h-4 w-4" }),
                        " Eligible for R&D Tax Credit"
                      ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 font-medium", children: [
                        /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4" }),
                        " ",
                        eligibilityReason
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { children: "Notes" }),
                    /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        value: entity.notes,
                        onChange: (e) => update(entity.id, "notes", e.target.value),
                        placeholder: "Internal notes for this entity...",
                        rows: 2,
                        maxLength: 1e3
                      }
                    )
                  ] })
                ] })
              ] })
            ] })
          },
          "body"
        ) })
      ]
    }
  );
}
function computeBilled(entities, filingRate) {
  return entities.map((e) => {
    const qre = toNumber(e.w2Wages) + toNumber(e.contractResearch) + toNumber(e.supplies) + toNumber(e.otherQualified);
    const gross = toNumber(e.grossCredit) || qre * 0.065;
    const fed = gross * (1 - filingRate);
    const stateBill = isStateCreditEligible(e.state) ? gross * 0.18 : 0;
    const sow = Math.max(7500, gross * 0.08);
    const total = sow + fed * 0.12 + stateBill * 0.15;
    return {
      id: e.id,
      company: e.companyName || "Untitled Entity",
      state: e.state || "—",
      sow,
      fed,
      stateBill,
      total
    };
  });
}
function BillingTable() {
  const entities = useCalculatorStore((s) => s.entities);
  const filing = useCalculatorStore((s) => s.client.filingStatus);
  const taxYears = useCalculatorStore((s) => s.client.taxYears);
  const rate = FILING_STATUSES.find((f) => f.value === filing)?.rate ?? 0.21;
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("total");
  const [sortDir, setSortDir] = useState("desc");
  const rows = useMemo(() => {
    const billed = computeBilled(entities, rate);
    const filtered = billed.filter(
      (r) => r.company.toLowerCase().includes(query.toLowerCase()) || r.state.toLowerCase().includes(query.toLowerCase())
    );
    filtered.sort((a, b) => {
      const aV = a[sortKey === "state_bill" ? "stateBill" : sortKey];
      const bV = b[sortKey === "state_bill" ? "stateBill" : sortKey];
      const cmp = typeof aV === "number" && typeof bV === "number" ? aV - bV : String(aV).localeCompare(String(bV));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return filtered;
  }, [entities, rate, query, sortKey, sortDir]);
  const totals = rows.reduce(
    (acc, r) => ({
      sow: acc.sow + r.sow,
      fed: acc.fed + r.fed,
      stateBill: acc.stateBill + r.stateBill,
      total: acc.total + r.total
    }),
    { sow: 0, fed: 0, stateBill: 0, total: 0 }
  );
  const setSort = (k) => {
    if (sortKey === k) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortKey(k);
      setSortDir("desc");
    }
  };
  const Th = ({ k, label, right }) => /* @__PURE__ */ jsx(
    "th",
    {
      className: `px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${right ? "text-right" : "text-left"}`,
      children: /* @__PURE__ */ jsxs("button", { onClick: () => setSort(k), className: "inline-flex items-center gap-1 hover:text-navy", children: [
        label,
        " ",
        /* @__PURE__ */ jsx(ArrowUpDown, { className: "h-3 w-3 opacity-50" })
      ] })
    }
  );
  if (entities.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-dashed border-border bg-muted/40 p-8 text-center text-sm text-muted-foreground", children: "Generate entities above to view the billing summary." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 border-b border-border bg-gradient-frost px-4 py-3", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-navy", children: "Entities Summary" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: "Filter entities...",
          className: "h-9 max-w-xs"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "sticky top-0 bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "#" }),
        /* @__PURE__ */ jsx(Th, { k: "company", label: "Entity / Company" }),
        /* @__PURE__ */ jsx(Th, { k: "state", label: "State" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Years" }),
        /* @__PURE__ */ jsx(Th, { k: "sow", label: "SOW Estimate", right: true }),
        /* @__PURE__ */ jsx(Th, { k: "fed", label: "Federal Bill", right: true }),
        /* @__PURE__ */ jsx(Th, { k: "state_bill", label: "State Bill", right: true }),
        /* @__PURE__ */ jsx(Th, { k: "total", label: "Total", right: true })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: rows.map((r, i) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: "border-b border-border last:border-0 hover:bg-accent/40 transition-colors",
          children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted-foreground", children: i + 1 }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy", children: r.company }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: r.state }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(YearChips, { years: taxYears }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right tabular-nums", children: formatCurrency(r.sow) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right tabular-nums", children: formatCurrency(r.fed) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right tabular-nums", children: formatCurrency(r.stateBill) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right font-semibold tabular-nums text-navy", children: formatCurrency(r.total) })
          ]
        },
        r.id
      )) }),
      /* @__PURE__ */ jsx("tfoot", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gradient-frost font-semibold", children: [
        /* @__PURE__ */ jsx("td", { colSpan: 4, className: "px-4 py-3 text-right text-navy", children: "Totals" }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right tabular-nums text-navy", children: formatCurrency(totals.sow) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right tabular-nums text-navy", children: formatCurrency(totals.fed) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right tabular-nums text-navy", children: formatCurrency(totals.stateBill) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right tabular-nums text-orange", children: formatCurrency(totals.total) })
      ] }) })
    ] }) })
  ] });
}
function CalculatorPage() {
  const {
    client,
    setClientField,
    toggleTaxYear,
    selectAllTaxYears,
    clearTaxYears,
    entityCountInput,
    setEntityCountInput,
    entities,
    generateEntities,
    addEntity,
    notes,
    setNotes
  } = useCalculatorStore();
  const [generating, setGenerating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const filingRate = FILING_STATUSES.find((f) => f.value === client.filingStatus)?.rate ?? 0.21;
  const totals = useMemo(() => {
    const billed = computeBilled(entities, filingRate);
    return billed.reduce(
      (a, r) => ({ sow: a.sow + r.sow, fed: a.fed + r.fed, total: a.total + r.total }),
      { sow: 0, fed: 0, total: 0 }
    );
  }, [entities, filingRate]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search);
    const name = q.get("clientName");
    const years = q.get("taxYears");
    if (name && !client.clientName) setClientField("clientName", name);
    if (years) {
      const parsed = years.split(",").map((value) => Number(value)).filter(
        (value) => Number.isInteger(value) && value >= 2020 && value <= 2026
      ).sort((a, b) => a - b);
      if (parsed.length > 0 && JSON.stringify(parsed) !== JSON.stringify(client.taxYears)) {
        setClientField("taxYears", parsed);
      }
    }
  }, [client.clientName, client.taxYears, setClientField]);
  const hasExistingCalculationContext = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("hasExistingCalculation") === "true";
  const latestCalculationLabel = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("latestCalculation") : null;
  const calculationContextMessage = hasExistingCalculationContext && latestCalculationLabel && latestCalculationLabel !== "—" ? `Existing calculation(s) found for ${client.clientName || "this client"}. Latest saved calculation: ${latestCalculationLabel}.` : `No saved calculation found yet. Generate a fresh calculation for ${client.taxYears.length ? client.taxYears.join(", ") : "the selected tax years"}.`;
  const yearsLabel = client.taxYears.length === 7 ? "All Tax Years" : client.taxYears.length === 0 ? "No years selected" : client.taxYears.join(", ");
  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 350));
    generateEntities(entityCountInput);
    setGenerating(false);
    setTimeout(() => {
      document.getElementById("entity-details")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };
  const handleDownload = async () => {
    setDownloading(true);
    await new Promise((r) => setTimeout(r, 900));
    setDownloading(false);
    toast.success("ODF generated", { description: "Billing summary ready for download." });
  };
  const handleShare = async () => {
    setSharing(true);
    await new Promise((r) => setTimeout(r, 900));
    setSharing(false);
    toast.success("Prepared for SharePoint", { description: "Package staged for upload." });
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-cyan", children: "Calculator" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-1 text-3xl font-bold text-navy", children: "Client Setup" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "mt-3 rounded-xl border px-4 py-3 text-sm",
            hasExistingCalculationContext ? "border-cyan/40 bg-cyan/8 text-cyan-foreground" : "border-amber-200 bg-amber-50 text-amber-950"
          ),
          children: calculationContextMessage
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Configure the client, generate entities, and produce a billing-ready summary." })
    ] }),
    /* @__PURE__ */ jsx(Section, { icon: /* @__PURE__ */ jsx(Building2, { className: "h-4 w-4 text-cyan" }), title: "Client Information", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Client Name" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            value: client.clientName,
            onChange: (e) => setClientField("clientName", e.target.value),
            placeholder: "e.g. Helios Biotech LLC",
            maxLength: 160
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Tax Year(s)" }),
        /* @__PURE__ */ jsx(
          MultiYearSelect,
          {
            value: client.taxYears,
            onToggle: toggleTaxYear,
            onSelectAll: selectAllTaxYears,
            onClear: clearTaxYears
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Filing Status" }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: client.filingStatus,
            onValueChange: (v) => setClientField("filingStatus", v),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsx(SelectContent, { children: FILING_STATUSES.map((f) => /* @__PURE__ */ jsxs(SelectItem, { value: f.value, children: [
                f.label,
                " (",
                Math.round(f.rate * 100),
                "%)"
              ] }, f.value)) })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { icon: /* @__PURE__ */ jsx(Layers, { className: "h-4 w-4 text-violet" }), title: "Generate Entities", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-end", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full md:w-48", children: [
        /* @__PURE__ */ jsx(Label, { children: "Number of Entities" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "number",
            min: 1,
            max: 50,
            value: entityCountInput,
            onChange: (e) => setEntityCountInput(Number(e.target.value) || 1)
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: handleGenerate,
          disabled: generating,
          className: "bg-orange hover:bg-orange/90 text-orange-foreground shadow-elevated",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
            generating ? "Generating..." : "Generate Entities"
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground md:ml-3", children: "Enter the total number of entities for this client, then click Generate to create input cards." })
    ] }) }),
    /* @__PURE__ */ jsx(
      Section,
      {
        id: "entity-details",
        icon: /* @__PURE__ */ jsx(Calculator, { className: "h-4 w-4 text-orange" }),
        title: "Entity Details & Calculations",
        subtitle: "Fill in the highlighted fields for each entity.",
        action: entities.length > 0 && /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: addEntity, children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
          " Add Entity"
        ] }),
        children: entities.length === 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-dashed border-border bg-muted/40 p-8 text-center text-sm text-muted-foreground", children: "No entities yet. Use “Generate Entities” above to create input cards." }) : /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: /* @__PURE__ */ jsx(AnimatePresence, { children: entities.map((e, i) => /* @__PURE__ */ jsx(EntityCard, { entity: e, index: i }, e.id)) }) })
      }
    ),
    /* @__PURE__ */ jsxs(
      Section,
      {
        title: "Billing Overview Summary",
        icon: /* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4 text-green" }),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 rounded-xl border border-border bg-gradient-frost p-4 lg:flex-row lg:items-start lg:justify-between lg:p-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest text-cyan", children: "Overview" }),
              /* @__PURE__ */ jsx("h3", { className: "mt-1 text-lg font-bold text-navy lg:text-xl", children: client.clientName || "Untitled Client" }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium text-navy", children: yearsLabel }),
                /* @__PURE__ */ jsx("span", { className: "mx-2 opacity-50", children: "·" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  entities.length,
                  " ",
                  entities.length === 1 ? "entity" : "entities"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid w-full gap-3 sm:grid-cols-2 lg:w-auto lg:grid-cols-4", children: [
              /* @__PURE__ */ jsx(
                KpiCard,
                {
                  compact: true,
                  label: "Total Entities",
                  value: entities.length,
                  icon: Layers,
                  accent: "navy"
                }
              ),
              /* @__PURE__ */ jsx(
                KpiCard,
                {
                  compact: true,
                  label: "Total SOW",
                  value: totals.sow,
                  icon: DollarSign,
                  accent: "orange",
                  currency: true
                }
              ),
              /* @__PURE__ */ jsx(
                KpiCard,
                {
                  compact: true,
                  label: "Federal Total",
                  value: totals.fed,
                  icon: Calculator,
                  accent: "cyan",
                  currency: true
                }
              ),
              /* @__PURE__ */ jsx(
                KpiCard,
                {
                  compact: true,
                  label: "Grand Total",
                  value: totals.total,
                  icon: DollarSign,
                  accent: "green",
                  currency: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(BillingTable, {}) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Section, { title: "Processing Team Notes", children: /* @__PURE__ */ jsx(
      Textarea,
      {
        value: notes,
        onChange: (e) => setNotes(e.target.value),
        placeholder: "Add internal processing notes here...",
        rows: 4,
        maxLength: 2e3
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse items-stretch justify-end gap-3 sm:flex-row", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          onClick: handleShare,
          disabled: sharing,
          className: "border-cyan text-cyan hover:bg-cyan/10",
          children: [
            /* @__PURE__ */ jsx(Share2, { className: "mr-1.5 h-4 w-4" }),
            sharing ? "Preparing..." : "Prepare for SharePoint"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: handleDownload,
          disabled: downloading,
          className: "bg-orange hover:bg-orange/90 text-orange-foreground shadow-elevated",
          children: [
            /* @__PURE__ */ jsx(FileDown, { className: "mr-1.5 h-4 w-4" }),
            downloading ? "Generating ODF..." : "Download ODF"
          ]
        }
      )
    ] })
  ] });
}
function Section({
  id,
  icon,
  title,
  subtitle,
  action,
  children
}) {
  return /* @__PURE__ */ jsxs("section", { id, className: "rounded-2xl border border-border bg-card p-6 shadow-card", children: [
    /* @__PURE__ */ jsxs("header", { className: "mb-5 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-2 text-base font-semibold text-navy", children: [
          icon,
          " ",
          title
        ] }),
        subtitle && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: subtitle })
      ] }),
      action
    ] }),
    children
  ] });
}
const SplitComponent = CalculatorPage;
export {
  SplitComponent as component
};
