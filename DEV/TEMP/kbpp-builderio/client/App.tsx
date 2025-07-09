import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BuildProvider } from "@/contexts/BuildContext";
import Index from "./pages/Index";
import Builder from "./pages/Builder";
import BuilderPartsHub from "./pages/BuilderPartsHub";
import Builds from "./pages/Builds";
import BuildPost from "./pages/BuildPost";
import Pulse from "./pages/Pulse";
import Forum from "./pages/Forum";
import ForumCategory from "./pages/ForumCategory";
import ForumTopic from "./pages/ForumTopic";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BuildProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/builder/parts" element={<BuilderPartsHub />} />
            <Route path="/builder/parts/:type" element={<BuilderPartsHub />} />
            <Route path="/builds" element={<Builds />} />
            <Route path="/builds/post/:id" element={<BuildPost />} />
            <Route path="/pulse" element={<Pulse />} />
            <Route path="/forum" element={<Forum />} />
            <Route
              path="/forum/category/:categoryId"
              element={<ForumCategory />}
            />
            <Route path="/forum/topic/:topicId" element={<ForumTopic />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BuildProvider>
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
