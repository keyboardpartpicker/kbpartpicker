import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "var(--radialPrimaryAccent)",
        }}
      />
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button 
              size="lg"
              style={{ background: "var(--linearPrimarySecondary)" }}
              className="text-white"
            >
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Button>
          </Link>
          <Link to="/builds">
            <Button variant="outline" size="lg">
              <Search className="h-4 w-4 mr-2" />
              Browse Builds
            </Button>
          </Link>
        </div>

        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            Lost? Try searching from the navigation or{" "}
            <Link to="/builder" className="text-primary hover:underline">
              start building your keyboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
