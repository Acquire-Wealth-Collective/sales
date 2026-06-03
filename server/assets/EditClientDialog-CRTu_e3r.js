import { jsxs, jsx } from "react/jsx-runtime";
import { B as Badge, M as MultiYearSelect, A as ALL_TAX_YEARS } from "./MultiYearSelect-CyogHz5O.js";
import { c as cn, B as Button } from "./router-Cxl4vns6.js";
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-Cy5v5AOr.js";
import { I as Input } from "./input-C6vWqORp.js";
import { L as Label } from "./label-BB9sDVk8.js";
import { T as Textarea } from "./textarea-Df_onAUx.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CWKX9Xdb.js";
import { u as useLeadsStore } from "./leadsStore-DDNAr1jP.js";
const META = {
  new: { label: "New", cls: "bg-cyan/15 text-cyan border-cyan/30" },
  calculation_sent: { label: "Calculation Sent", cls: "bg-orange/15 text-orange border-orange/30" },
  sow_signed: { label: "SOW Signed", cls: "bg-violet/15 text-violet border-violet/30" },
  active_engagement: { label: "Active Engagement", cls: "bg-green/15 text-green border-green/30" },
  lost: { label: "Lost", cls: "bg-destructive/10 text-destructive border-destructive/30" }
};
function StatusBadge({ status }) {
  const m = META[status];
  return /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: cn("font-medium", m.cls), children: [
    /* @__PURE__ */ jsx("span", { className: "mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current opacity-80" }),
    m.label
  ] });
}
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
const STATUSES = [
  { value: "new", label: "New" },
  { value: "calculation_sent", label: "Calculation Sent" },
  { value: "sow_signed", label: "SOW Signed" },
  { value: "active_engagement", label: "Active Engagement" },
  { value: "lost", label: "Lost" }
];
const schema = z.object({
  fullName: z.string().trim().min(1).max(120),
  company: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(40),
  source: z.enum([
    "Referral",
    "Website",
    "Cold Call",
    "Conference",
    "LinkedIn",
    "Partner",
    "Other"
  ]),
  rep: z.enum(["David Kim", "James Carter", "Sarah Johnson", "Unassigned"]),
  status: z.enum(["new", "calculation_sent", "sow_signed", "active_engagement", "lost"]),
  taxYears: z.array(z.number().int()).optional(),
  entityNames: z.string().max(2e3).optional(),
  notes: z.string().max(2e3).optional()
});
function EditClientDialog({ lead, trigger, open: openProp, onOpenChange }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = openProp ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const update = useLeadsStore((s) => s.updateLead);
  const [form, setForm] = useState({
    fullName: lead.fullName,
    company: lead.company,
    email: lead.email,
    phone: lead.phone,
    source: lead.source,
    rep: lead.rep,
    status: lead.status,
    taxYears: lead.taxYears ?? [],
    entityNames: (lead.entityNames ?? []).join(", "),
    notes: lead.notes ?? ""
  });
  useEffect(() => {
    setForm({
      fullName: lead.fullName,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      rep: lead.rep,
      status: lead.status,
      taxYears: lead.taxYears ?? [],
      entityNames: (lead.entityNames ?? []).join(", "),
      notes: lead.notes ?? ""
    });
  }, [lead]);
  const submit = (e) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error("Please check the form for errors.");
      return;
    }
    const entityNames = parsed.data.entityNames ? parsed.data.entityNames.split(",").map((name) => name.trim()).filter(Boolean) : [];
    update(lead.id, {
      ...parsed.data,
      taxYears: form.taxYears,
      entityNames,
      entitiesCount: entityNames.length || lead.entitiesCount
    });
    toast.success("Client updated", { description: form.fullName });
    setOpen(false);
  };
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    trigger && /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "text-navy flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" }),
          " Edit Client"
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Update lead details. Changes propagate to pipeline tables and KPIs." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "grid gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsx(Item, { label: "Full Name", children: /* @__PURE__ */ jsx(
            Input,
            {
              value: form.fullName,
              onChange: (e) => setForm({ ...form, fullName: e.target.value })
            }
          ) }),
          /* @__PURE__ */ jsx(Item, { label: "Company / Entity", children: /* @__PURE__ */ jsx(
            Input,
            {
              value: form.company,
              onChange: (e) => setForm({ ...form, company: e.target.value })
            }
          ) }),
          /* @__PURE__ */ jsx(Item, { label: "Email", children: /* @__PURE__ */ jsx(
            Input,
            {
              type: "email",
              value: form.email,
              onChange: (e) => setForm({ ...form, email: e.target.value })
            }
          ) }),
          /* @__PURE__ */ jsx(Item, { label: "Phone", children: /* @__PURE__ */ jsx(
            Input,
            {
              value: form.phone,
              onChange: (e) => setForm({ ...form, phone: e.target.value })
            }
          ) }),
          /* @__PURE__ */ jsx(Item, { label: "Lead Source", children: /* @__PURE__ */ jsxs(
            Select,
            {
              value: form.source,
              onValueChange: (v) => setForm({ ...form, source: v }),
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsx(SelectContent, { children: SOURCES.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s, children: s }, s)) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(Item, { label: "Assigned Sales Rep", children: /* @__PURE__ */ jsxs(
            Select,
            {
              value: form.rep,
              onValueChange: (v) => setForm({ ...form, rep: v }),
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsx(SelectContent, { children: REPS.map((r) => /* @__PURE__ */ jsx(SelectItem, { value: r, children: r }, r)) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(Item, { label: "Status", children: /* @__PURE__ */ jsxs(
            Select,
            {
              value: form.status,
              onValueChange: (v) => setForm({ ...form, status: v }),
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsx(SelectContent, { children: STATUSES.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s.value, children: s.label }, s.value)) })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(Item, { label: "Engagement Years", children: /* @__PURE__ */ jsx(
          MultiYearSelect,
          {
            value: form.taxYears,
            onToggle: (year) => setForm((prev) => ({
              ...prev,
              taxYears: prev.taxYears.includes(year) ? prev.taxYears.filter((item) => item !== year) : [...prev.taxYears, year].sort((a, b) => a - b)
            })),
            onSelectAll: () => setForm((prev) => ({ ...prev, taxYears: [...ALL_TAX_YEARS] })),
            onClear: () => setForm((prev) => ({ ...prev, taxYears: [] }))
          }
        ) }),
        /* @__PURE__ */ jsx(Item, { label: "Entity / Entities (comma separated)", children: /* @__PURE__ */ jsx(
          Textarea,
          {
            rows: 2,
            value: form.entityNames,
            onChange: (e) => setForm({ ...form, entityNames: e.target.value }),
            placeholder: "Acme LLC, Northwind Holdings"
          }
        ) }),
        /* @__PURE__ */ jsx(Item, { label: "Existing Notes", children: /* @__PURE__ */ jsx(
          Textarea,
          {
            rows: 3,
            value: form.notes,
            onChange: (e) => setForm({ ...form, notes: e.target.value })
          }
        ) }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: () => setOpen(false), children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", className: "bg-orange text-white hover:bg-orange/90", children: "Save Changes" })
        ] })
      ] })
    ] })
  ] });
}
function Item({ label, children }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Label, { className: "mb-1.5 block", children: label }),
    children
  ] });
}
export {
  EditClientDialog as E,
  StatusBadge as S
};
