import { jsxs, jsx } from "react/jsx-runtime";
import { useParams, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Pencil, Calendar, FileText, Mail, ArrowLeft, Send } from "lucide-react";
import { B as Button } from "./router-Cxl4vns6.js";
import { B as Badge, Y as YearChips } from "./MultiYearSelect-CyogHz5O.js";
import { u as useDocumentsStore } from "./documentsStore-AtvhRc2E.js";
import { a as useDocContactsStore, u as useDocConfigStore } from "./docConfigStore-DlM2ZPue.js";
import { f as formatDate } from "./format-msZ4TtaS.js";
import "@tanstack/react-query";
import "react";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "zustand";
import "zustand/middleware";
import "@radix-ui/react-popover";
import "@radix-ui/react-separator";
const EMPTY_SELECTIONS = [];
function ReviewRequestPage() {
  const { engagementId } = useParams({ from: "/documents/review/$engagementId" });
  const navigate = useNavigate();
  const request = useDocumentsStore((s) => s.requests.find((r) => r.engagementId === engagementId));
  const contacts = useDocContactsStore((s) => s.contacts);
  const reset = useDocConfigStore((s) => s.reset);
  const selections = useDocConfigStore(
    (s) => s.selectionsByEngagement[engagementId] ?? EMPTY_SELECTIONS
  );
  const selectedIds = useDocConfigStore(
    (s) => s.contactsByEngagement[engagementId] ?? EMPTY_SELECTIONS
  );
  const dueDate = useDocConfigStore((s) => s.dueDateByEngagement[engagementId] ?? "");
  const notes = useDocConfigStore((s) => s.notesByEngagement[engagementId] ?? "");
  const selectedContacts = contacts.filter((c) => selectedIds.includes(c.id));
  if (!request) {
    return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-navy", children: "Engagement not found." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-4", children: /* @__PURE__ */ jsx(Link, { to: "/documents", children: "Back to Documents" }) })
    ] });
  }
  const send = () => {
    toast.success("Document request sent", {
      description: `${request.clientName} · ${selections.length} documents to ${selectedContacts.length} contact(s)`
    });
    reset(engagementId);
    navigate({ to: "/documents" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-cyan", children: "Documents" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-1 text-3xl font-bold text-navy", children: "Review Request" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Review the email request preview before sending it to your client." })
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxs(Link, { to: "/documents", children: [
        /* @__PURE__ */ jsx(Pencil, { className: "mr-1.5 h-4 w-4" }),
        " Edit"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("article", { className: "overflow-hidden rounded-2xl border border-border bg-card shadow-card", children: [
      /* @__PURE__ */ jsxs("header", { className: "border-b border-border bg-gradient-frost px-6 py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-navy/30 text-navy font-mono", children: request.engagementId }),
          /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-cyan/30 text-cyan font-mono", children: request.id })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "mt-2 text-xl font-bold text-navy", children: [
          "Document Request — ",
          request.clientName
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "To: " }),
          selectedContacts.map((c) => `${c.name} <${c.email}>`).join(", ") || "—"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6 px-6 py-5", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Engagement" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 grid gap-3 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Client" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-navy", children: request.clientName })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Tax Years" }),
              /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(YearChips, { years: request.taxYears }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-3", children: [
              /* @__PURE__ */ jsxs("p", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
                " Due Date"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-navy", children: dueDate ? formatDate(dueDate) : "Not set" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Recipients" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-navy", children: selectedContacts.length })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsxs("p", { className: "inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: [
            /* @__PURE__ */ jsx(FileText, { className: "h-3 w-3" }),
            " Selected Documents (",
            selections.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-2 grid gap-1 sm:grid-cols-2", children: [
            selections.map((d) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm text-navy", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" }),
              " ",
              d
            ] }, d)),
            selections.length === 0 && /* @__PURE__ */ jsx("li", { className: "text-sm text-muted-foreground", children: "None selected." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsxs("p", { className: "inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-3 w-3" }),
            " Contacts"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-2 space-y-1", children: [
            selectedContacts.map((c) => /* @__PURE__ */ jsxs("li", { className: "text-sm text-navy", children: [
              c.name,
              " ",
              /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
                "· ",
                c.role,
                " · ",
                c.email
              ] })
            ] }, c.id)),
            selectedContacts.length === 0 && /* @__PURE__ */ jsx("li", { className: "text-sm text-muted-foreground", children: "None selected." })
          ] })
        ] }),
        notes && /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Additional Notes" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 whitespace-pre-wrap rounded-lg border border-border bg-muted/30 p-3 text-sm text-navy", children: notes })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-3", children: [
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxs(Link, { to: "/documents", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-1.5 h-4 w-4" }),
        " Back"
      ] }) }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: send,
          className: "bg-green text-green-foreground hover:bg-green/90 shadow-elevated",
          children: [
            /* @__PURE__ */ jsx(Send, { className: "mr-1.5 h-4 w-4" }),
            " Send Document Request"
          ]
        }
      )
    ] })
  ] });
}
const SplitComponent = ReviewRequestPage;
export {
  SplitComponent as component
};
