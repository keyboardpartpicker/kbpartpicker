import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BuildSummary } from "@/components/BuildSummary";
import { PageHeader } from "@/components/PageHeader";
import { ReturnToTop } from "@/components/ui/return-to-top";
import { BuilderCategory } from "@/components/BuilderCategory";
import { CompatibilityCard } from "@/components/CompatibilityCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";
import { VerticalScroll } from "@/components/ui/vertical-scroll";
import { useBuild } from "@/contexts/BuildContext";
import { useStickyScroll } from "@/hooks/use-sticky-scroll";
import { useRef } from "react";
import {
  Monitor,
  Layers,
  Cpu,
  ToggleLeft,
  Anchor,
  Settings,
  Droplets,
  MousePointer,
  Cable,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Trash2,
  ExternalLink,
  Grid3X3,
} from "lucide-react";
import { Link } from "react-router-dom";

// TODO: API Integration - Part Categories
// When database is implemented, replace static data with API calls:
// - GET /api/parts/categories to fetch available part categories
// - GET /api/builds/compatibility to fetch compatibility rules
// - Include category-specific part counts and pricing
// - Handle loading states, error handling, and retry logic

const partCategories = [
  {
    name: "Case",
    type: "case",
    icon: Monitor,
    description: "Keyboard housing and frame",
  },
  {
    name: "Plate",
    type: "plate",
    icon: Layers,
    description: "Switch mounting plate",
  },
  {
    name: "PCB",
    type: "pcb",
    icon: Cpu,
    description: "Circuit board and electronics",
  },
  {
    name: "Switches",
    type: "switches",
    icon: ToggleLeft,
    description: "Mechanical switches",
  },
  {
    name: "Keycaps",
    type: "keycaps",
    icon: Grid3X3,
    description: "Key top caps and legends",
  },
  {
    name: "Stabilizers",
    type: "stabilizers",
    icon: Anchor,
    description: "Large key stabilization",
  },
  {
    name: "Inserts",
    type: "inserts",
    icon: Layers,
    description: "Sound dampening materials",
  },
  {
    name: "Lubricants",
    type: "lubricants",
    icon: Droplets,
    description: "Switch and stabilizer lube",
  },
  {
    name: "Deskmat",
    type: "deskmat",
    icon: MousePointer,
    description: "Desk protection and aesthetics",
  },
  {
    name: "Cables",
    type: "cables",
    icon: Cable,
    description: "USB and connection cables",
  },
];

export default function Builder() {
  const { selectedParts, removePart, updatePartQuantity, clearBuild } =
    useBuild();

  // Ref for BuildSummary container
  const buildSummaryRef = useRef<HTMLDivElement>(null);

  // Sticky scroll behavior for BuildSummary
  const stickyState = useStickyScroll(buildSummaryRef, {
    trackEndSelector: "[data-compatibility-section]",
    bottomPadding: 24,
  });

  // TODO: API Integration - Parts Database
  // When parts database is implemented, replace the static partCategories data with:
  // - useEffect to fetch categories from API: GET /api/parts/categories
  // - For each category, fetch actual parts data: GET /api/parts?category={type}
  // - Update selectedParts to include actual part data from database
  // - Add loading states and error handling for API calls

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container pt-8 pb-24">
        <PageHeader
          title="Builder"
          description="Configure your perfect mechanical keyboard build"
          action={
            <Button
              onClick={() => {
                // TODO: API Integration - Clear Build
                // When database is implemented, add functionality to:
                // - DELETE /api/builds/current to clear current build
                // - Clear any saved build progress
                // - Reset build session state
                clearBuild();
                // Reset build title if the function is available
                if ((window as any).resetBuildTitle) {
                  (window as any).resetBuildTitle();
                }
              }}
              style={{ background: "var(--linearPrimarySecondary)" }}
              className="text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Start New Build
            </Button>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Parts Selection */}
          <div className="lg:col-span-2 space-y-6">
            <VerticalScroll
              className="w-full"
              maxHeight="max-h-[calc(100vh-16rem)]"
              showScrollButtons={true}
              scrollButtonVariant="minimal"
              gap="gap-4"
            >
              {partCategories.map((category) => {
                const selectedPartsInCategory =
                  selectedParts[category.type] || [];

                return (
                  <BuilderCategory
                    key={category.type}
                    category={category}
                    selectedParts={selectedPartsInCategory}
                    onRemoveAll={() => removePart(category.type)}
                    onRemovePart={(partId) => removePart(category.type, partId)}
                    onUpdateQuantity={(partId, quantity) =>
                      updatePartQuantity(category.type, partId, quantity)
                    }
                  />
                );
              })}
            </VerticalScroll>

            {/* Compatibility Information */}
            <div className="mt-8" data-compatibility-section>
              <h2 className="text-xl font-semibold mb-4">
                Compatibility Information
              </h2>
              <HorizontalScroll
                className="w-full"
                scrollButtonVariant="minimal"
                gap="gap-3"
              >
                <CompatibilityCard
                  type="error"
                  title="Layout Compatibility"
                  description="PCB, plate, and case must support the same layout size."
                />
                <CompatibilityCard
                  type="warning"
                  title="Switch Mounting"
                  description="Check 3-pin vs 5-pin switch compatibility with your PCB."
                />
                <CompatibilityCard
                  type="success"
                  title="Standard Parts"
                  description="Most components follow industry standards and are compatible."
                />
                <CompatibilityCard
                  type="warning"
                  title="Stabilizer Mounting"
                  description="Verify stabilizer mounting style matches your PCB type."
                />
              </HorizontalScroll>
            </div>
          </div>

          {/* Build Summary */}
          <div className="space-y-6">
            {/* Placeholder to maintain layout when sticky */}
            {stickyState.isSticky && stickyState.originalRect && (
              <div
                style={{
                  height: `${stickyState.originalRect.height}px`,
                  width: `${stickyState.originalRect.width}px`,
                }}
                aria-hidden="true"
              />
            )}

            <div
              ref={buildSummaryRef}
              className={`transition-none ${
                stickyState.isSticky
                  ? "fixed z-40"
                  : stickyState.isStatic
                    ? "absolute"
                    : "relative"
              }`}
              style={{
                top: stickyState.isSticky
                  ? `${stickyState.stickyPosition.top}px`
                  : stickyState.isStatic && stickyState.staticPosition
                    ? `${stickyState.staticPosition.top}px`
                    : "auto",
                left: stickyState.isSticky
                  ? `${stickyState.stickyPosition.left}px`
                  : stickyState.isStatic && stickyState.staticPosition
                    ? `${stickyState.staticPosition.left}px`
                    : "auto",
                width:
                  stickyState.isSticky || stickyState.isStatic
                    ? `${stickyState.stickyPosition.width}px`
                    : "auto",
              }}
            >
              <BuildSummary
                selectedParts={selectedParts}
                onRemovePart={removePart}
                onUpdateQuantity={updatePartQuantity}
                onTitleReset={() => {}}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ReturnToTop />
    </div>
  );
}
