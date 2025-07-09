import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BuildSummary } from "@/components/BuildSummary";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBuild } from "@/contexts/BuildContext";
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
} from "lucide-react";
import { Link } from "react-router-dom";

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
    name: "Stabilizers",
    type: "stabilizers",
    icon: Anchor,
    description: "Large key stabilization",
  },
  {
    name: "Mounting Method",
    type: "mounting-method",
    icon: Settings,
    description: "Case mounting style",
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container pt-8 pb-24">
        <PageHeader
          title="Builder"
          description="Configure your perfect mechanical keyboard build"
          action={
            <Button
              onClick={clearBuild}
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
            <div className="columns-1 md:columns-2 gap-4 space-y-4">
              {partCategories.map((category) => {
                const selectedPartsInCategory =
                  selectedParts[category.type] || [];
                const isSelected = selectedPartsInCategory.length > 0;
                const totalPrice = selectedPartsInCategory.reduce(
                  (sum, part) => sum + part.price * part.quantity,
                  0,
                );
                const totalQuantity = selectedPartsInCategory.reduce(
                  (sum, part) => sum + part.quantity,
                  0,
                );

                return (
                  <Card
                    key={category.type}
                    className={`hover:shadow-md transition-shadow break-inside-avoid mb-4 ${isSelected ? "border-primary bg-primary/5" : ""}`}
                  >
                    <CardContent className="p-4">
                      <Link to={`/builder/parts/${category.type}`}>
                        <div className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div
                              className="flex h-10 w-10 items-center justify-center rounded-md"
                              style={{
                                background: isSelected
                                  ? "var(--linearPrimaryAccent)"
                                  : "var(--linearPrimarySecondary)",
                              }}
                            >
                              <category.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{category.name}</h3>
                              {isSelected ? (
                                <div>
                                  <p className="text-sm font-medium text-primary">
                                    {selectedPartsInCategory.length} item
                                    {selectedPartsInCategory.length > 1
                                      ? "s"
                                      : ""}{" "}
                                    ({totalQuantity} total)
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    ${totalPrice.toFixed(2)}
                                  </p>
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground">
                                  {category.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                      </Link>

                      {isSelected && (
                        <div className="mt-4 space-y-2 border-t pt-3">
                          {selectedPartsInCategory.map((part) => (
                            <div
                              key={part.id}
                              className="p-3 bg-muted/30 rounded-md space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">
                                  {part.name}
                                </p>
                                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                  <span>Qty: {part.quantity}</span>
                                  <span>
                                    ${(part.price * part.quantity).toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              {part.manufacturer && (
                                <p className="text-xs text-muted-foreground">
                                  {part.manufacturer}
                                </p>
                              )}

                              {part.specifications && (
                                <div className="flex flex-wrap gap-1">
                                  {Object.entries(part.specifications)
                                    .slice(0, 2)
                                    .map(([key, value]) => (
                                      <span
                                        key={key}
                                        className="text-xs bg-muted px-1 py-0.5 rounded"
                                      >
                                        {key}: {value}
                                      </span>
                                    ))}
                                </div>
                              )}

                              {part.thumbnail && (
                                <div className="w-full h-24 rounded overflow-hidden bg-muted">
                                  <img
                                    src={part.thumbnail}
                                    alt={part.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Compatibility Information */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">
                Compatibility Information
              </h2>
              <div className="grid grid-cols-1 gap-3">
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-red-700 dark:text-red-400 text-sm">
                          Layout Compatibility
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          PCB, plate, and case must support the same layout
                          size.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-yellow-500/20 bg-yellow-500/5">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-yellow-700 dark:text-yellow-400 text-sm">
                          Switch Mounting
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Check 3-pin vs 5-pin switch compatibility with your
                          PCB.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-green-500/5">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-green-700 dark:text-green-400 text-sm">
                          Standard Parts
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Most components follow industry standards and are
                          compatible.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-yellow-500/20 bg-yellow-500/5">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-yellow-700 dark:text-yellow-400 text-sm">
                          Stabilizer Mounting
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Verify stabilizer mounting style matches your PCB
                          type.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Build Summary */}
          <div className="space-y-6">
            <BuildSummary
              selectedParts={selectedParts}
              onRemovePart={removePart}
              onUpdateQuantity={updatePartQuantity}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
