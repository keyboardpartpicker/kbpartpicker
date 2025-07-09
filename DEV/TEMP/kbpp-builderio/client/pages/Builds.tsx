import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BuildShowcase } from "@/components/BuildShowcase";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Build {
  id: string;
  title: string;
  description: string;
  totalPrice: number;
  thumbnail: string;
  poster: {
    username: string;
    profilePicture?: string;
  };
  likes: number;
  comments: number;
  layout: string;
  switchType: string;
}

interface Filters {
  search: string;
  switchType: string;
  layout: string;
  priceRange: string;
  sortBy: string;
}

export default function Builds() {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    switchType: "none",
    layout: "none",
    priceRange: "none",
    sortBy: "likes",
  });

  useEffect(() => {
    // Simulate API call - replace with actual API endpoint
    const fetchBuilds = async () => {
      try {
        // Mock data for demonstration
        const mockBuilds: Build[] = [
          {
            id: "1",
            title: "Midnight Tactile Dream",
            description:
              "A sleek 65% build featuring Holy Panda switches, GMK Laser keycaps, and a custom aluminum case. Perfect for both gaming and productivity with a satisfying tactile bump.",
            totalPrice: 485,
            thumbnail:
              "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
            poster: {
              username: "keybdlover",
              profilePicture:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
            },
            likes: 247,
            comments: 38,
            layout: "65%",
            switchType: "Tactile",
          },
          {
            id: "2",
            title: "Retro Gaming Beast",
            description:
              "Inspired by classic arcade machines, this 104-key build uses Cherry MX Blue switches and SA profile keycaps. Features custom RGB underglow with retro color patterns.",
            totalPrice: 320,
            thumbnail:
              "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
            poster: {
              username: "retrotech",
              profilePicture:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            },
            likes: 189,
            comments: 22,
            layout: "Full Size",
            switchType: "Clicky",
          },
          {
            id: "3",
            title: "Minimalist Linear",
            description:
              "Clean and simple 60% layout with Gateron Black Ink switches. White aluminum case with minimal legends on PBT keycaps. Perfect for the office environment.",
            totalPrice: 275,
            thumbnail:
              "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=300&fit=crop",
            poster: {
              username: "minimal_keys",
              profilePicture:
                "https://images.unsplash.com/photo-1494790108755-2616b9734b42?w=100&h=100&fit=crop&crop=face",
            },
            likes: 156,
            comments: 15,
            layout: "60%",
            switchType: "Linear",
          },
          {
            id: "4",
            title: "Artisan Enthusiast",
            description:
              "40% ortholinear layout featuring rare artisan keycaps and Zealios V2 switches. Hand-wired with per-key RGB and rotary encoders for volume and brightness control.",
            totalPrice: 650,
            thumbnail:
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
            poster: {
              username: "artisan_hunter",
              profilePicture:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            },
            likes: 324,
            comments: 67,
            layout: "40%",
            switchType: "Tactile",
          },
          {
            id: "5",
            title: "Budget Linear Build",
            description:
              "Proof that great keyboards don't have to break the bank. Features Gateron Yellow switches, PBT keycaps, and a plastic case. Excellent typing feel for under $150.",
            totalPrice: 145,
            thumbnail:
              "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
            poster: {
              username: "budget_builder",
              profilePicture:
                "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face",
            },
            likes: 198,
            comments: 45,
            layout: "TKL",
            switchType: "Linear",
          },
          {
            id: "6",
            title: "Silent Office Warrior",
            description:
              "75% layout optimized for office use with silent Bobagum switches. Sound dampening foam and O-rings ensure whisper-quiet typing without sacrificing feel.",
            totalPrice: 380,
            thumbnail:
              "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=400&h=300&fit=crop",
            poster: {
              username: "silent_typer",
              profilePicture:
                "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face",
            },
            likes: 134,
            comments: 28,
            layout: "75%",
            switchType: "Linear",
          },
        ];

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setBuilds(mockBuilds);
      } catch (error) {
        console.error("Error loading builds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, []);

  // Compute filtered builds directly instead of using separate state
  const filteredBuilds = React.useMemo(() => {
    let filtered = [...builds];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (build) =>
          build.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          build.description
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          build.poster.username
            .toLowerCase()
            .includes(filters.search.toLowerCase()),
      );
    }

    // Switch type filter
    if (filters.switchType && filters.switchType !== "none") {
      filtered = filtered.filter(
        (build) => build.switchType === filters.switchType,
      );
    }

    // Layout filter
    if (filters.layout && filters.layout !== "none") {
      filtered = filtered.filter((build) => build.layout === filters.layout);
    }

    // Price range filter
    if (filters.priceRange && filters.priceRange !== "none") {
      filtered = filtered.filter((build) => {
        switch (filters.priceRange) {
          case "under-200":
            return build.totalPrice < 200;
          case "200-400":
            return build.totalPrice >= 200 && build.totalPrice <= 400;
          case "400-600":
            return build.totalPrice >= 400 && build.totalPrice <= 600;
          case "over-600":
            return build.totalPrice > 600;
          default:
            return true;
        }
      });
    }

    // Sort builds
    return filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "likes":
          return b.likes - a.likes;
        case "comments":
          return b.comments - a.comments;
        case "price-low":
          return a.totalPrice - b.totalPrice;
        case "price-high":
          return b.totalPrice - a.totalPrice;
        default:
          return b.likes - a.likes;
      }
    });
  }, [builds, filters]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      switchType: "none",
      layout: "none",
      priceRange: "none",
      sortBy: "likes",
    });
  };

  const activeFilterCount = Object.values(filters).filter(
    (value, index) =>
      value && (index === 0 || value !== (index === 4 ? "likes" : "none")),
  ).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container pt-8 pb-24">
        <PageHeader
          title="Builds"
          description="Discover amazing keyboard builds from our community. Get inspired for your next project."
          action={
            <Button
              style={{ background: "var(--linearPrimarySecondary)" }}
              className="text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          }
        />

        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search builds, users, or descriptions..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>

              <Select
                value={filters.switchType}
                onValueChange={(value) =>
                  handleFilterChange("switchType", value)
                }
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Switch Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="Linear">Linear</SelectItem>
                  <SelectItem value="Tactile">Tactile</SelectItem>
                  <SelectItem value="Clicky">Clicky</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.layout}
                onValueChange={(value) => handleFilterChange("layout", value)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="40%">40%</SelectItem>
                  <SelectItem value="60%">60%</SelectItem>
                  <SelectItem value="65%">65%</SelectItem>
                  <SelectItem value="75%">75%</SelectItem>
                  <SelectItem value="TKL">TKL</SelectItem>
                  <SelectItem value="Full Size">Full Size</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.priceRange}
                onValueChange={(value) =>
                  handleFilterChange("priceRange", value)
                }
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="under-200">Under $200</SelectItem>
                  <SelectItem value="200-400">$200 - $400</SelectItem>
                  <SelectItem value="400-600">$400 - $600</SelectItem>
                  <SelectItem value="over-600">Over $600</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange("sortBy", value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="likes">Most Liked</SelectItem>
                  <SelectItem value="comments">Most Discussed</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="flex items-center space-x-1"
                >
                  <X className="h-4 w-4" />
                  <span>Clear Filters</span>
                  <Badge variant="secondary" className="ml-1">
                    {activeFilterCount}
                  </Badge>
                </Button>
              )}
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading builds...</p>
            </div>
          ) : filteredBuilds.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No builds found matching your criteria.
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Try adjusting your filters or search terms.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredBuilds.length} of {builds.length} builds
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBuilds.map((build) => (
                  <BuildShowcase
                    key={build.id}
                    id={build.id}
                    title={build.title}
                    description={build.description}
                    totalPrice={build.totalPrice}
                    thumbnail={build.thumbnail}
                    poster={build.poster}
                    likes={build.likes}
                    comments={build.comments}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
