import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import SubmitPage from "@/pages/SubmitPage";

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const submitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/submit",
  component: SubmitPage,
});

const routeTree = rootRoute.addChildren([indexRoute, submitRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
