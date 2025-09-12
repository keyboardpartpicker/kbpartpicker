import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sparkles,
  Wrench,
  Layout,
  TrendingUp,
  MessageCircle,
  FolderOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AuthDialog } from "@/components/AuthDialog";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import { useAuth } from "@/contexts/AuthContext";

const navigationItems = [
  { name: "Builder", href: "/builder", icon: Wrench },
  { name: "Builds", href: "/builds", icon: Layout },
  { name: "Pulse", href: "/pulse", icon: TrendingUp },
  { name: "Forum", href: "/forum", icon: MessageCircle },
];

export function Navbar() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const { isAuthenticated, loading } = useAuth();

  const handleSignIn = () => {
    setAuthMode("signin");
    setAuthDialogOpen(true);
  };

  const handleSignUp = () => {
    setAuthMode("signup");
    setAuthDialogOpen(true);
  };

  // Don't render anything while loading auth state
  if (loading) {
    return (
      <header
        className="sticky top-0 z-50 w-full border-b bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95"
        style={{ backgroundColor: "rgba(16, 18, 20, 0.98)" }}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-md"
              style={{ background: "var(--linearPrimarySecondary)" }}
            >
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span
              className="font-bold text-xl bg-clip-text text-transparent"
              style={{
                background: "var(--linearPrimarySecondary)",
                backgroundClip: "text",
              }}
            >
              KBPartPicker
            </span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95"
      style={{ backgroundColor: "rgba(16, 18, 20, 0.98)" }}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{ background: "var(--linearPrimarySecondary)" }}
          >
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span
            className="font-bold text-xl bg-clip-text text-transparent"
            style={{
              background: "var(--linearPrimarySecondary)",
              backgroundClip: "text",
            }}
          >
            KBPartPicker
          </span>
        </Link>

        {/* Navigation - Always visible */}
        <NavigationMenu className="flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.href}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Section - Changes based on auth state */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-3">
            <Link to="/saved">
              <Button variant="outline" size="sm">
                <FolderOpen className="h-4 w-4 mr-2" />
                Manage Builds
              </Button>
            </Link>
            <NotificationsDropdown />
            <ProfileDropdown />
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button
              size="sm"
              style={{ background: "var(--linearPrimarySecondary)" }}
              className="hover:opacity-90 transition-opacity text-white"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>

      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </header>
  );
}
