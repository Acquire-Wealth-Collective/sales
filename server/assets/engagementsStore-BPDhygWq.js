import { create } from "zustand";
const seedEngagements = [
  {
    id: "eng_001",
    clientId: "ld_001",
    type: "R&D Tax Credit",
    status: "Active",
    phase: "Calculation",
    years: [2023, 2024, 2025],
    billing: [
      { year: 2023, amount: 8e3 },
      { year: 2024, amount: 9500 },
      { year: 2025, amount: 1e4 }
    ],
    createdAt: "2024-01-15"
  },
  {
    id: "eng_002",
    clientId: "ld_005",
    type: "R&D Tax Credit",
    status: "Active",
    phase: "Review",
    years: [2024, 2025, 2026],
    billing: [
      { year: 2024, amount: 7500 },
      { year: 2025, amount: 9e3 },
      { year: 2026, amount: 6e3 }
    ],
    createdAt: "2024-03-02"
  }
];
const CONTACTS_STORAGE_KEY = "sales-contacts";
const CALLS_STORAGE_KEY = "sales-follow-up-calls";
const seedContacts = [
  {
    id: "c1",
    clientId: "ld_001",
    firstName: "Robert",
    lastName: "Chen",
    role: "Point of Contact",
    workEmail: "r.chen@nimbusrobotics.com",
    email: "",
    workPhone: "(415) 555-1009",
    mobilePhone: ""
  },
  {
    id: "c2",
    clientId: "ld_001",
    firstName: "Sandra",
    lastName: "Wu",
    role: "CPA",
    workEmail: "s.wu@nimbusrobotics.com",
    email: "",
    workPhone: "(415) 555-2210",
    mobilePhone: ""
  },
  {
    id: "c3",
    clientId: "ld_005",
    firstName: "Marcus",
    lastName: "Hill",
    role: "Point of Contact",
    workEmail: "m.hill@northbeam.com",
    email: "",
    workPhone: "(404) 555-7700",
    mobilePhone: ""
  }
];
function loadStoredContacts() {
  if (typeof window === "undefined") {
    return seedContacts;
  }
  try {
    const stored = window.localStorage.getItem(CONTACTS_STORAGE_KEY);
    if (!stored) {
      return seedContacts;
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : seedContacts;
  } catch (error) {
    console.warn("Failed to load stored contacts:", error);
    return seedContacts;
  }
}
const seedEntities = [
  {
    id: "ce1",
    clientId: "ld_001",
    name: "Nimbus Robotics, Inc.",
    ein: "84-2910442",
    contacts: [
      { name: "Robert Chen", role: "Point of Contact" },
      { name: "Sandra Wu", role: "CPA" }
    ]
  },
  {
    id: "ce2",
    clientId: "ld_001",
    name: "Nimbus Software, LLC",
    ein: "84-2910443",
    contacts: [{ name: "Robert Chen", role: "Point of Contact" }]
  },
  {
    id: "ce3",
    clientId: "ld_005",
    name: "Northbeam Industries",
    ein: "58-3300112",
    contacts: [{ name: "Marcus Hill", role: "Point of Contact" }]
  }
];
function loadStoredCalls() {
  if (typeof window === "undefined") {
    return seedCalls;
  }
  try {
    const stored = window.localStorage.getItem(CALLS_STORAGE_KEY);
    if (!stored) return seedCalls;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : seedCalls;
  } catch (error) {
    console.warn("Failed to load stored calls:", error);
    return seedCalls;
  }
}
const seedCalls = [
  {
    id: "fc1",
    clientId: "ld_001",
    date: "2025-12-08",
    time: "10:00",
    notes: "Quarterly check-in",
    completed: false
  }
];
const useEngagementsStore = create((set, get) => ({
  engagements: seedEngagements,
  contacts: loadStoredContacts(),
  entities: seedEntities,
  calls: loadStoredCalls(),
  addEngagement: (e) => set((s) => ({
    engagements: [
      ...s.engagements,
      { ...e, id: `eng_${Date.now()}`, createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) }
    ]
  })),
  addContact: (c) => set((s) => ({
    contacts: [...s.contacts, { ...c, id: `contact_${Date.now()}` }]
  })),
  updateContact: (id, updates) => set((s) => ({
    contacts: s.contacts.map(
      (contact) => contact.id === id ? { ...contact, ...updates } : contact
    )
  })),
  deleteContact: (id) => set((s) => ({ contacts: s.contacts.filter((c) => c.id !== id) })),
  addCall: (c) => set((s) => ({ calls: [...s.calls, { ...c, id: `fc_${Date.now()}`, completed: false }] })),
  updateCall: (id, updates) => set((s) => ({
    calls: s.calls.map((call) => call.id === id ? { ...call, ...updates } : call)
  })),
  byClient: (clientId) => {
    const s = get();
    return {
      engagements: s.engagements.filter((e) => e.clientId === clientId),
      contacts: s.contacts.filter((c) => c.clientId === clientId),
      entities: s.entities.filter((e) => e.clientId === clientId),
      calls: s.calls.filter((c) => c.clientId === clientId)
    };
  }
}));
if (typeof window !== "undefined") {
  useEngagementsStore.subscribe((state) => {
    try {
      window.localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(state.contacts));
      window.localStorage.setItem(CALLS_STORAGE_KEY, JSON.stringify(state.calls));
    } catch (error) {
      console.warn("Failed to save engagement data:", error);
    }
  });
}
export {
  useEngagementsStore as u
};
