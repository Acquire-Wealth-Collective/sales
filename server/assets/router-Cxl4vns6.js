import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouterState, useNavigate, Link, createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect } from "react";
import { X, Calculator, Users, LogOut, LogIn, Menu } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Toaster as Toaster$1 } from "sonner";
const appCss = "/sales/assets/styles-3OM8fNC_.css";
function reportError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__appErrorEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(SheetPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (username, password) => {
        await new Promise((r) => setTimeout(r, 700));
        if (!username || password.length < 4) throw new Error("Invalid credentials");
        set({
          user: { username, displayName: username },
          token: `mock_${Date.now()}`,
          isAuthenticated: true
        });
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false })
    }),
    { name: "crm-auth" }
  )
);
const NAV = [
  { to: "/", label: "Sales Billing Calculator", icon: Calculator },
  { to: "/pipeline", label: "Client Dashboard", icon: Users }
];
function AppHeader() {
  const { location } = useRouterState();
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (to) => to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 w-full border-b border-navy/20 bg-navy text-white shadow-elevated", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/",
        search: {
          clientName: void 0,
          taxYears: void 0,
          latestCalculation: void 0,
          hasExistingCalculation: false
        },
        className: "flex items-center gap-3 group",
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur ring-1 ring-white/20 transition-transform group-hover:scale-105", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-bold tracking-tight", style: { color: "var(--logo)" }, children: "SB" }) }),
          /* @__PURE__ */ jsxs("div", { className: "hidden sm:block leading-tight", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-white", children: "Sales Billing Calculator" }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-white/70", children: "R&D Tax Credit & Billing" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-1", children: [
      NAV.map((n) => {
        const active = isActive(n.to);
        const Icon = n.icon;
        return /* @__PURE__ */ jsxs(
          Link,
          {
            to: n.to,
            search: {},
            className: cn(
              "relative inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all",
              active ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/5 hover:text-white"
            ),
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: n.label }),
              active && /* @__PURE__ */ jsx("span", { className: "absolute -bottom-1 left-3 right-3 h-0.5 rounded-full bg-orange" })
            ]
          },
          n.to
        );
      }),
      isAuthenticated ? /* @__PURE__ */ jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          onClick: () => {
            logout();
            navigate({ to: "/login", search: {} });
          },
          className: "ml-2 text-white/85 hover:bg-white/10 hover:text-white",
          children: [
            /* @__PURE__ */ jsx(LogOut, { className: "mr-1.5 h-4 w-4" }),
            user?.displayName ?? "Sign out"
          ]
        }
      ) : /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/login",
          className: "ml-2 inline-flex items-center gap-2 rounded-md bg-orange px-3 py-2 text-sm font-semibold text-orange-foreground shadow-elevated hover:bg-orange/90",
          children: [
            /* @__PURE__ */ jsx(LogIn, { className: "h-4 w-4" }),
            " Log In"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Sheet, { open: mobileOpen, onOpenChange: setMobileOpen, children: [
      /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "md:hidden text-white hover:bg-white/10", children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }) }) }),
      /* @__PURE__ */ jsx(SheetContent, { side: "right", className: "w-72 bg-navy text-white border-navy/30", children: /* @__PURE__ */ jsxs("nav", { className: "mt-8 flex flex-col gap-1", children: [
        NAV.map((n) => {
          const Icon = n.icon;
          return /* @__PURE__ */ jsxs(
            Link,
            {
              to: n.to,
              search: {},
              onClick: () => setMobileOpen(false),
              className: cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(n.to) ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
              ),
              children: [
                /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
                " ",
                n.label
              ]
            },
            n.to
          );
        }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 border-t border-white/10 pt-4", children: isAuthenticated ? /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              logout();
              setMobileOpen(false);
              navigate({ to: "/login", search: {} });
            },
            className: "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10",
            children: [
              /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
              " Sign out"
            ]
          }
        ) : /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/login",
            search: {},
            onClick: () => setMobileOpen(false),
            className: "flex items-center gap-3 rounded-md bg-orange px-3 py-2.5 text-sm font-semibold text-orange-foreground",
            children: [
              /* @__PURE__ */ jsx(LogIn, { className: "h-4 w-4" }),
              " Log In"
            ]
          }
        ) })
      ] }) })
    ] })
  ] }) });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        search: {
          clientName: void 0,
          taxYears: void 0,
          latestCalculation: void 0,
          hasExistingCalculation: false
        },
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sales Billing Calculator — R&D Tax Credit & Billing" },
      {
        name: "description",
        content: "Enterprise R&D tax credit and billing CRM platform for multi-entity clients."
      },
      { property: "og:title", content: "Sales Billing Calculator" },
      {
        property: "og:description",
        content: "Enterprise R&D tax credit and billing CRM platform."
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Sales Billing Calculator" },
      { name: "twitter:card", content: "summary" },
      { name: "theme-color", content: "#00264A" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(AppHeader, {}),
      /* @__PURE__ */ jsx(Outlet, {})
    ] }),
    /* @__PURE__ */ jsx(Toaster, { richColors: true, position: "top-right" })
  ] });
}
const $$splitComponentImporter$7 = () => import("./pipeline-CzoQDUPJ.js");
const Route$7 = createFileRoute("/pipeline")({
  head: () => ({
    meta: [{
      title: "Client Pipeline — Sales Billing CRM"
    }, {
      name: "description",
      content: "Manage leads, send proposals, and track active client engagements."
    }, {
      property: "og:title",
      content: "Client Pipeline"
    }, {
      property: "og:description",
      content: "Manage leads, send proposals, and track active engagements."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./login-DZZO2Od9.js");
const Route$6 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign In — Sales Billing Calculator"
    }, {
      name: "description",
      content: "Sign in to the enterprise R&D tax credit and billing workspace."
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./documents-CMRBABdN.js");
const Route$5 = createFileRoute("/documents")({
  head: () => ({
    meta: [{
      title: "Document Requests — Sales Billing CRM"
    }, {
      name: "description",
      content: "Track every document request sent to engaged clients across all engagements."
    }, {
      property: "og:title",
      content: "Document Request Overview"
    }, {
      property: "og:description",
      content: "Track every document request sent to engaged clients."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-D29SjwJi.js");
const Route$4 = createFileRoute("/")({
  validateSearch: (search) => ({
    clientName: typeof search.clientName === "string" ? search.clientName : void 0,
    taxYears: typeof search.taxYears === "string" ? search.taxYears : void 0,
    latestCalculation: typeof search.latestCalculation === "string" ? search.latestCalculation : void 0,
    hasExistingCalculation: typeof search.hasExistingCalculation === "boolean" ? search.hasExistingCalculation : false
  }),
  head: () => ({
    meta: [{
      title: "R&D Billing Calculator — Sales Billing Platform"
    }, {
      name: "description",
      content: "Enterprise R&D tax credit and billing calculator for multi-entity clients."
    }, {
      property: "og:title",
      content: "R&D Billing Calculator"
    }, {
      property: "og:description",
      content: "Enterprise R&D tax credit and billing calculator."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./documents.configure-CrCzCuOI.js");
const Route$3 = createFileRoute("/documents/configure")({
  head: () => ({
    meta: [{
      title: "Configure Request — Documents"
    }, {
      name: "description",
      content: "Create a new document request for an active engagement."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./clients._id-CH9SuEBV.js");
const Route$2 = createFileRoute("/clients/$id")({
  head: () => ({
    meta: [{
      title: "Client Profile — Sales Billing CRM"
    }, {
      name: "description",
      content: "Client overview with engagements, contacts, intake, and follow-up calls."
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./documents.review._engagementId-DRMn3ovd.js");
const Route$1 = createFileRoute("/documents/review/$engagementId")({
  head: () => ({
    meta: [{
      title: "Review Request — Documents"
    }, {
      name: "description",
      content: "Review the email preview before sending the document request."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./documents.edit._engagementId-CmscAv4-.js");
const Route = createFileRoute("/documents/edit/$engagementId")({
  head: () => ({
    meta: [{
      title: "Edit Request — Documents"
    }, {
      name: "description",
      content: "Edit a document request: documents, recipients, due date and notes."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const PipelineRoute = Route$7.update({
  id: "/pipeline",
  path: "/pipeline",
  getParentRoute: () => Route$8
});
const LoginRoute = Route$6.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$8
});
const DocumentsRoute = Route$5.update({
  id: "/documents",
  path: "/documents",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const DocumentsConfigureRoute = Route$3.update({
  id: "/configure",
  path: "/configure",
  getParentRoute: () => DocumentsRoute
});
const ClientsIdRoute = Route$2.update({
  id: "/clients/$id",
  path: "/clients/$id",
  getParentRoute: () => Route$8
});
const DocumentsReviewEngagementIdRoute = Route$1.update({
  id: "/review/$engagementId",
  path: "/review/$engagementId",
  getParentRoute: () => DocumentsRoute
});
const DocumentsEditEngagementIdRoute = Route.update({
  id: "/edit/$engagementId",
  path: "/edit/$engagementId",
  getParentRoute: () => DocumentsRoute
});
const DocumentsRouteChildren = {
  DocumentsConfigureRoute,
  DocumentsEditEngagementIdRoute,
  DocumentsReviewEngagementIdRoute
};
const DocumentsRouteWithChildren = DocumentsRoute._addFileChildren(
  DocumentsRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  DocumentsRoute: DocumentsRouteWithChildren,
  LoginRoute,
  PipelineRoute,
  ClientsIdRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  Route$2 as R,
  buttonVariants as b,
  cn as c,
  router as r,
  useAuthStore as u
};
