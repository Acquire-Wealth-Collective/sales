import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ChevronRight, Check, Circle, Plus, Search, X, Layers, Users, Briefcase, FileText, ScrollText, MoreHorizontal, Eye, Pencil, Calculator, FileSignature, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { I as Input } from "./input-C6vWqORp.js";
import { c as cn, b as buttonVariants, B as Button } from "./router-Cxl4vns6.js";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { K as KpiCard } from "./KpiCard-D20NQduz.js";
import { E as EditClientDialog, S as StatusBadge } from "./EditClientDialog-CRTu_e3r.js";
import { z } from "zod";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-Cy5v5AOr.js";
import { L as Label } from "./label-BB9sDVk8.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CWKX9Xdb.js";
import { u as useLeadsStore } from "./leadsStore-DDNAr1jP.js";
import { M as MultiYearSelect, A as ALL_TAX_YEARS, Y as YearChips } from "./MultiYearSelect-CyogHz5O.js";
import { f as formatDate } from "./format-msZ4TtaS.js";
import "@tanstack/react-query";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "zustand";
import "zustand/middleware";
import "./textarea-Df_onAUx.js";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
import "@radix-ui/react-popover";
import "@radix-ui/react-separator";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
const SOURCES = [
  "Referral",
  "Website",
  "Cold Call",
  "Conference",
  "LinkedIn",
  "Partner",
  "Other"
];
const REPS = ["David Kim", "James Carter", "Sarah Johnson", "Unassigned"];
const schema = z.object({
  fullName: z.string().trim().min(1, "Required").max(120),
  company: z.string().trim().min(1, "Required").max(160),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Invalid phone").max(40),
  source: z.enum([
    "Referral",
    "Website",
    "Cold Call",
    "Conference",
    "LinkedIn",
    "Partner",
    "Other"
  ]),
  rep: z.enum(["David Kim", "James Carter", "Sarah Johnson", "Unassigned"])
});
const initial = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  source: "Website",
  rep: "Unassigned"
};
function AddLeadDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initial);
  const [years, setYears] = useState([]);
  const [errors, setErrors] = useState({});
  const addLead = useLeadsStore((s) => s.addLead);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleYear = (y) => setYears((p) => p.includes(y) ? p.filter((x) => x !== y) : [...p, y].sort((a, b) => a - b));
  const submit = (e) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fe = {};
      for (const issue of parsed.error.issues) fe[issue.path[0]] = issue.message;
      setErrors(fe);
      return;
    }
    addLead({ ...parsed.data, taxYears: years, entitiesCount: 0 });
    toast.success("Lead added", {
      description: `${parsed.data.fullName} · ${parsed.data.company}`
    });
    setForm(initial);
    setYears([]);
    setErrors({});
    setOpen(false);
  };
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "bg-orange hover:bg-orange/90 text-orange-foreground shadow-elevated", children: [
      /* @__PURE__ */ jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
      " Add New Lead"
    ] }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-navy", children: "Add New Lead" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Create a new lead and assign a representative." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "grid gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsx(Field, { label: "Full Name", error: errors.fullName, children: /* @__PURE__ */ jsx(
            Input,
            {
              value: form.fullName,
              onChange: (e) => set("fullName", e.target.value),
              placeholder: "Jane Doe"
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "Company / Entity", error: errors.company, children: /* @__PURE__ */ jsx(
            Input,
            {
              value: form.company,
              onChange: (e) => set("company", e.target.value),
              placeholder: "Acme Inc."
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsx(Field, { label: "Email", error: errors.email, children: /* @__PURE__ */ jsx(
            Input,
            {
              type: "email",
              value: form.email,
              onChange: (e) => set("email", e.target.value),
              placeholder: "jane@acme.com"
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "Phone", error: errors.phone, children: /* @__PURE__ */ jsx(
            Input,
            {
              value: form.phone,
              onChange: (e) => set("phone", e.target.value),
              placeholder: "(555) 123-4567"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsx(Field, { label: "Lead Source", children: /* @__PURE__ */ jsxs(Select, { value: form.source, onValueChange: (v) => set("source", v), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: SOURCES.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s, children: s }, s)) })
          ] }) }),
          /* @__PURE__ */ jsx(Field, { label: "Assigned Sales Representative", children: /* @__PURE__ */ jsxs(Select, { value: form.rep, onValueChange: (v) => set("rep", v), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: REPS.map((r) => /* @__PURE__ */ jsx(SelectItem, { value: r, children: r }, r)) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(Field, { label: "Engagement Years", children: /* @__PURE__ */ jsx(
          MultiYearSelect,
          {
            value: years,
            onToggle: toggleYear,
            onSelectAll: () => setYears([...ALL_TAX_YEARS]),
            onClear: () => setYears([])
          }
        ) }),
        /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-2", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: () => setOpen(false), children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", className: "bg-orange text-white hover:bg-orange/90", children: "Add Lead" })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  error,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Label, { className: "mb-1.5 block", children: label }),
    children,
    error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-destructive", children: error })
  ] });
}
function hasExistingCalculation(lead) {
  return typeof lead.latestCalculation === "string" && lead.latestCalculation.trim() !== "—";
}
function buildCalculationSearch(lead) {
  return {
    clientName: lead.company,
    taxYears: lead.taxYears.join(","),
    latestCalculation: lead.latestCalculation,
    hasExistingCalculation: hasExistingCalculation(lead)
  };
}
const PAGE_SIZE = 10;
const KPI_TO_STATUS = {
  new: "new",
  active: "active_engagement",
  calc: "calculation_sent",
  sow: "sow_signed"
};
function PipelinePage() {
  const leads = useLeadsStore((s) => s.leads);
  const deleteLead = useLeadsStore((s) => s.deleteLead);
  const setStatus = useLeadsStore((s) => s.setStatus);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [kpiFilter, setKpiFilter] = useState(null);
  const [sortField, setSortField] = useState("added");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [editing, setEditing] = useState(null);
  const kpis = useMemo(
    () => ({
      total: leads.length,
      new: leads.filter((l) => l.status === "new").length,
      active: leads.filter((l) => l.status === "active_engagement").length,
      calcSent: leads.filter((l) => l.status === "calculation_sent").length,
      sowSigned: leads.filter((l) => l.status === "sow_signed").length
    }),
    [leads]
  );
  useMemo(() => leads.filter((l) => l.status === "active_engagement"), [leads]);
  useMemo(() => leads.filter((l) => l.status === "sow_signed"), [leads]);
  const isFiltered = !!kpiFilter || query.trim().length > 0;
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = leads.filter((l) => {
      const matchQ = !q || l.fullName.toLowerCase().includes(q) || l.company.toLowerCase().includes(q);
      const matchK = !kpiFilter || kpiFilter === "total" || l.status === KPI_TO_STATUS[kpiFilter];
      return matchQ && matchK;
    });
    rows = [...rows].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      switch (sortField) {
        case "status":
          return a.status.localeCompare(b.status) * dir;
        case "rep":
          return a.rep.localeCompare(b.rep) * dir;
        case "entities":
          return (a.entitiesCount - b.entitiesCount) * dir;
        case "latest":
          return a.latestCalculation.localeCompare(b.latestCalculation) * dir;
        case "added":
          return (new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime()) * dir;
        case "years":
          return (a.taxYears.length - b.taxYears.length) * dir;
      }
    });
    return rows;
  }, [leads, query, kpiFilter, sortField, sortDir]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const goCalc = (l) => {
    navigate({ to: "/", search: buildCalculationSearch(l) });
  };
  const goProfile = (l) => navigate({ to: "/clients/$id", params: { id: l.id } });
  const onSort = (f) => {
    if (f === sortField) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortField(f);
      setSortDir("asc");
    }
  };
  const clearAll = () => {
    setKpiFilter(null);
    setQuery("");
    setPage(1);
  };
  const onKpiClick = (f) => {
    setKpiFilter((cur) => cur === f ? null : f);
    setPage(1);
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-cyan", children: "Dashboard" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-1 text-3xl font-bold text-navy", children: "Client Dashboard" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Manage leads, send proposals, and track active engagements." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-72", children: [
          /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: query,
              onChange: (e) => {
                setQuery(e.target.value);
                setPage(1);
              },
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
        /* @__PURE__ */ jsx(AddLeadDialog, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5", children: [
      /* @__PURE__ */ jsx(KpiButton, { active: kpiFilter === "total", onClick: () => onKpiClick("total"), children: /* @__PURE__ */ jsx(
        KpiCard,
        {
          label: "Total",
          value: kpis.total,
          icon: Layers,
          accent: "navy",
          labelClassName: "text-[#00264A]",
          mini: true
        }
      ) }),
      /* @__PURE__ */ jsx(KpiButton, { active: kpiFilter === "new", onClick: () => onKpiClick("new"), children: /* @__PURE__ */ jsx(KpiCard, { label: "New", value: kpis.new, icon: Users, accent: "cyan", mini: true }) }),
      /* @__PURE__ */ jsx(KpiButton, { active: kpiFilter === "active", onClick: () => onKpiClick("active"), children: /* @__PURE__ */ jsx(KpiCard, { label: "Active", value: kpis.active, icon: Briefcase, accent: "green", mini: true }) }),
      /* @__PURE__ */ jsx(KpiButton, { active: kpiFilter === "calc", onClick: () => onKpiClick("calc"), children: /* @__PURE__ */ jsx(
        KpiCard,
        {
          label: "Calculations Sent",
          value: kpis.calcSent,
          icon: FileText,
          accent: "orange",
          mini: true
        }
      ) }),
      /* @__PURE__ */ jsx(KpiButton, { active: kpiFilter === "sow", onClick: () => onKpiClick("sow"), children: /* @__PURE__ */ jsx(
        KpiCard,
        {
          label: "SOW Signed",
          value: kpis.sowSigned,
          icon: ScrollText,
          accent: "violet",
          mini: true
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-border bg-card shadow-card", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between gap-3 border-b border-border bg-gradient-frost px-5 py-4", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-base font-semibold text-navy", children: [
          "All Leads & Clients",
          kpiFilter && /* @__PURE__ */ jsxs("span", { className: "ml-2 text-xs font-normal text-muted-foreground", children: [
            "· filtered by ",
            kpiLabel(kpiFilter)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
          filtered.length,
          " record",
          filtered.length === 1 ? "" : "s"
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        PipelineTable,
        {
          rows: paged,
          sortField,
          sortDir,
          onSort,
          onProfile: goProfile,
          onCalc: goCalc,
          onEdit: (l) => setEditing(l),
          onSignSow: (l) => {
            setStatus(l.id, "sow_signed");
            toast.success("SOW signed", { description: l.company });
          },
          onDelete: (l) => setPendingDelete(l.id),
          emptyText: "No leads match your filters."
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 border-t border-border px-5 py-3 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          filtered.length,
          " result",
          filtered.length === 1 ? "" : "s"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              disabled: page === 1,
              onClick: () => setPage((p) => p - 1),
              children: "Prev"
            }
          ),
          /* @__PURE__ */ jsxs("span", { children: [
            "Page ",
            page,
            " of ",
            pageCount
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              disabled: page >= pageCount,
              onClick: () => setPage((p) => p + 1),
              children: "Next"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(AlertDialog, { open: !!pendingDelete, onOpenChange: (o) => !o && setPendingDelete(null), children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete this lead?" }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: "This action cannot be undone. KPIs will update automatically." })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            onClick: () => {
              if (pendingDelete) {
                deleteLead(pendingDelete);
                toast.success("Lead deleted");
              }
              setPendingDelete(null);
            },
            children: "Delete"
          }
        )
      ] })
    ] }) }),
    editing && /* @__PURE__ */ jsx(
      EditClientDialog,
      {
        lead: editing,
        open: !!editing,
        onOpenChange: (o) => !o && setEditing(null)
      }
    )
  ] });
}
function kpiLabel(f) {
  return {
    total: "Total",
    new: "New",
    active: "Active",
    calc: "Calculations Sent",
    sow: "SOW Signed"
  }[f];
}
function KpiButton({
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
function PipelineTable(p) {
  return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: [
      /* @__PURE__ */ jsx(
        SortableTh,
        {
          label: "Status",
          field: "status",
          sortField: p.sortField,
          sortDir: p.sortDir,
          onSort: p.onSort
        }
      ),
      /* @__PURE__ */ jsx(
        SortableTh,
        {
          label: "Years",
          field: "years",
          sortField: p.sortField,
          sortDir: p.sortDir,
          onSort: p.onSort
        }
      ),
      /* @__PURE__ */ jsx(
        SortableTh,
        {
          label: "Representative",
          field: "rep",
          sortField: p.sortField,
          sortDir: p.sortDir,
          onSort: p.onSort
        }
      ),
      /* @__PURE__ */ jsx(
        SortableTh,
        {
          label: "Entities",
          field: "entities",
          sortField: p.sortField,
          sortDir: p.sortDir,
          onSort: p.onSort
        }
      ),
      /* @__PURE__ */ jsx(
        SortableTh,
        {
          label: "Latest Calculation",
          field: "latest",
          sortField: p.sortField,
          sortDir: p.sortDir,
          onSort: p.onSort
        }
      ),
      /* @__PURE__ */ jsx(
        SortableTh,
        {
          label: "Added",
          field: "added",
          sortField: p.sortField,
          sortDir: p.sortDir,
          onSort: p.onSort
        }
      ),
      /* @__PURE__ */ jsx("th", { className: "px-5 py-3 text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxs("tbody", { children: [
      p.rows.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 7, className: "px-5 py-8 text-center text-sm text-muted-foreground", children: p.emptyText ?? "No records." }) }),
      p.rows.map((l) => /* @__PURE__ */ jsxs(
        motion.tr,
        {
          layout: true,
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "border-b border-border last:border-0 hover:bg-accent/40 transition-colors",
          children: [
            /* @__PURE__ */ jsxs("td", { className: "px-5 py-3", children: [
              /* @__PURE__ */ jsx(StatusBadge, { status: l.status }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 font-medium text-navy", children: l.fullName }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Person" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: l.company })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsx(YearChips, { years: l.taxYears }) }),
            /* @__PURE__ */ jsx("td", { className: "px-5 py-3", children: l.rep }),
            /* @__PURE__ */ jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsx(EntityCell, { names: l.entityNames ?? [], count: l.entitiesCount }) }),
            /* @__PURE__ */ jsx("td", { className: "px-5 py-3 text-muted-foreground", children: l.latestCalculation === "—" ? "—" : formatDate(l.latestCalculation) }),
            /* @__PURE__ */ jsx("td", { className: "px-5 py-3 text-muted-foreground", children: formatDate(l.addedAt) }),
            /* @__PURE__ */ jsx("td", { className: "px-5 py-3 text-right", children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => p.onProfile(l), children: [
                  /* @__PURE__ */ jsx(Eye, { className: "mr-2 h-4 w-4" }),
                  " View"
                ] }),
                /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => p.onEdit(l), children: [
                  /* @__PURE__ */ jsx(Pencil, { className: "mr-2 h-4 w-4" }),
                  " Edit"
                ] }),
                /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => p.onCalc(l), children: [
                  /* @__PURE__ */ jsx(Calculator, { className: "mr-2 h-4 w-4" }),
                  hasExistingCalculation(l) ? "Open Existing Calculation" : "Create Calculation"
                ] }),
                /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => p.onSignSow(l), children: [
                  /* @__PURE__ */ jsx(FileSignature, { className: "mr-2 h-4 w-4" }),
                  " Sign SOW"
                ] }),
                /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                /* @__PURE__ */ jsxs(
                  DropdownMenuItem,
                  {
                    className: "text-destructive focus:text-destructive",
                    onClick: () => p.onDelete(l),
                    children: [
                      /* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                      " Delete"
                    ]
                  }
                )
              ] })
            ] }) })
          ]
        },
        l.id
      ))
    ] })
  ] }) });
}
function SortableTh({
  label,
  field,
  sortField,
  sortDir,
  onSort
}) {
  const isActive = sortField === field;
  const Icon = !isActive ? ArrowUpDown : sortDir === "asc" ? ArrowUp : ArrowDown;
  return /* @__PURE__ */ jsx("th", { className: "px-5 py-3", children: /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: () => onSort(field),
      className: cn(
        "inline-flex items-center gap-1 transition-colors hover:text-navy",
        isActive && "text-navy"
      ),
      children: [
        label,
        /* @__PURE__ */ jsx(
          Icon,
          {
            className: cn("h-3 w-3 transition-opacity", isActive ? "opacity-100" : "opacity-50")
          }
        )
      ]
    }
  ) });
}
const ENTITY_PREVIEW = 3;
function EntityCell({ names, count }) {
  const [expanded, setExpanded] = useState(false);
  const filtered = names.filter(Boolean);
  if (filtered.length === 0) {
    return count > 0 ? /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
      count,
      " ",
      count === 1 ? "entity" : "entities"
    ] }) : /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "—" });
  }
  const visible = expanded ? filtered : filtered.slice(0, ENTITY_PREVIEW);
  const overflow = filtered.length - ENTITY_PREVIEW;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
    visible.map((name) => /* @__PURE__ */ jsx("p", { className: "text-sm text-navy leading-snug", children: name }, name)),
    overflow > 0 && !expanded && /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setExpanded(true),
        className: "mt-0.5 text-xs font-medium text-cyan hover:underline",
        children: [
          "+",
          overflow,
          " more"
        ]
      }
    ),
    expanded && filtered.length > ENTITY_PREVIEW && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setExpanded(false),
        className: "mt-0.5 text-xs font-medium text-muted-foreground hover:underline",
        children: "Show less"
      }
    )
  ] });
}
const SplitComponent = PipelinePage;
export {
  SplitComponent as component
};
