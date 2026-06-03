import { create } from "zustand";
const MOCK_LEADS = [
  {
    id: "ld_001",
    fullName: "Michael Reeves",
    company: "Nimbus Robotics, Inc.",
    email: "m.reeves@nimbusrobotics.com",
    phone: "(415) 555-2310",
    source: "Referral",
    rep: "David Kim",
    status: "active_engagement",
    engagementYears: 3,
    taxYears: [2023, 2024, 2025],
    engagedSince: "2022-03-14",
    entitiesCount: 4,
    entityNames: [
      "Nimbus Robotics, Inc.",
      "Nimbus Software, LLC",
      "Northwind Labs",
      "Aster Manufacturing"
    ],
    latestCalculation: "2025-11-02",
    addedAt: "2022-02-01",
    notes: "Multi-entity robotics group. Annual filings.",
    intake: {
      multiState: true,
      priorRdCredits: true,
      governmentGrants: false,
      qualifiedResearchExpenses: true
    }
  },
  {
    id: "ld_002",
    fullName: "Priya Shankar",
    company: "Helios Biotech LLC",
    email: "priya@heliosbio.com",
    phone: "(617) 555-9981",
    source: "LinkedIn",
    rep: "Sarah Johnson",
    status: "sow_signed",
    engagementYears: 1,
    taxYears: [2024, 2025],
    engagedSince: "2024-08-20",
    entitiesCount: 2,
    entityNames: ["Helios Biotech LLC", "Helios Research Group"],
    latestCalculation: "2025-10-18",
    addedAt: "2024-07-09",
    notes: "Biotech R&D, primarily clinical research.",
    intake: {
      multiState: false,
      priorRdCredits: false,
      governmentGrants: true,
      qualifiedResearchExpenses: true
    }
  },
  {
    id: "ld_003",
    fullName: "Carlos Mendoza",
    company: "Arcline Manufacturing",
    email: "c.mendoza@arclinemfg.com",
    phone: "(312) 555-4422",
    source: "Conference",
    rep: "James Carter",
    status: "calculation_sent",
    engagementYears: 0,
    taxYears: [2024, 2025],
    engagedSince: "",
    entitiesCount: 1,
    entityNames: ["Arcline Manufacturing"],
    latestCalculation: "2025-11-15",
    addedAt: "2025-10-30"
  },
  {
    id: "ld_004",
    fullName: "Elena Costa",
    company: "Vertex Software Group",
    email: "elena@vertexsg.io",
    phone: "(206) 555-7711",
    source: "Website",
    rep: "Unassigned",
    status: "new",
    engagementYears: 0,
    taxYears: [],
    engagedSince: "",
    entitiesCount: 0,
    latestCalculation: "—",
    addedAt: "2025-11-22"
  },
  {
    id: "ld_005",
    fullName: "Daniel Whitfield",
    company: "Northbeam Industries",
    email: "dwhitfield@northbeam.com",
    phone: "(404) 555-0192",
    source: "Partner",
    rep: "David Kim",
    status: "active_engagement",
    engagementYears: 2,
    taxYears: [2024, 2025, 2026],
    engagedSince: "2023-06-12",
    entitiesCount: 3,
    entityNames: ["Northbeam Industries", "Northbeam Southeast LLC", "Northbeam NC Operations"],
    latestCalculation: "2025-09-30",
    addedAt: "2023-05-04",
    notes: "Heavy manufacturing, GA + NC operations.",
    intakeNotes: [
      {
        id: "note_ld_005_1",
        text: "Client prefers weekly intake summaries and wants notes stored on the profile.",
        createdAt: "2025-08-12T15:20:00.000Z"
      }
    ],
    intake: {
      multiState: true,
      priorRdCredits: false,
      governmentGrants: false,
      qualifiedResearchExpenses: true
    }
  },
  {
    id: "ld_006",
    fullName: "Aisha Bennett",
    company: "Quanta Labs",
    email: "a.bennett@quantalabs.ai",
    phone: "(650) 555-3401",
    source: "Cold Call",
    rep: "Sarah Johnson",
    status: "sow_signed",
    engagementYears: 0,
    taxYears: [2025],
    engagedSince: "",
    entitiesCount: 1,
    entityNames: ["Quanta Labs"],
    latestCalculation: "2025-11-10",
    addedAt: "2025-10-12"
  }
];
const LEADS_STORAGE_KEY = "sales-leads";
function normalizeEntityNames(names) {
  return (names ?? []).map((name) => name.trim()).filter(Boolean);
}
function loadStoredLeads() {
  if (typeof window === "undefined") {
    return MOCK_LEADS;
  }
  try {
    const stored = window.localStorage.getItem(LEADS_STORAGE_KEY);
    if (!stored) {
      return MOCK_LEADS;
    }
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed.map((lead) => {
        if (!lead.entityNames?.length) {
          const seed = MOCK_LEADS.find((m) => m.id === lead.id);
          if (seed?.entityNames?.length) return { ...lead, entityNames: seed.entityNames };
        }
        return lead;
      });
    }
  } catch (error) {
    console.warn("Failed to load stored leads:", error);
  }
  return MOCK_LEADS;
}
const useLeadsStore = create((set, get) => ({
  leads: loadStoredLeads(),
  addLead: (l) => {
    const entityNames = normalizeEntityNames(l.entityNames);
    return set((s) => ({
      leads: [
        {
          ...l,
          taxYears: l.taxYears ?? [],
          entityNames,
          entitiesCount: entityNames.length || l.entitiesCount || 0,
          id: `ld_${Date.now()}`,
          status: "new",
          engagementYears: 0,
          engagedSince: "",
          latestCalculation: "—",
          addedAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        ...s.leads
      ]
    }));
  },
  updateLead: (id, patch) => set((s) => ({
    leads: s.leads.map((x) => {
      if (x.id !== id) return x;
      const nextEntityNames = patch.entityNames !== void 0 ? normalizeEntityNames(patch.entityNames) : x.entityNames;
      return {
        ...x,
        ...patch,
        entityNames: nextEntityNames,
        entitiesCount: patch.entityNames !== void 0 ? (nextEntityNames ?? []).length : patch.entitiesCount ?? x.entitiesCount
      };
    })
  })),
  deleteLead: (id) => set((s) => ({ leads: s.leads.filter((x) => x.id !== id) })),
  setStatus: (id, status) => set((s) => ({ leads: s.leads.map((x) => x.id === id ? { ...x, status } : x) })),
  promoteToActive: (id) => set((s) => ({
    leads: s.leads.map(
      (x) => x.id === id ? {
        ...x,
        status: "active_engagement",
        engagedSince: x.engagedSince || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        engagementYears: Math.max(1, x.engagementYears)
      } : x
    )
  })),
  getLead: (id) => get().leads.find((l) => l.id === id)
}));
if (typeof window !== "undefined") {
  useLeadsStore.subscribe((state) => {
    try {
      window.localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(state.leads));
    } catch (error) {
      console.warn("Failed to save leads:", error);
    }
  });
}
export {
  useLeadsStore as u
};
