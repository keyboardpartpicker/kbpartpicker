import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BuildProvider } from "@/contexts/BuildContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/components/ClientNotifications";
import Index from "./pages/Index";
import Builder from "./pages/Builder";
import BuilderParts from "./pages/BuilderParts";
import Builds from "./pages/Builds";
import BuildsPost from "./pages/BuildsPost";
import Pulse from "./pages/Pulse";
import Forum from "./pages/Forum";
import ForumCategory from "./pages/ForumCategory";
import ForumTopic from "./pages/ForumTopic";
import NotFound from "./pages/NotFound";
import SavedBuilds from "./pages/SavedBuilds";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

// Component to handle scroll reset on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotificationProvider>
        <AuthProvider>
          <BuildProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/builder" element={<Builder />} />
                <Route path="/builder/parts" element={<BuilderParts />} />
                <Route path="/builder/parts/:type" element={<BuilderParts />} />
                <Route path="/builds" element={<Builds />} />
                <Route path="/builds/post/:id" element={<BuildsPost />} />
                <Route path="/saved" element={<SavedBuilds />} />
                <Route path="/user/:username" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/pulse" element={<Pulse />} />
                <Route path="/forum" element={<Forum />} />
                <Route
                  path="/forum/category/:categoryId"
                  element={<ForumCategory />}
                />
                <Route path="/forum/topic/:topicId" element={<ForumTopic />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </BuildProvider>
        </AuthProvider>
      </NotificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

// Proper root management for HMR compatibility
const container = document.getElementById("root")!;
let root = (globalThis as any).__APP_ROOT__;

if (!root) {
  root = createRoot(container);
  (globalThis as any).__APP_ROOT__ = root;
}

root.render(<App />);
