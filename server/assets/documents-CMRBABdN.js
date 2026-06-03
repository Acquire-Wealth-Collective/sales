import { jsxs, jsx } from "react/jsx-runtime";
import { Link, useRouterState, Outlet } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, Plus, Layers, FolderCheck, Clock, AlertTriangle, Mail, Calendar, FileText, Pencil } from "lucide-react";
import { I as Input } from "./input-C6vWqORp.js";
import { B as Button, c as cn } from "./router-Cxl4vns6.js";
import { B as Badge, Y as YearChips } from "./MultiYearSelect-CyogHz5O.js";
import { K as KpiCard } from "./KpiCard-D20NQduz.js";
import { u as useDocumentsStore } from "./documentsStore-AtvhRc2E.js";
import { u as useDocConfigStore, D as DOC_CATEGORIES } from "./docConfigStore-DlM2ZPue.js";
import { f as formatDate } from "./format-msZ4TtaS.js";
import "@tanstack/react-query";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "zustand";
import "zustand/middleware";
import "sonner";
import "@radix-ui/react-popover";
import "@radix-ui/react-separator";
const STATUS_META = {
  received: { label: "Complete", cls: "bg-green text-green-foreground" },
  pending: { label: "Pending", cls: "bg-orange text-orange-foreground" },
  overdue: { label: "Overdue", cls: "bg-violet text-violet-foreground" }
};
const EMPTY_SELECTIONS = [];
const VALID_DOC_NAMES = new Set(DOC_CATEGORIES.flatMap((c) => c.items));
function DocumentsPage() {
  const requests = useDocumentsStore((s) => s.requests);
  const selectionsMap = useDocConfigStore((s) => s.selectionsByEngagement);
  const seedIfEmpty = useDocConfigStore((s) => s.seedIfEmpty);
  useEffect(() => {
    requests.forEach(
      (r) => seedIfEmpty(
        r.engagementId,
        r.items.map((it) => it.type).filter((t) => VALID_DOC_NAMES.has(t))
      )
    );
  }, [requests, seedIfEmpty]);
  const [query, setQuery] = useState("");
  const [kpiFilter, setKpiFilter] = useState(null);
  const statusByRequest = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    requests.forEach((r) => {
      const seeded = r.items.map((it) => it.type).filter((t) => VALID_DOC_NAMES.has(t));
      const effective = selectionsMap[r.engagementId] ?? seeded;
      const receivedSet = new Set(r.items.filter((it) => it.received).map((it) => it.type));
      const total = effective.length;
      const received = effective.filter((t) => receivedSet.has(t)).length;
      const isComplete = total > 0 && received === total;
      const isOverdue = !isComplete && new Date(r.dueDate).getTime() < Date.now();
      map.set(r.id, isComplete ? "received" : isOverdue ? "overdue" : "pending");
    });
    return map;
  }, [requests, selectionsMap]);
  const kpis = useMemo(() => {
    let complete = 0, pending = 0, overdue = 0;
    statusByRequest.forEach((s) => {
      if (s === "received") complete++;
      else if (s === "overdue") overdue++;
      else pending++;
    });
    return { total: requests.length, complete, pending, overdue };
  }, [requests, statusByRequest]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests.filter((r) => {
      const matchQ = !q || r.clientName.toLowerCase().includes(q) || r.recipientName.toLowerCase().includes(q);
      if (!matchQ) return false;
      if (!kpiFilter || kpiFilter === "total") return true;
      const s = statusByRequest.get(r.id);
      switch (kpiFilter) {
        case "complete":
          return s === "received";
        case "pending":
          return s === "pending";
        case "overdue":
          return s === "overdue";
      }
    });
  }, [requests, query, kpiFilter, statusByRequest]);
  const isFiltered = !!kpiFilter || query.trim().length > 0;
  const clearAll = () => {
    setQuery("");
    setKpiFilter(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-cyan", children: "Documents" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-1 text-3xl font-bold text-navy", children: "Document Request Overview" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Track every document request sent to your engaged clients." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-72", children: [
          /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: "Search by entity or client name...",
              className: "pl-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            onClick: clearAll,
            disabled: !isFiltered,
            className: "border-cyan text-cyan hover:bg-cyan/10",
            children: [
              /* @__PURE__ */ jsx(X, { className: "mr-1.5 h-4 w-4" }),
              " Clear Filter"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            asChild: true,
            className: "bg-orange hover:bg-orange/90 text-orange-foreground shadow-elevated",
            children: /* @__PURE__ */ jsxs(Link, { to: "/documents/configure", children: [
              /* @__PURE__ */ jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
              " Add New"
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4", children: [
      /* @__PURE__ */ jsx(
        KpiFilterButton,
        {
          active: kpiFilter === "total",
          onClick: () => setKpiFilter((c) => c === "total" ? null : "total"),
          children: /* @__PURE__ */ jsx(
            KpiCard,
            {
              label: "Total",
              value: kpis.total,
              icon: Layers,
              accent: "navy",
              labelClassName: "text-[#00264A]"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        KpiFilterButton,
        {
          active: kpiFilter === "complete",
          onClick: () => setKpiFilter((c) => c === "complete" ? null : "complete"),
          children: /* @__PURE__ */ jsx(KpiCard, { label: "Complete", value: kpis.complete, icon: FolderCheck, accent: "green" })
        }
      ),
      /* @__PURE__ */ jsx(
        KpiFilterButton,
        {
          active: kpiFilter === "pending",
          onClick: () => setKpiFilter((c) => c === "pending" ? null : "pending"),
          children: /* @__PURE__ */ jsx(KpiCard, { label: "Pending", value: kpis.pending, icon: Clock, accent: "orange" })
        }
      ),
      /* @__PURE__ */ jsx(
        KpiFilterButton,
        {
          active: kpiFilter === "overdue",
          onClick: () => setKpiFilter((c) => c === "overdue" ? null : "overdue"),
          children: /* @__PURE__ */ jsx(KpiCard, { label: "Overdue", value: kpis.overdue, icon: AlertTriangle, accent: "violet" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filtered.map((r, i) => /* @__PURE__ */ jsx(
        RequestCard,
        {
          r,
          i,
          hasConfig: r.engagementId in selectionsMap,
          configSelections: selectionsMap[r.engagementId] ?? EMPTY_SELECTIONS
        },
        r.id
      )) }),
      filtered.length === 0 && /* @__PURE__ */ jsxs("div", { className: "col-span-full rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No document requests match your filters." }),
        isFiltered && /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: clearAll,
            className: "mt-3 border-cyan text-cyan hover:bg-cyan/10",
            children: [
              /* @__PURE__ */ jsx(X, { className: "mr-1.5 h-3 w-3" }),
              " Clear Filter"
            ]
          }
        )
      ] })
    ] })
  ] });
}
function KpiFilterButton({
  active,
  onClick,
  children
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      className: cn(
        "rounded-xl text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan",
        active && "ring-2 ring-cyan ring-offset-2 ring-offset-background"
      ),
      children
    }
  );
}
function RequestCard({ r, i, hasConfig, configSelections }) {
  const toggleItem = useDocConfigStore((s) => s.toggleItem);
  const setCategoryAll = useDocConfigStore((s) => s.setCategoryAll);
  const seededFromRequest = r.items.map((it) => it.type).filter((t) => VALID_DOC_NAMES.has(t));
  const effective = hasConfig ? configSelections : seededFromRequest;
  const totalSelected = effective.length;
  const receivedSet = new Set(r.items.filter((it) => it.received).map((it) => it.type));
  const receivedCount = effective.filter((t) => receivedSet.has(t)).length;
  const isComplete = totalSelected > 0 && receivedCount === totalSelected;
  const isOverdue = !isComplete && new Date(r.dueDate).getTime() < Date.now();
  const status = isComplete ? "received" : isOverdue ? "overdue" : "pending";
  const meta = STATUS_META[status];
  const pct = totalSelected > 0 ? receivedCount / totalSelected * 100 : 0;
  const barCls = isComplete ? "bg-green" : isOverdue ? "bg-violet" : "bg-orange";
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { delay: i * 0.04 },
      className: cn(
        "rounded-2xl border bg-card shadow-card hover:shadow-elevated transition-shadow",
        isOverdue ? "border-violet/40 ring-1 ring-violet/20" : isComplete ? "border-green/40" : "border-border"
      ),
      children: [
        /* @__PURE__ */ jsxs("header", { className: "flex items-start justify-between gap-3 border-b border-border p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-navy/30 text-navy font-mono", children: r.engagementId }),
              /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-cyan/30 text-cyan font-mono", children: r.id })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mt-2 text-base font-semibold text-navy", children: r.clientName }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 flex items-center gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsx(Mail, { className: "h-3 w-3" }),
              " ",
              r.recipientName,
              " · ",
              r.recipientEmail
            ] })
          ] }),
          /* @__PURE__ */ jsx(Badge, { className: cn(meta.cls, "shrink-0"), children: meta.label })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold uppercase tracking-wider text-muted-foreground", children: "Tax Years" }),
              /* @__PURE__ */ jsx("div", { className: "mt-1.5", children: /* @__PURE__ */ jsx(YearChips, { years: r.taxYears }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-semibold uppercase tracking-wider text-muted-foreground", children: "Sent" }),
                /* @__PURE__ */ jsxs("p", { className: "mt-1.5 inline-flex items-center gap-1 text-navy", children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
                  " ",
                  formatDate(r.sentDate)
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-semibold uppercase tracking-wider text-muted-foreground", children: "Due" }),
                /* @__PURE__ */ jsxs("p", { className: "mt-1.5 inline-flex items-center gap-1 text-navy", children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
                  " ",
                  formatDate(r.dueDate)
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold uppercase tracking-wider text-muted-foreground", children: "DOCUMENTS" }),
              /* @__PURE__ */ jsxs("span", { className: "font-semibold tabular-nums text-navy", children: [
                "(",
                receivedCount,
                " / ",
                totalSelected,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsx(
              motion.div,
              {
                className: cn("h-full", barCls),
                initial: false,
                animate: { width: `${pct}%` },
                transition: { duration: 0.35, ease: "easeOut" }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("details", { className: "rounded-lg border border-border bg-muted/30 p-3 text-xs", children: [
            /* @__PURE__ */ jsxs("summary", { className: "cursor-pointer font-semibold text-navy", children: [
              /* @__PURE__ */ jsx(FileText, { className: "mr-1 inline h-3 w-3" }),
              " View document types (",
              totalSelected,
              ")"
            ] }),
            totalSelected === 0 ? /* @__PURE__ */ jsx("p", { className: "mt-2 italic text-muted-foreground", children: "No documents selected for this request" }) : /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed text-navy", children: effective.map((item, idx) => {
              const isReceived = receivedSet.has(item);
              return /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: cn("font-medium", isReceived ? "text-green" : "text-destructive"),
                    children: item
                  }
                ),
                idx < effective.length - 1 && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: ", " })
              ] }, item);
            }) }),
            /* @__PURE__ */ jsxs("div", { className: "hidden", children: [
              DOC_CATEGORIES.map((cat) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setCategoryAll(r.engagementId, cat.id, false),
                  children: cat.title
                },
                cat.id
              )),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => toggleItem(r.engagementId, ""), children: "noop" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              asChild: true,
              size: "sm",
              variant: "outline",
              className: "w-full border-cyan text-cyan hover:bg-cyan/10",
              children: /* @__PURE__ */ jsxs(Link, { to: "/documents/edit/$engagementId", params: { engagementId: r.engagementId }, children: [
                /* @__PURE__ */ jsx(Pencil, { className: "mr-1 h-3 w-3" }),
                " Edit Request"
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function DocumentsRouteComponent() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
  if (pathname === "/documents") {
    return /* @__PURE__ */ jsx(DocumentsPage, {});
  }
  return /* @__PURE__ */ jsx(Outlet, {});
}
export {
  DocumentsRouteComponent as component
};
