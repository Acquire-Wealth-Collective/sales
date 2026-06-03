import { jsxs, jsx } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowLeft, FileText, Save, Send } from "lucide-react";
import { B as Button } from "./router-Cxl4vns6.js";
import { I as Input } from "./input-C6vWqORp.js";
import { L as Label } from "./label-BB9sDVk8.js";
import { T as Textarea } from "./textarea-Df_onAUx.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CWKX9Xdb.js";
import { u as useLeadsStore } from "./leadsStore-DDNAr1jP.js";
import { u as useEngagementsStore } from "./engagementsStore-BPDhygWq.js";
import { u as useDocumentsStore } from "./documentsStore-AtvhRc2E.js";
import "@tanstack/react-query";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "zustand";
import "zustand/middleware";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
const REQUEST_TYPES = [
  "Tax Returns",
  "Financial Records",
  "R&D Documentation",
  "Corporate & Entity",
  "Payroll & HR"
];
const PRIORITIES = ["Low", "Medium", "High", "Urgent"];
const REVIEWERS = ["Michael Williams", "Sandra Wu", "David Kim, CPA", "Amanda Torres"];
function ConfigureRequestPage() {
  const navigate = useNavigate();
  const leads = useLeadsStore((s) => s.leads);
  const engagements = useEngagementsStore((s) => s.engagements);
  const addRequest = useDocumentsStore((s) => s.addRequest);
  const activeLeads = useMemo(() => leads.filter((l) => l.status === "active_engagement"), [leads]);
  const [clientId, setClientId] = useState("");
  const [engagementId, setEngagementId] = useState("");
  const [requestType, setRequestType] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [reviewer, setReviewer] = useState(REVIEWERS[0]);
  const [notes, setNotes] = useState("");
  const clientEngagements = useMemo(
    () => engagements.filter((e) => e.clientId === clientId),
    [engagements, clientId]
  );
  const selectedClient = activeLeads.find((l) => l.id === clientId);
  const canSubmit = clientId && engagementId && requestType && dueDate;
  const handleClientChange = (id) => {
    setClientId(id);
    setEngagementId("");
  };
  const handleSaveDraft = () => {
    toast.success("Draft saved", {
      description: selectedClient ? `${selectedClient.company} — ${requestType || "Untitled"}` : "Configuration draft saved."
    });
  };
  const handleSubmit = () => {
    if (!canSubmit || !selectedClient) return;
    const eng = clientEngagements.find((e) => e.id === engagementId);
    addRequest({
      engagementId: eng?.id ?? engagementId,
      clientId: selectedClient.id,
      clientName: selectedClient.company,
      recipientName: selectedClient.fullName,
      recipientEmail: selectedClient.email,
      taxYears: eng?.years ?? [],
      sentDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      dueDate
    });
    toast.success("Request submitted", {
      description: `${selectedClient.company} · ${requestType} · ${priority}`
    });
    navigate({ to: "/documents" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-cyan", children: "Documents" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-1 text-3xl font-bold text-navy", children: "Configure Request" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Create a new document request for an active engagement." })
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "border-cyan text-cyan hover:bg-cyan/10", children: /* @__PURE__ */ jsxs(Link, { to: "/documents", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-1.5 h-4 w-4" }),
        " Back to Overview"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-card", children: [
      /* @__PURE__ */ jsxs("header", { className: "mb-5 flex items-center gap-2 border-b border-border pb-3", children: [
        /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-cyan" }),
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-navy", children: "Request Details" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Client" }),
          /* @__PURE__ */ jsxs(Select, { value: clientId, onValueChange: handleClientChange, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select client..." }) }),
            /* @__PURE__ */ jsx(SelectContent, { children: activeLeads.map((l) => /* @__PURE__ */ jsx(SelectItem, { value: l.id, children: l.company }, l.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Engagement" }),
          /* @__PURE__ */ jsxs(Select, { value: engagementId, onValueChange: setEngagementId, disabled: !clientId, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(
              SelectValue,
              {
                placeholder: clientId ? "Select engagement..." : "Select a client first"
              }
            ) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              clientEngagements.map((e) => /* @__PURE__ */ jsxs(SelectItem, { value: e.id, children: [
                e.type,
                " · ",
                e.years.join(", ")
              ] }, e.id)),
              clientId && clientEngagements.length === 0 && /* @__PURE__ */ jsx("div", { className: "px-2 py-1.5 text-sm text-muted-foreground", children: "No engagements for this client." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Request Type" }),
          /* @__PURE__ */ jsxs(Select, { value: requestType, onValueChange: (v) => setRequestType(v), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select request type..." }) }),
            /* @__PURE__ */ jsx(SelectContent, { children: REQUEST_TYPES.map((t) => /* @__PURE__ */ jsx(SelectItem, { value: t, children: t }, t)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Priority" }),
          /* @__PURE__ */ jsxs(Select, { value: priority, onValueChange: (v) => setPriority(v), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: PRIORITIES.map((p) => /* @__PURE__ */ jsx(SelectItem, { value: p, children: p }, p)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Due Date" }),
          /* @__PURE__ */ jsx(Input, { type: "date", value: dueDate, onChange: (e) => setDueDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Assigned Reviewer" }),
          /* @__PURE__ */ jsxs(Select, { value: reviewer, onValueChange: setReviewer, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: REVIEWERS.map((r) => /* @__PURE__ */ jsx(SelectItem, { value: r, children: r }, r)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Internal Notes" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              rows: 4,
              maxLength: 1e3,
              placeholder: "Optional notes visible only to the internal team..."
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-end gap-2", children: [
      /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: () => navigate({ to: "/documents" }), children: "Cancel" }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          onClick: handleSaveDraft,
          className: "border-cyan text-cyan hover:bg-cyan/10",
          children: [
            /* @__PURE__ */ jsx(Save, { className: "mr-1.5 h-4 w-4" }),
            " Save Draft"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: handleSubmit,
          disabled: !canSubmit,
          className: "bg-orange hover:bg-orange/90 text-orange-foreground shadow-elevated",
          children: [
            /* @__PURE__ */ jsx(Send, { className: "mr-1.5 h-4 w-4" }),
            " Submit Request"
          ]
        }
      )
    ] })
  ] });
}
const SplitComponent = ConfigureRequestPage;
export {
  SplitComponent as component
};
