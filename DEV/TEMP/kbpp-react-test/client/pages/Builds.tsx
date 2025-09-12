import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BuildsCard } from "@/components/BuildsCard";
import { PageHeader } from "@/components/PageHeader";
import { ReturnToTop } from "@/components/ui/return-to-top";
import { SearchableGrid } from "@/components/SearchableGrid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
  isLiked: boolean;
  isSaved: boolean;
  switchType?: string;
  layout?: string;
  createdAt?: string;
}

export default function Builds() {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: API Integration - Builds Feed
    // When database is implemented, replace the setTimeout with actual API call:
    // - GET /api/builds?page=1&limit=20&filters=${encodeURIComponent(JSON.stringify(filters))}
    // - Include pagination, search, filtering, and sorting parameters
    // - Handle user authentication for user-specific builds
    // - Add loading states, error handling, and retry logic
    // - Cache results for better performance

    const mockBuilds: Build[] = [
      {
        id: "1",
        title: "Frosted Dream 65%",
        description:
          "A clean and minimal 65% build with a focus on premium typing experience. Features lubed Alpaca switches and premium keycaps.",
        totalPrice: 425,
        thumbnail:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
        poster: {
          username: "KeyMaster",
          profilePicture:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        },
        likes: 127,
        comments: 24,
        isLiked: false,
        isSaved: false,
        switchType: "Linear",
        layout: "65%",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "2", 
        title: "Retro Terminal Build",
        description:
          "Vintage-inspired build with MT3 keycaps and tactile switches. Perfect for that nostalgic computing experience.",
        totalPrice: 680,
        thumbnail:
          "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
        poster: {
          username: "VintageKeeb",
          profilePicture:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        },
        likes: 203,
        comments: 45,
        isLiked: true,
        isSaved: true,
        switchType: "Tactile",
        layout: "TKL",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        id: "3",
        title: "Budget Beast 60%",
        description:
          "Proof that you don't need to break the bank for a great typing experience. Budget-friendly components that punch above their weight.",
        totalPrice: 185,
        thumbnail:
          "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=400&h=300&fit=crop",
        poster: {
          username: "BudgetBuilder",
        },
        likes: 89,
        comments: 31,
        isLiked: false,
        isSaved: false,
        switchType: "Linear",
        layout: "60%",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
      },
    ];

    const timer = setTimeout(() => {
      setBuilds(mockBuilds);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container pt-8 pb-24">
        <PageHeader
          title="Builds"
          description="Discover amazing mechanical keyboard builds from the community"
          action={
            <Button
              style={{ background: "var(--linearPrimarySecondary)" }}
              className="text-white"
              onClick={() => {
                // TODO: API Integration - Share Build
                // When database is implemented, add functionality to:
                // - Open build sharing modal/form
                // - POST /api/builds with build data and images
                // - Include user authentication and validation
                // - Upload images to storage service
                // - Redirect to shared build page after creation
                console.log("Share your build");
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Share Your Build
            </Button>
          }
        />

        <SearchableGrid
          items={builds}
          searchPlaceholder="Search builds, users, or descriptions..."
          searchFields={["title", "description", "poster"]}
          filterOptions={[
            {
              key: "switchType",
              label: "Switch Type",
              placeholder: "Switch Type",
              options: [
                { value: "Linear", label: "Linear" },
                { value: "Tactile", label: "Tactile" },
                { value: "Clicky", label: "Clicky" },
              ],
              width: "w-[140px]",
            },
            {
              key: "layout", 
              label: "Layout",
              placeholder: "Layout",
              options: [
                { value: "40%", label: "40%" },
                { value: "60%", label: "60%" },
                { value: "65%", label: "65%" },
                { value: "75%", label: "75%" },
                { value: "TKL", label: "TKL" },
                { value: "Full Size", label: "Full Size" },
              ],
              width: "w-[120px]",
            },
            {
              key: "priceRange",
              label: "Price Range", 
              placeholder: "Price Range",
              options: [
                { value: "under-200", label: "Under $200" },
                { value: "200-400", label: "$200 - $400" },
                { value: "400-600", label: "$400 - $600" },
                { value: "over-600", label: "Over $600" },
              ],
              width: "w-[140px]",
            },
          ]}
          sortOptions={[
            { value: "popularity", label: "Most Liked" },
            { value: "comments", label: "Most Discussed" },
            { value: "price-low", label: "Price: Low to High" },
            { value: "price-high", label: "Price: High to Low" },
            { value: "date-new", label: "Newest First" },
          ]}
          defaultSort="popularity"
        >
          {(filteredBuilds) => {
            if (loading) {
              return (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading builds...</p>
                </div>
              );
            }

            if (filteredBuilds.length === 0) {
              return (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No builds found matching your criteria.
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBuilds.map((build) => (
                  <BuildsCard
                    key={build.id}
                    id={build.id}
                    title={build.title}
                    description={build.description}
                    totalPrice={build.totalPrice}
                    thumbnail={build.thumbnail}
                    poster={build.poster}
                    likes={build.likes}
                    comments={build.comments}
                    isLiked={build.isLiked}
                    isSaved={build.isSaved}
                  />
                ))}
              </div>
            );
          }}
        </SearchableGrid>
      </main>
      <Footer />
      <ReturnToTop />
    </div>
  );
}
