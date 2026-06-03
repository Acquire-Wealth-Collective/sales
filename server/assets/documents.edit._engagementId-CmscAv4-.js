import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Check, UserPlus, ArrowLeft, Building2, Mail, Save, ArrowRight } from "lucide-react";
import { c as cn, B as Button } from "./router-Cxl4vns6.js";
import { B as Badge, Y as YearChips } from "./MultiYearSelect-CyogHz5O.js";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { I as Input } from "./input-C6vWqORp.js";
import { L as Label } from "./label-BB9sDVk8.js";
import { T as Textarea } from "./textarea-Df_onAUx.js";
import { u as useDocumentsStore } from "./documentsStore-AtvhRc2E.js";
import { u as useEngagementsStore } from "./engagementsStore-BPDhygWq.js";
import { a as useDocContactsStore, u as useDocConfigStore, D as DOC_CATEGORIES } from "./docConfigStore-DlM2ZPue.js";
import { z } from "zod";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, f as DialogFooter } from "./dialog-Cy5v5AOr.js";
import "@tanstack/react-query";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "zustand";
import "zustand/middleware";
import "@radix-ui/react-popover";
import "@radix-ui/react-separator";
import "@radix-ui/react-label";
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
const schema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  role: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(255)
});
function AddPersonDialog({ onAdded }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", email: "" });
  const [errors, setErrors] = useState({});
  const addContact = useDocContactsStore((s) => s.addContact);
  const submit = (e) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fe = {};
      for (const i of parsed.error.issues) fe[i.path[0]] = i.message;
      setErrors(fe);
      return;
    }
    const created = addContact(parsed.data);
    toast.success("Contact added", { description: created.name });
    onAdded(created);
    setForm({ name: "", role: "", email: "" });
    setErrors({});
    setOpen(false);
  };
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", className: "border-cyan text-cyan hover:bg-cyan/10", children: [
      /* @__PURE__ */ jsx(UserPlus, { className: "mr-1.5 h-4 w-4" }),
      " Add Person"
    ] }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "text-navy", children: "New Contact" }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "grid gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Full Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: form.name,
              onChange: (e) => setForm({ ...form, name: e.target.value }),
              placeholder: "Jane Doe"
            }
          ),
          errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Role / Title" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: form.role,
              onChange: (e) => setForm({ ...form, role: e.target.value }),
              placeholder: "Controller"
            }
          ),
          errors.role && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.role })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "email",
              value: form.email,
              onChange: (e) => setForm({ ...form, email: e.target.value }),
              placeholder: "jane@client.com"
            }
          ),
          errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.email })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-2", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: () => setOpen(false), children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", className: "bg-orange text-white hover:bg-orange/90", children: "Add and Select" })
        ] })
      ] })
    ] })
  ] });
}
const EMPTY_SELECTIONS = [];
function EditRequestPage() {
  const { engagementId } = useParams({ from: "/documents/edit/$engagementId" });
  const navigate = useNavigate();
  const request = useDocumentsStore((s) => s.requests.find((r) => r.engagementId === engagementId));
  const entities = useEngagementsStore((s) => s.entities);
  const clientEntities = useMemo(
    () => request ? entities.filter((e) => e.clientId === request.clientId) : [],
    [entities, request]
  );
  const contacts = useDocContactsStore((s) => s.contacts);
  const selections = useDocConfigStore(
    (s) => s.selectionsByEngagement[engagementId] ?? EMPTY_SELECTIONS
  );
  const selectedContacts = useDocConfigStore(
    (s) => s.contactsByEngagement[engagementId] ?? EMPTY_SELECTIONS
  );
  const dueDate = useDocConfigStore((s) => s.dueDateByEngagement[engagementId] ?? "");
  const notes = useDocConfigStore((s) => s.notesByEngagement[engagementId] ?? "");
  const toggleItem = useDocConfigStore((s) => s.toggleItem);
  const setCategoryAll = useDocConfigStore((s) => s.setCategoryAll);
  const toggleContact = useDocConfigStore((s) => s.toggleContact);
  const setDueDate = useDocConfigStore((s) => s.setDueDate);
  const setNotes = useDocConfigStore((s) => s.setNotes);
  const seedIfEmpty = useDocConfigStore((s) => s.seedIfEmpty);
  useEffect(() => {
    if (!request) return;
    const validNames = new Set(DOC_CATEGORIES.flatMap((c) => c.items));
    seedIfEmpty(
      request.engagementId,
      request.items.map((it) => it.type).filter((t) => validNames.has(t))
    );
  }, [request, seedIfEmpty]);
  if (!request) {
    return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("p", { className: "text-navy", children: "Engagement not found." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "mt-4 border-cyan text-cyan hover:bg-cyan/10", children: /* @__PURE__ */ jsxs(Link, { to: "/documents", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-1.5 h-4 w-4" }),
        " Back to Documents"
      ] }) })
    ] });
  }
  const saveChanges = () => {
    toast.success("Request updated", {
      description: `${request.id} · ${selections.length} documents · ${selectedContacts.length} contact(s)`
    });
    navigate({ to: "/documents" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          variant: "ghost",
          size: "sm",
          className: "-ml-2 mb-2 text-muted-foreground hover:text-navy",
          children: /* @__PURE__ */ jsxs(Link, { to: "/documents", children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-1.5 h-4 w-4" }),
            " Back to Documents"
          ] })
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-cyan", children: "Documents" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-1 text-3xl font-bold text-navy", children: "Edit Request" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Update documents, recipients, due date and notes for this engagement." })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-border bg-gradient-frost p-5 shadow-card", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-navy/30 text-navy font-mono", children: request.engagementId }),
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-cyan/30 text-cyan font-mono", children: request.id })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "mt-2 text-xl font-bold text-navy", children: request.clientName }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Tax Years (All)" }),
          /* @__PURE__ */ jsx("div", { className: "mt-1.5", children: /* @__PURE__ */ jsx(YearChips, { years: request.taxYears }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Entities in Scope" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-1.5 space-y-0.5 text-sm text-navy", children: [
            clientEntities.length === 0 && /* @__PURE__ */ jsx("li", { className: "text-muted-foreground", children: "No entities on file." }),
            clientEntities.map((e) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Building2, { className: "h-3 w-3 text-cyan" }),
              " ",
              e.name
            ] }, e.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Documents Requested" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-2xl font-bold tabular-nums text-navy", children: selections.length })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-navy", children: "Document Categories" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 lg:grid-cols-2", children: DOC_CATEGORIES.map((cat) => {
        const allOn = cat.items.every((i) => selections.includes(i));
        const someOn = !allOn && cat.items.some((i) => selections.includes(i));
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "rounded-2xl border border-border bg-card p-5 shadow-card",
            children: [
              /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between border-b border-border pb-3", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-navy", children: cat.title }),
                /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsx(
                    Checkbox,
                    {
                      checked: allOn ? true : someOn ? "indeterminate" : false,
                      onCheckedChange: (v) => setCategoryAll(engagementId, cat.id, !!v)
                    }
                  ),
                  "Select All"
                ] })
              ] }),
              /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-2", children: cat.items.map((item) => {
                const on = selections.includes(item);
                return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-start gap-2 rounded-md p-1.5 hover:bg-accent/40", children: [
                  /* @__PURE__ */ jsx(
                    Checkbox,
                    {
                      checked: on,
                      onCheckedChange: () => toggleItem(engagementId, item),
                      className: "mt-0.5"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: cn("text-sm", on ? "text-navy" : "text-muted-foreground"),
                      children: item
                    }
                  )
                ] }) }, item);
              }) })
            ]
          },
          cat.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-border bg-card p-5 shadow-card", children: [
      /* @__PURE__ */ jsxs("header", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-navy", children: "Send Request To" }),
        /* @__PURE__ */ jsx(AddPersonDialog, { onAdded: (c) => toggleContact(engagementId, c.id) })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "grid gap-2 sm:grid-cols-2", children: contacts.map((c) => {
        const on = selectedContacts.includes(c.id);
        return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "label",
          {
            className: cn(
              "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
              on ? "border-cyan bg-cyan/5" : "border-border hover:bg-accent/40"
            ),
            children: [
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  checked: on,
                  onCheckedChange: () => toggleContact(engagementId, c.id),
                  className: "mt-0.5"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-navy", children: c.name }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: c.role }),
                /* @__PURE__ */ jsxs("p", { className: "mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsx(Mail, { className: "h-3 w-3" }),
                  " ",
                  c.email
                ] })
              ] })
            ]
          }
        ) }, c.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-border bg-card p-5 shadow-card", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-base font-semibold text-navy", children: "Request Options" }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Due Date" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "date",
              value: dueDate,
              onChange: (e) => setDueDate(engagementId, e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Additional Notes" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              value: notes,
              onChange: (e) => setNotes(engagementId, e.target.value),
              rows: 3,
              maxLength: 1e3,
              placeholder: "Optional notes for the recipient..."
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-end gap-2", children: [
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsx(Link, { to: "/documents", children: "Cancel" }) }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: saveChanges,
          variant: "outline",
          className: "border-cyan text-cyan hover:bg-cyan/10",
          children: [
            /* @__PURE__ */ jsx(Save, { className: "mr-1.5 h-4 w-4" }),
            " Save Changes"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: () => navigate({ to: "/documents/review/$engagementId", params: { engagementId } }),
          disabled: selections.length === 0 || selectedContacts.length === 0,
          className: "bg-orange hover:bg-orange/90 text-orange-foreground shadow-elevated",
          children: [
            "Review Request ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1.5 h-4 w-4" })
          ]
        }
      )
    ] })
  ] });
}
const SplitComponent = EditRequestPage;
export {
  SplitComponent as component
};
