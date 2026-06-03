import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, ArrowLeft, Pencil, Layers, Users, Briefcase, CalendarClock, Mail, Trash2, Plus, Calculator } from "lucide-react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { c as cn, B as Button, R as Route } from "./router-Cxl4vns6.js";
import { B as Badge, Y as YearChips } from "./MultiYearSelect-CyogHz5O.js";
import { T as Textarea } from "./textarea-Df_onAUx.js";
import { I as Input } from "./input-C6vWqORp.js";
import { L as Label } from "./label-BB9sDVk8.js";
import { cva } from "class-variance-authority";
import { K as KpiCard } from "./KpiCard-D20NQduz.js";
import { S as StatusBadge, E as EditClientDialog } from "./EditClientDialog-CRTu_e3r.js";
import { u as useLeadsStore } from "./leadsStore-DDNAr1jP.js";
import { u as useEngagementsStore } from "./engagementsStore-BPDhygWq.js";
import { toast } from "sonner";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-Cy5v5AOr.js";
import { f as formatDate, a as formatCurrency, b as formatTime } from "./format-msZ4TtaS.js";
import "@tanstack/react-query";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-slot";
import "zustand";
import "zustand/middleware";
import "@radix-ui/react-popover";
import "@radix-ui/react-separator";
import "@radix-ui/react-label";
import "zod";
import "./select-CWKX9Xdb.js";
import "@radix-ui/react-select";
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, role: "alert", className: cn(alertVariants({ variant }), className), ...props }));
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "h5",
    {
      ref,
      className: cn("mb-1 font-medium leading-none tracking-tight", className),
      ...props
    }
  )
);
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("text-sm [&_p]:leading-relaxed", className), ...props }));
AlertDescription.displayName = "AlertDescription";
function ScheduleCallDialog({ clientId, open, onOpenChange }) {
  const add = useEngagementsStore((s) => s.addCall);
  const [date, setDate] = useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [time, setTime] = useState("10:00");
  const [notes, setNotes] = useState("");
  const submit = () => {
    add({ clientId, date, time, notes });
    toast.success("Call scheduled", { description: `${date} at ${time}` });
    onOpenChange(false);
    setNotes("");
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxs(DialogTitle, { className: "text-navy flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
        " Schedule Call"
      ] }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Add a follow-up call to this client." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "mb-1.5 block", children: "Date" }),
          /* @__PURE__ */ jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "mb-1.5 block", children: "Time" }),
          /* @__PURE__ */ jsx(Input, { type: "time", value: time, onChange: (e) => setTime(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "mb-1.5 block", children: "Notes" }),
        /* @__PURE__ */ jsx(
          Textarea,
          {
            rows: 3,
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            placeholder: "Agenda, prep notes..."
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: () => onOpenChange(false), children: "Cancel" }),
      /* @__PURE__ */ jsx(Button, { onClick: submit, className: "bg-orange text-white hover:bg-orange/90", children: "Schedule Call" })
    ] })
  ] }) });
}
function ProfilePage({ id }) {
  const lead = useLeadsStore((s) => s.leads.find((l) => l.id === id));
  const updateLead = useLeadsStore((s) => s.updateLead);
  const byClient = useEngagementsStore((s) => s.byClient);
  const addContact = useEngagementsStore((s) => s.addContact);
  const updateContact = useEngagementsStore((s) => s.updateContact);
  const deleteContact = useEngagementsStore((s) => s.deleteContact);
  const updateCall = useEngagementsStore((s) => s.updateCall);
  const navigate = useNavigate();
  const [openCall, setOpenCall] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isEditingIntakeNotes, setIsEditingIntakeNotes] = useState(false);
  const [draftIntakeNote, setDraftIntakeNote] = useState("");
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    role: "",
    workEmail: "",
    email: "",
    workPhone: "",
    mobilePhone: ""
  });
  const formatPhone = (value) => {
    const d = value.replace(/\D/g, "").slice(0, 10);
    if (d.length <= 3) return d.length ? `(${d}` : "";
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  };
  const [contactError, setContactError] = useState("");
  const [contactSaved, setContactSaved] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);
  const saveTimerRef = useRef(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, []);
  const { engagements, contacts, entities: clientEntities, calls } = byClient(id);
  useEffect(() => {
    const now = /* @__PURE__ */ new Date();
    calls.forEach((c) => {
      if (!c.completed && /* @__PURE__ */ new Date(`${c.date}T${c.time}`) < now) {
        updateCall(c.id, { completed: true });
      }
    });
  }, [calls.length, updateCall]);
  const chartData = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    engagements.forEach(
      (e) => e.billing.forEach((b) => map.set(b.year, (map.get(b.year) || 0) + b.amount))
    );
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]).map(([year, amount]) => ({ year: String(year), amount }));
  }, [engagements]);
  const engagementYears = useMemo(() => {
    const ys = /* @__PURE__ */ new Set();
    engagements.forEach((e) => e.years.forEach((y) => ys.add(y)));
    return Array.from(ys).sort();
  }, [engagements]);
  const grandTotal = chartData.reduce((s, r) => s + r.amount, 0);
  const upcomingCalls = calls.filter(
    (c) => (/* @__PURE__ */ new Date(`${c.date}T${c.time}`)).getTime() >= Date.now()
  ).length;
  if (!lead) {
    return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-navy", children: "Client not found" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "This client no longer exists." }),
      /* @__PURE__ */ jsx(Button, { className: "mt-6", onClick: () => navigate({ to: "/pipeline" }), children: "Back to Pipeline" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate({ to: "/pipeline" }), children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => setOpenEdit(true), children: [
        /* @__PURE__ */ jsx(Pencil, { className: "mr-1.5 h-4 w-4" }),
        " Edit Client"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-[18px] border border-[#e2e8f0] bg-white p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.05)] mb-5 flex flex-wrap items-start justify-between gap-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 min-w-[280px]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-navy text-white text-base font-bold tracking-wide shadow-sm", children: lead.fullName.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase() }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-cyan", children: "Client" }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-navy", children: lead.fullName }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: lead.company }),
        /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(StatusBadge, { status: lead.status }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4", children: [
      {
        label: "Total Entities",
        value: clientEntities.length,
        icon: Layers,
        accent: "navy",
        target: "section-entities"
      },
      {
        label: "Total Contacts",
        value: contacts.length,
        icon: Users,
        accent: "cyan",
        target: "section-contacts"
      },
      {
        label: "Total Engagements",
        value: engagements.length,
        icon: Briefcase,
        accent: "orange",
        target: "section-engagements"
      },
      {
        label: "Upcoming Calls",
        value: upcomingCalls,
        icon: CalendarClock,
        accent: "green",
        target: "section-calls"
      }
    ].map(({ label, value, icon, accent, target }) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" }),
        className: "rounded-xl text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan hover:scale-[1.02]",
        children: /* @__PURE__ */ jsx(KpiCard, { label, value, icon, accent })
      },
      target
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { title: "General Information", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsx(Info, { label: "Lead Source", value: lead.source }),
            /* @__PURE__ */ jsx(
              Info,
              {
                label: "Client Since",
                value: lead.engagedSince ? formatDate(lead.engagedSince) : formatDate(lead.addedAt)
              }
            ),
            /* @__PURE__ */ jsx(Info, { label: "Phone", value: lead.phone, icon: /* @__PURE__ */ jsx(Phone, { className: "h-3 w-3" }) }),
            /* @__PURE__ */ jsx(Info, { label: "Email", value: lead.email, icon: /* @__PURE__ */ jsx(Mail, { className: "h-3 w-3" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg border border-border bg-muted/30 p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Notes" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-navy", children: lead.notes || "No notes yet." })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Card,
          {
            title: "Intake Notes",
            action: /* @__PURE__ */ jsx(
              "span",
              {
                className: `inline-block transform transition-all duration-300 ease-out ${noteSaved ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}`,
                children: /* @__PURE__ */ jsx("span", { className: "text-sm text-green-600", children: "Saved" })
              }
            ),
            children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Add intake notes or comments for this client profile. These will be saved on the profile and displayed as individual notes." }),
              isEditingIntakeNotes ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    value: draftIntakeNote,
                    onChange: (event) => setDraftIntakeNote(event.target.value),
                    className: "min-h-[140px]",
                    rows: 6
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      onClick: () => {
                        if (!draftIntakeNote.trim()) return;
                        if (editingNoteId) {
                          updateLead(id, {
                            intakeNotes: (lead?.intakeNotes ?? []).map(
                              (n) => n.id === editingNoteId ? { ...n, text: draftIntakeNote.trim() } : n
                            )
                          });
                        } else {
                          updateLead(id, {
                            intakeNotes: [
                              ...lead?.intakeNotes ?? [],
                              {
                                id: `note_${Date.now()}`,
                                text: draftIntakeNote.trim(),
                                createdAt: (/* @__PURE__ */ new Date()).toISOString(),
                                author: lead?.rep
                              }
                            ]
                          });
                        }
                        try {
                          if (typeof window !== "undefined") {
                            window.localStorage.setItem(
                              "sales-leads",
                              JSON.stringify(useLeadsStore.getState().leads)
                            );
                          }
                        } catch (e) {
                          console.warn("Failed to persist leads after save:", e);
                        }
                        setNoteSaved(true);
                        if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
                        saveTimerRef.current = window.setTimeout(() => setNoteSaved(false), 2500);
                        setDraftIntakeNote("");
                        setIsEditingIntakeNotes(false);
                        setEditingNoteId(null);
                      },
                      disabled: draftIntakeNote.trim().length === 0,
                      children: "Save notes"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "outline",
                      onClick: () => {
                        setDraftIntakeNote("");
                        setIsEditingIntakeNotes(false);
                      },
                      children: "Cancel"
                    }
                  )
                ] })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                lead.intakeNotes && lead.intakeNotes.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: lead.intakeNotes.map((note) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "rounded-xl border border-border bg-muted/30 p-4 text-sm text-navy",
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between gap-3 text-[11px] uppercase tracking-wider text-muted-foreground", children: [
                        /* @__PURE__ */ jsxs("span", { className: "font-semibold text-foreground", children: [
                          "By ",
                          note.author ?? lead.rep
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxs("span", { children: [
                            formatDate(note.createdAt),
                            " ",
                            /* @__PURE__ */ jsx("span", { className: "text-cyan", children: new Date(note.createdAt).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit"
                            }) })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsx(
                              Button,
                              {
                                size: "sm",
                                variant: "outline",
                                onClick: () => {
                                  setIsEditingIntakeNotes(true);
                                  setDraftIntakeNote(note.text);
                                  setEditingNoteId(note.id);
                                },
                                children: "Edit"
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              Button,
                              {
                                size: "sm",
                                variant: "outline",
                                className: "text-red-600",
                                onClick: () => {
                                  if (!window.confirm("Delete this note?")) return;
                                  updateLead(id, {
                                    intakeNotes: (lead?.intakeNotes ?? []).filter(
                                      (n) => n.id !== note.id
                                    )
                                  });
                                  try {
                                    if (typeof window !== "undefined") {
                                      window.localStorage.setItem(
                                        "sales-leads",
                                        JSON.stringify(useLeadsStore.getState().leads)
                                      );
                                    }
                                  } catch (e) {
                                    console.warn("Failed to persist leads after delete:", e);
                                  }
                                  setNoteSaved(true);
                                  if (saveTimerRef.current)
                                    window.clearTimeout(saveTimerRef.current);
                                  saveTimerRef.current = window.setTimeout(
                                    () => setNoteSaved(false),
                                    2500
                                  );
                                  if (editingNoteId === note.id) {
                                    setEditingNoteId(null);
                                    setIsEditingIntakeNotes(false);
                                    setDraftIntakeNote("");
                                  }
                                },
                                children: "Delete"
                              }
                            )
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("p", { children: note.text })
                    ]
                  },
                  note.id
                )) }) : /* @__PURE__ */ jsx("div", { className: "min-h-[96px] rounded-xl border border-border bg-muted/30 p-4 text-sm text-navy", children: "No intake notes yet." }),
                /* @__PURE__ */ jsx(Button, { onClick: () => setIsEditingIntakeNotes(true), children: lead.intakeNotes && lead.intakeNotes.length > 0 ? "Add another note" : "Add note" })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(Card, { title: "Entities", id: "section-entities", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: (() => {
          const leadEntityNames = (lead.entityNames ?? []).filter(Boolean);
          const mergedEntities = [
            ...clientEntities,
            ...leadEntityNames.filter((name) => !clientEntities.some((e) => e.name === name)).map((name, i) => ({
              id: `lead-${i}`,
              clientId: id,
              name,
              ein: "",
              contacts: []
            }))
          ];
          const pocContacts = contacts.filter((c) => c.role === "Point of Contact");
          return /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: [
              /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Entity Name" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "EIN" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Associated Contacts" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: mergedEntities.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
              "td",
              {
                colSpan: 3,
                className: "px-4 py-6 text-center text-sm text-muted-foreground",
                children: "No entities recorded."
              }
            ) }) : mergedEntities.map((e) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy", children: e.name }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 tabular-nums text-muted-foreground", children: e.ein || "—" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: pocContacts.length === 0 ? /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) : pocContacts.map((c) => /* @__PURE__ */ jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "border-cyan/40 text-navy",
                  children: [
                    c.firstName,
                    " ",
                    c.lastName,
                    /* @__PURE__ */ jsx("span", { className: "ml-1 text-[10px] text-muted-foreground", children: "(Point of Contact)" })
                  ]
                },
                c.id
              )) }) })
            ] }, e.id)) })
          ] });
        })() }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx(Card, { title: "Assigned Sales Representative", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-cyan/15 text-cyan text-sm font-bold ring-1 ring-cyan/25", children: lead.rep.split(" ").map((s) => s[0]).join("").slice(0, 2) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-navy", children: lead.rep }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Senior Sales Representative" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(
          Card,
          {
            id: "section-contacts",
            title: "People & Contacts",
            action: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `inline-block transform transition-all duration-300 ease-out ${contactSaved ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}`,
                  children: /* @__PURE__ */ jsx("span", { className: "text-sm text-green-600", children: "Saved" })
                }
              ),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => setIsAddingContact((open) => !open),
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-3 w-3" }),
                    " ",
                    isAddingContact ? "Close" : "Add Contact"
                  ]
                }
              )
            ] }),
            children: [
              isAddingContact && /* @__PURE__ */ jsxs("div", { className: "mb-4 rounded-xl border border-border bg-muted/30 p-4", children: [
                /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm text-muted-foreground", children: editingContactId ? "Update this contact details." : "Add a contact for this client. All fields are required before you can save." }),
                contactError && /* @__PURE__ */ jsx(Alert, { variant: "destructive", className: "mb-3", children: /* @__PURE__ */ jsx(AlertDescription, { children: contactError }) }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "contact-firstname", children: "First Name" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          id: "contact-firstname",
                          value: contactForm.firstName,
                          onChange: (e) => setContactForm((prev) => ({ ...prev, firstName: e.target.value })),
                          placeholder: "Jane"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "contact-lastname", children: "Last Name" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          id: "contact-lastname",
                          value: contactForm.lastName,
                          onChange: (e) => setContactForm((prev) => ({ ...prev, lastName: e.target.value })),
                          placeholder: "Doe"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "contact-role", children: "Role" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "contact-role",
                        value: contactForm.role,
                        onChange: (e) => setContactForm((prev) => ({ ...prev, role: e.target.value })),
                        placeholder: "Controller"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "contact-work-email", children: "Work Email" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          id: "contact-work-email",
                          type: "email",
                          value: contactForm.workEmail,
                          onChange: (e) => setContactForm((prev) => ({ ...prev, workEmail: e.target.value })),
                          placeholder: "jane@company.com"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "contact-email", children: "Email" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          id: "contact-email",
                          type: "email",
                          value: contactForm.email,
                          onChange: (e) => setContactForm((prev) => ({ ...prev, email: e.target.value })),
                          placeholder: "jane@personal.com"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "contact-work-phone", children: "Work Phone" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          id: "contact-work-phone",
                          value: contactForm.workPhone,
                          onChange: (e) => setContactForm((prev) => ({
                            ...prev,
                            workPhone: formatPhone(e.target.value)
                          })),
                          placeholder: "(555) 123-4567"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "contact-mobile-phone", children: "Mobile Phone" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          id: "contact-mobile-phone",
                          value: contactForm.mobilePhone,
                          onChange: (e) => setContactForm((prev) => ({
                            ...prev,
                            mobilePhone: formatPhone(e.target.value)
                          })),
                          placeholder: "(555) 987-6543"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      onClick: () => {
                        const trimmed = {
                          firstName: contactForm.firstName.trim(),
                          lastName: contactForm.lastName.trim(),
                          role: contactForm.role.trim(),
                          workEmail: contactForm.workEmail.trim(),
                          email: contactForm.email.trim(),
                          workPhone: contactForm.workPhone.trim(),
                          mobilePhone: contactForm.mobilePhone.trim()
                        };
                        if (!trimmed.firstName || !trimmed.lastName || !trimmed.role) {
                          setContactError("First name, last name, and role are required.");
                          return;
                        }
                        if (editingContactId) {
                          updateContact(editingContactId, trimmed);
                        } else {
                          addContact({ clientId: id, ...trimmed });
                        }
                        setContactForm({
                          firstName: "",
                          lastName: "",
                          role: "",
                          workEmail: "",
                          email: "",
                          workPhone: "",
                          mobilePhone: ""
                        });
                        setContactError("");
                        setContactSaved(true);
                        window.setTimeout(() => setContactSaved(false), 2500);
                        setEditingContactId(null);
                        setIsAddingContact(false);
                      },
                      children: editingContactId ? "Update Contact" : "Save Contact"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "outline",
                      onClick: () => {
                        setContactForm({
                          firstName: "",
                          lastName: "",
                          role: "",
                          workEmail: "",
                          email: "",
                          workPhone: "",
                          mobilePhone: ""
                        });
                        setContactError("");
                        setEditingContactId(null);
                        setIsAddingContact(false);
                      },
                      children: "Cancel"
                    }
                  )
                ] }),
                editingContactId && /* @__PURE__ */ jsx("div", { className: "mt-4 border-t border-border pt-4", children: /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30",
                    onClick: () => {
                      deleteContact(editingContactId);
                      setContactForm({
                        firstName: "",
                        lastName: "",
                        role: "",
                        workEmail: "",
                        email: "",
                        workPhone: "",
                        mobilePhone: ""
                      });
                      setContactError("");
                      setEditingContactId(null);
                      setIsAddingContact(false);
                    },
                    children: [
                      /* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                      " Remove Contact"
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
                contacts.length === 0 && /* @__PURE__ */ jsx("li", { className: "text-sm text-muted-foreground", children: "No contacts." }),
                [...contacts].sort((a, b) => {
                  const poc = "Point of Contact";
                  if (a.role === poc && b.role !== poc) return -1;
                  if (a.role !== poc && b.role === poc) return 1;
                  return 0;
                }).map((c) => /* @__PURE__ */ jsxs("li", { className: "rounded-lg border border-border p-3", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold text-navy", children: [
                    c.firstName,
                    " ",
                    c.lastName
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: c.role }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-2 space-y-0.5", children: [
                    c.workEmail && /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1.5 text-xs", children: [
                      /* @__PURE__ */ jsx(Mail, { className: "h-3 w-3 text-cyan" }),
                      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Work:" }),
                      " ",
                      c.workEmail
                    ] }),
                    c.email && /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1.5 text-xs", children: [
                      /* @__PURE__ */ jsx(Mail, { className: "h-3 w-3 text-cyan" }),
                      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Email:" }),
                      " ",
                      c.email
                    ] }),
                    c.workPhone && /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1.5 text-xs", children: [
                      /* @__PURE__ */ jsx(Phone, { className: "h-3 w-3 text-cyan" }),
                      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Work:" }),
                      " ",
                      c.workPhone
                    ] }),
                    c.mobilePhone && /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1.5 text-xs", children: [
                      /* @__PURE__ */ jsx(Phone, { className: "h-3 w-3 text-cyan" }),
                      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Mobile:" }),
                      " ",
                      c.mobilePhone
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mt-3 flex justify-end", children: /* @__PURE__ */ jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      onClick: () => {
                        setContactForm({
                          firstName: c.firstName,
                          lastName: c.lastName,
                          role: c.role,
                          workEmail: c.workEmail,
                          email: c.email,
                          workPhone: c.workPhone,
                          mobilePhone: c.mobilePhone
                        });
                        setEditingContactId(c.id);
                        setContactError("");
                        setIsAddingContact(true);
                      },
                      children: "Edit"
                    }
                  ) })
                ] }, c.id))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(Card, { title: "Engagements", id: "section-engagements", children: engagements.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No engagements yet." }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("ul", { className: "mb-4 space-y-2", children: engagements.map((e) => /* @__PURE__ */ jsxs(
            "li",
            {
              className: "flex items-center justify-between rounded-lg border border-border bg-gradient-frost p-3 text-sm",
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-navy", children: e.type }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    e.phase,
                    " · ",
                    e.status
                  ] })
                ] }),
                /* @__PURE__ */ jsx(YearChips, { years: e.years })
              ]
            },
            e.id
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-card p-3", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-xs font-semibold uppercase tracking-wider text-cyan", children: [
              "R&D Tax Credit — ",
              engagementYears.length ? engagementYears.join(", ") : "—"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 h-44", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
              BarChart,
              {
                data: chartData,
                layout: "vertical",
                margin: { top: 4, right: 8, left: 0, bottom: 0 },
                children: [
                  /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.91 0.012 230)" }),
                  /* @__PURE__ */ jsx(
                    XAxis,
                    {
                      type: "number",
                      tickFormatter: (v) => `$${(v / 1e3).toFixed(0)}k`,
                      fontSize: 11,
                      stroke: "oklch(0.50 0.03 245)"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    YAxis,
                    {
                      type: "category",
                      dataKey: "year",
                      fontSize: 11,
                      stroke: "oklch(0.50 0.03 245)",
                      width: 42
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Tooltip,
                    {
                      formatter: (v) => formatCurrency(v),
                      cursor: { fill: "oklch(0.94 0.02 220 / 0.5)" }
                    }
                  ),
                  /* @__PURE__ */ jsx(Bar, { dataKey: "amount", fill: "var(--orange)", radius: [0, 4, 4, 0] })
                ]
              }
            ) }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Total engagement value" }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-navy tabular-nums", children: formatCurrency(grandTotal) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(
          Card,
          {
            id: "section-calls",
            title: "Follow-up Calls",
            action: /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => setOpenCall(true), children: [
              /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-3 w-3" }),
              " Add"
            ] }),
            children: calls.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No follow-ups scheduled." }) : /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: [...calls].sort((a, b) => {
              if ((a.completed ?? false) !== (b.completed ?? false))
                return Number(a.completed ?? false) - Number(b.completed ?? false);
              return (/* @__PURE__ */ new Date(`${a.date}T${a.time}`)).getTime() - (/* @__PURE__ */ new Date(`${b.date}T${b.time}`)).getTime();
            }).map((c) => {
              const isToday = c.date === (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
              return /* @__PURE__ */ jsx(
                "li",
                {
                  className: `rounded-lg border p-3 text-sm transition-colors ${isToday && !c.completed ? "border-cyan/50 bg-cyan/5" : "border-border"}`,
                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxs("p", { className: "font-semibold text-navy", children: [
                          formatDate(c.date),
                          " · ",
                          formatTime(c.time)
                        ] }),
                        isToday && !c.completed && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-cyan px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white", children: "Today" })
                      ] }),
                      c.notes && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: c.notes }),
                      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-[11px] uppercase tracking-wider text-muted-foreground", children: [
                        "Status:",
                        " ",
                        /* @__PURE__ */ jsx("span", { className: c.completed ? "text-green-600" : "text-amber-600", children: c.completed ? "Completed" : "Pending" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs text-navy", children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: !!c.completed,
                          onChange: () => updateCall(c.id, { completed: !c.completed }),
                          className: "h-3.5 w-3.5 rounded border-border text-green-600 focus:ring-green-500"
                        }
                      ),
                      "Complete"
                    ] })
                  ] })
                },
                c.id
              );
            }) })
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full border-cyan text-cyan hover:bg-cyan/10",
            onClick: () => navigate({ to: "/", search: { clientName: lead.company } }),
            children: [
              /* @__PURE__ */ jsx(Calculator, { className: "mr-1.5 h-4 w-4" }),
              " Open Calculator"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(ScheduleCallDialog, { clientId: id, open: openCall, onOpenChange: setOpenCall }),
    /* @__PURE__ */ jsx(EditClientDialog, { lead, open: openEdit, onOpenChange: setOpenEdit })
  ] });
}
function Card({
  title,
  children,
  action,
  id
}) {
  return /* @__PURE__ */ jsxs(
    motion.section,
    {
      id,
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      className: "rounded-2xl border border-border bg-card shadow-card",
      children: [
        /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between border-b border-border px-5 py-3", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-navy", children: title }),
          action
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-5", children })
      ]
    }
  );
}
function Info({ label, value, icon }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxs("p", { className: "mt-1 inline-flex items-center gap-1.5 text-sm text-navy", children: [
      icon,
      value
    ] })
  ] });
}
function ClientProfileRoute() {
  const {
    id
  } = Route.useParams();
  return /* @__PURE__ */ jsx(ProfilePage, { id });
}
export {
  ClientProfileRoute as component
};
