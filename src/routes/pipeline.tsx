import { createFileRoute, redirect } from "@tanstack/react-router";
import { PipelinePage } from "@/pages/PipelinePage";
import { useAuthStore } from "@/store/authStore";

export const Route = createFileRoute("/pipeline")({
  beforeLoad: () => {
    if (!useAuthStore.getState().isAuthenticated) throw redirect({ to: "/login" });
  },
  head: () => ({
    meta: [
      { title: "Client Pipeline — Sales Billing CRM" },
      {
        name: "description",
        content: "Manage leads, send proposals, and track active client engagements.",
      },
      { property: "og:title", content: "Client Pipeline" },
      {
        property: "og:description",
        content: "Manage leads, send proposals, and track active engagements.",
      },
    ],
  }),
  component: PipelinePage,
});
