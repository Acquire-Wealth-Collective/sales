import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { router } from "./router";
import "./styles.css";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

/**
 * GitHub Pages SPA redirect fix
 * (prevents initial 404 flash + restores correct route)
 */
function SpaFix() {
  useEffect(() => {
    const redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;

    if (redirect && redirect !== location.href) {
      history.replaceState(null, "", redirect);
    }
  }, []);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SpaFix />
    <RouterProvider router={router} />
  </StrictMode>
);