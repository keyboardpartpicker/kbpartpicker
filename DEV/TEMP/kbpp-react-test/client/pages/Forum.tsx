import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ForumSection } from "@/components/ForumSection";
import { PageHeader } from "@/components/PageHeader";
import { ReturnToTop } from "@/components/ui/return-to-top";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Wrench, Settings, Globe } from "lucide-react";
import { useState } from "react";

export default function Forum() {
  const [searchQuery, setSearchQuery] = useState("");

  // TODO: API Integration - Forum Sections
  // When database is implemented, replace static data with API calls:
  // - GET /api/forum/sections to fetch all forum sections and categories
  // - GET /api/forum/search?q=${searchQuery} for search functionality
  // - Include pagination, filtering, and real-time updates
  // - Handle loading states, error handling, and retry logic

  const forumSections = [
    {
      icon: Wrench,
      title: "Builds",
      categories: [
        {
          id: "pre-purchase-advice",
          name: "Pre-Purchase Advice",
          description:
            "Request feedback on part lists prior to committing to a build.",
          posts: 1247,
          topics: 312,
          lastPost: {
            title: "First build - need advice on switch choice",
            author: "newbie_builder",
            timestamp: "2h ago",
            avatar:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
          },
        },
        {
          id: "parts-list-assistance",
          name: "Parts List Assistance",
          description:
            "Receive guidance from community members to assemble a complete keyboard parts list.",
          posts: 892,
          topics: 198,
          lastPost: {
            title: "65% build under $300 - missing anything?",
            author: "budget_keys",
            timestamp: "4h ago",
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b9734b42?w=100&h=100&fit=crop&crop=face",
          },
        },
        {
          id: "build-support-troubleshooting",
          name: "Build Support & Troubleshooting",
          description:
            "Seek help with hardware or software issues encountered during the build process.",
          posts: 2156,
          topics: 445,
          lastPost: {
            title: "PCB not responding after flash",
            author: "tech_helper",
            timestamp: "1h ago",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          },
        },
      ],
    },
    {
      icon: Settings,
      title: "Components",
      categories: [
        {
          id: "cases-plates",
          name: "Cases & Plates",
          description:
            "Discuss case compatibility, materials, layouts, and mounting styles.",
          posts: 756,
          topics: 167,
          lastPost: {
            title: "Gasket mount vs tray mount comparison",
            author: "case_expert",
            timestamp: "3h ago",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          },
        },
        {
          id: "switches",
          name: "Switches",
          description:
            "Explore switch variants, feel comparisons, lubing techniques, and recommendations.",
          posts: 3421,
          topics: 672,
          lastPost: {
            title: "Gateron Oil King vs Alpaca comparison",
            author: "switch_master",
            timestamp: "30m ago",
            avatar:
              "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face",
          },
        },
        {
          id: "keycaps",
          name: "Keycaps",
          description:
            "Dive into profiles, legends, aesthetics, and compatibility considerations.",
          posts: 1893,
          topics: 398,
          lastPost: {
            title: "SA vs Cherry profile for typing",
            author: "keycap_lover",
            timestamp: "1h ago",
            avatar:
              "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face",
          },
        },
        {
          id: "pcb-controllers",
          name: "PCB & Controllers",
          description:
            "Talk about PCBs, microcontrollers, layouts, and electrical quirks.",
          posts: 924,
          topics: 201,
          lastPost: {
            title: "RP2040 vs STM32 for custom PCB",
            author: "pcb_designer",
            timestamp: "5h ago",
            avatar:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
          },
        },
        {
          id: "stabilizers",
          name: "Stabilizers",
          description:
            "Share tuning tips, compatibility notes, and preferences.",
          posts: 645,
          topics: 134,
          lastPost: {
            title: "Durock v2 vs Cherry stab tuning guide",
            author: "stab_tuner",
            timestamp: "6h ago",
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b9734b42?w=100&h=100&fit=crop&crop=face",
          },
        },
        {
          id: "software-firmware",
          name: "Software & Firmware",
          description:
            "Engage in setup help or discussion around tools like QMK, VIA, Vial, etc.",
          posts: 1156,
          topics: 267,
          lastPost: {
            title: "QMK rotary encoder configuration help",
            author: "firmware_guru",
            timestamp: "2h ago",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          },
        },
      ],
    },
    {
      icon: Globe,
      title: "Community",
      categories: [
        {
          id: "deals-discounts",
          name: "Deals & Discounts",
          description:
            "Share limited-time offers or price drops on keyboard gear.",
          posts: 892,
          topics: 234,
          lastPost: {
            title: "GMK sets 40% off at MechMarket",
            author: "deal_hunter",
            timestamp: "15m ago",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          },
        },
        {
          id: "marketplace",
          name: "Marketplace",
          description:
            "Trade, sell, or give away keyboard components with fellow users.",
          posts: 2134,
          topics: 567,
          lastPost: {
            title: "[WTS] Holy Panda switches x90",
            author: "trader_joe",
            timestamp: "45m ago",
            avatar:
              "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face",
          },
        },
        {
          id: "parts-requests",
          name: "Parts Requests",
          description:
            "Suggest additions or corrections to the parts database curated by kbpartpicker.",
          posts: 346,
          topics: 89,
          lastPost: {
            title: "Request: Add Keychron Q-series cases",
            author: "database_helper",
            timestamp: "8h ago",
            avatar:
              "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face",
          },
        },
        {
          id: "feature-requests-feedback",
          name: "Feature Requests & Site Feedback",
          description:
            "Share ideas to improve the kbpartpicker tool or report bugs.",
          posts: 567,
          topics: 124,
          lastPost: {
            title: "Suggestion: Add sound test integration",
            author: "feature_requester",
            timestamp: "12h ago",
            avatar:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
          },
        },
        {
          id: "general-discussion",
          name: "General Discussion",
          description:
            "A relaxed space for keyboard-related chat that doesn't fit other categories.",
          posts: 4567,
          topics: 892,
          lastPost: {
            title: "What got you into mechanical keyboards?",
            author: "community_member",
            timestamp: "20m ago",
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b9734b42?w=100&h=100&fit=crop&crop=face",
          },
        },
        {
          id: "developer-announcements",
          name: "Developer Announcements",
          description:
            "Official updates and changelogs from the kbpartpicker development team.",
          posts: 89,
          topics: 23,
          lastPost: {
            title: "v2.1 Update: Enhanced filtering options",
            author: "dev_team",
            timestamp: "2d ago",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          },
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container pt-8 pb-24">
        <PageHeader
          title="Forum"
          description="Connect with fellow keyboard enthusiasts, get help with builds, and share your knowledge."
          action={
            <Button
              style={{ background: "var(--linearPrimarySecondary)" }}
              className="text-white"
              onClick={() => {
                // TODO: API Integration - Create New Topic
                // When implemented, add functionality to:
                // - Open topic creation modal/page
                // - POST /api/forum/topics with topic data
                // - Include user authentication and validation
                // - Redirect to new topic page after creation
                console.log("Create new topic");
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Topic
            </Button>
          }
        />

        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search forum topics..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // TODO: API Integration - Forum Search
                // When implemented, add debounced search API call:
                // - GET /api/forum/search?q=${searchQuery}
                // - Update results in real-time as user types
                // - Include search suggestions and autocomplete
              }}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-6">
          {forumSections.map((section) => (
            <ForumSection
              key={section.title}
              icon={section.icon}
              title={section.title}
              categories={section.categories}
            />
          ))}
        </div>
      </main>
      <Footer />
      <ReturnToTop />
    </div>
  );
}
