import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { VerticalScroll } from "@/components/ui/vertical-scroll";
import { SaveBuildDialog } from "@/components/SaveBuildDialog";
import { useNotificationHelpers } from "@/components/ClientNotifications";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { PartDetailsDialog } from "@/components/PartDetailsDialog";
import {
  Settings,
  DollarSign,
  Save,
  Download,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useBuild } from "@/contexts/BuildContext";
import { useAuth } from "@/contexts/AuthContext";

interface SelectedPartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface BuildSummaryProps {
  showBackButton?: boolean;
  showExportButtons?: boolean;
  className?: string;
  selectedParts?: Record<string, SelectedPartItem[]>;
  onRemovePart?: (partType: string, partId?: number) => void;
  onUpdateQuantity?: (
    partType: string,
    partId: number,
    quantity: number,
  ) => void;
  onTitleReset?: () => void;
}

const currentBuild = {
  case: { name: "Not selected", price: 0 },
  plate: { name: "Not selected", price: 0 },
  pcb: { name: "Not selected", price: 0 },
  switches: { name: "Not selected", price: 0 },
  stabilizers: { name: "Not selected", price: 0 },
  mountingMethod: { name: "Not selected", price: 0 },
  inserts: { name: "Not selected", price: 0 },
  lubricants: { name: "Not selected", price: 0 },
  deskmat: { name: "Not selected", price: 0 },
  cables: { name: "Not selected", price: 0 },
};

export function BuildSummary({
  showBackButton = false,
  showExportButtons = true,
  className = "",
  selectedParts = {},
  onRemovePart,
  onUpdateQuantity,
  onTitleReset,
}: BuildSummaryProps) {
  const navigate = useNavigate();
  const { buildTitle, setBuildTitle } = useBuild();
  const { isAuthenticated } = useAuth();
  const { notifyBuildSaved } = useNotificationHelpers();
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [previousTitle, setPreviousTitle] = useState(buildTitle);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  // Map part keys to route types
  const partKeyToRoute: Record<string, string> = {
    case: "case",
    plate: "plate",
    pcb: "pcb",
    switches: "switches",
    keycaps: "keycaps",
    stabilizers: "stabilizers",
    inserts: "inserts",
    lubricants: "lubricants",
    deskmat: "deskmat",
    cables: "cables",
  };

  const handlePartClick = (partKey: string) => {
    const routeType = partKeyToRoute[partKey];
    if (routeType) {
      navigate(`/builder/parts/${routeType}`);
    }
  };

  const handleSaveBuild = (data: {
    title: string;
    description: string;
    visibility: string;
  }) => {
    // TODO: API Integration - Save Build
    // When database is implemented, add API call:
    // - POST /api/builds with build data, title, description, and visibility
    // - Include current selectedParts and buildTitle
    // - Handle user authentication and validation

    // Update build title if changed
    if (data.title !== buildTitle) {
      setBuildTitle(data.title);
    }

    // Show success notification
    notifyBuildSaved(data.title, data.visibility);

    console.log("Saving build:", {
      ...data,
      parts: selectedParts,
      totalPrice,
      partCount: Object.keys(selectedParts).length,
    });
  };

  const handleRemoveClick = (
    partKey: string,
    partId: number | undefined,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    if (onRemovePart) {
      const routeType = partKeyToRoute[partKey];
      if (routeType) {
        onRemovePart(routeType, partId);
      }
    }
  };

  const handleQuantityChange = (
    partKey: string,
    partId: number,
    quantity: number,
  ) => {
    if (onUpdateQuantity) {
      const routeType = partKeyToRoute[partKey];
      if (routeType) {
        onUpdateQuantity(routeType, partId, quantity);
      }
    }
  };
  // Create build state with selected parts or defaults
  const buildState = {
    case: selectedParts.case || [],
    plate: selectedParts.plate || [],
    pcb: selectedParts.pcb || [],
    switches: selectedParts.switches || [],
    keycaps: selectedParts.keycaps || [],
    stabilizers: selectedParts.stabilizers || [],
    inserts: selectedParts.inserts || [],
    lubricants: selectedParts.lubricants || [],
    deskmat: selectedParts.deskmat || [],
    cables: selectedParts.cables || [],
  };

  const totalPrice = Object.values(buildState).reduce(
    (sum, parts) =>
      sum +
      parts.reduce((partSum, part) => partSum + part.price * part.quantity, 0),
    0,
  );

  // Simulate compatibility checking based on selected parts
  const getCompatibilityStatus = () => {
    const selectedCount = Object.values(buildState).filter(
      (parts) => parts.length > 0,
    ).length;

    if (selectedCount === 0) {
      return {
        status: "OK",
        label: "OK",
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
        icon: AlertCircle,
      };
    } else if (selectedCount < 5) {
      return {
        status: "OK",
        label: "OK",
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
        icon: AlertCircle,
      };
    } else {
      return {
        status: "GOOD",
        label: "GOOD",
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        icon: CheckCircle,
      };
    }
  };

  const compatibility = getCompatibilityStatus();

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate title - revert to previous if empty
    if (!buildTitle.trim()) {
      setBuildTitle(previousTitle);
    } else {
      setPreviousTitle(buildTitle);
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Validate title - revert to previous if empty
      if (!buildTitle.trim()) {
        setBuildTitle(previousTitle);
      } else {
        setPreviousTitle(buildTitle);
      }
      setIsEditingTitle(false);
    } else if (e.key === "Escape") {
      setBuildTitle(previousTitle);
      setIsEditingTitle(false);
    }
  };

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <div
              className="flex-1"
              onMouseEnter={() => setIsHoveringTitle(true)}
              onMouseLeave={() => {
                setIsHoveringTitle(false);
                if (!isEditingTitle) {
                  setIsEditingTitle(false);
                }
              }}
            >
              {isEditingTitle || isHoveringTitle ? (
                <form onSubmit={handleTitleSubmit} className="w-full">
                  <Input
                    value={buildTitle}
                    onChange={(e) => setBuildTitle(e.target.value)}
                    onFocus={() => {
                      setPreviousTitle(buildTitle);
                      setIsEditingTitle(true);
                    }}
                    onBlur={() => {
                      // Validate title - revert to previous if empty
                      if (!buildTitle.trim()) {
                        setBuildTitle(previousTitle);
                      } else {
                        setPreviousTitle(buildTitle);
                      }
                      setIsEditingTitle(false);
                      setIsHoveringTitle(false);
                    }}
                    onKeyDown={handleTitleKeyDown}
                    className="h-7 text-base font-semibold border-dashed bg-transparent p-0 border-0 border-b-2 border-dashed border-primary/50 rounded-none focus-visible:ring-0 focus-visible:border-primary"
                    placeholder="Enter build title..."
                  />
                </form>
              ) : (
                <span className="text-base font-semibold cursor-text h-7 flex items-center">
                  {buildTitle}
                </span>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {showBackButton && (
            <>
              <Link to="/builder">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Builder
                </Button>
              </Link>
              <Separator />
            </>
          )}

          <VerticalScroll
            className="w-full"
            maxHeight="max-h-96"
            showScrollButtons={true}
            scrollButtonVariant="minimal"
            gap="gap-4"
          >
            {Object.entries(buildState).map(([key, parts]) => {
              const hasItems = parts.length > 0;
              return (
                <div key={key} className="space-y-1">
                  <div
                    className="flex items-center space-x-2 group hover:bg-muted/30 p-2 rounded-md transition-colors cursor-pointer"
                    onClick={() => handlePartClick(key)}
                  >
                    <div className="flex-shrink-0">
                      {hasItems ? (
                        <div className="p-1 group-hover:bg-destructive/10 rounded transition-colors relative">
                          <div className="block group-hover:hidden">
                            <div className="h-3 w-3 flex items-center justify-center">
                              <div className="h-2 w-2 bg-primary rounded-full"></div>
                            </div>
                          </div>
                          <button
                            className="hidden group-hover:block"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveClick(key, undefined, e);
                            }}
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </button>
                        </div>
                      ) : (
                        <div className="p-1">
                          <Plus className="h-3 w-3 text-primary" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {hasItems
                          ? `${parts.length} item${parts.length > 1 ? "s" : ""}`
                          : "Not selected"}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      $
                      {parts
                        .reduce(
                          (sum, part) => sum + part.price * part.quantity,
                          0,
                        )
                        .toFixed(2)}
                    </span>
                  </div>

                  {hasItems && (
                    <div className="ml-6 space-y-1 relative">
                      {/* Vertical line connecting to parent */}
                      <div className="absolute -left-2 top-0 bottom-0 w-px bg-border"></div>
                      {parts.map((part, index) => (
                        <div key={part.id} className="relative">
                          {/* Straight horizontal line for first item in multi-item lists and all middle items */}
                          {(index === 0 && parts.length > 1) ||
                          (index > 0 && index < parts.length - 1) ? (
                            <div className="absolute -left-2 top-1/2 w-2 h-px bg-border"></div>
                          ) : null}
                          {/* Curved corner for single items or last item in multi-item lists */}
                          {(index === 0 && parts.length === 1) ||
                          (index === parts.length - 1 && parts.length > 1) ? (
                            <div className="absolute -left-2 top-1/2">
                              <div className="w-2 h-2 border-l border-b border-border rounded-bl-md -translate-y-1/2"></div>
                            </div>
                          ) : null}
                          {/* Bottom corner for last item */}
                          {index === parts.length - 1 && (
                            <div className="absolute -left-2 top-1/2 bottom-0 w-px bg-background"></div>
                          )}
                          <div className="flex items-center space-x-2 text-sm hover:bg-muted/20 p-2 rounded-md group relative z-10 transition-colors">
                            <div className="p-1 hover:bg-destructive/10 rounded transition-colors relative">
                              <div className="block group-hover:hidden">
                                <div className="h-3 w-3 flex items-center justify-center">
                                  <div className="h-1.5 w-1.5 bg-muted-foreground rounded-full"></div>
                                </div>
                              </div>
                              <button
                                className="hidden group-hover:block"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveClick(key, part.id, e);
                                }}
                                title={`Remove ${part.name}`}
                              >
                                <X className="h-3 w-3 text-destructive" />
                              </button>
                            </div>
                            <div className="flex-1 min-w-0">
                              <PartDetailsDialog
                                name={part.name}
                                manufacturer="Unknown"
                                specifications={{}}
                              >
                                <button className="text-xs font-medium truncate hover:text-primary transition-colors text-left w-full">
                                  {part.name}
                                </button>
                              </PartDetailsDialog>
                            </div>
                            <div className="flex items-center space-x-1">
                              {/* Price label - shown by default */}
                              <span className="text-xs font-medium group-hover:hidden">
                                ${part.price.toFixed(2)} × {part.quantity}
                              </span>

                              {/* Quantity controls - shown on hover */}
                              <div className="hidden group-hover:flex items-center space-x-1">
                                <QuantitySelector
                                  value={part.quantity}
                                  onChange={(quantity) =>
                                    handleQuantityChange(key, part.id, quantity)
                                  }
                                  onIncrease={() =>
                                    handleQuantityChange(
                                      key,
                                      part.id,
                                      part.quantity + 1,
                                    )
                                  }
                                  onDecrease={() =>
                                    handleQuantityChange(
                                      key,
                                      part.id,
                                      part.quantity - 1,
                                    )
                                  }
                                  size="sm"
                                  variant="inline"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </VerticalScroll>

          <Separator />

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Compatibility</span>
              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-md ${compatibility.bgColor}`}
              >
                <compatibility.icon
                  className={`h-3 w-3 ${compatibility.color}`}
                />
                <span className={`text-xs font-medium ${compatibility.color}`}>
                  {compatibility.label}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
              <div className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4" />
                <span>{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {showExportButtons && (
            <>
              <Separator />
              <div className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    if (!isAuthenticated) {
                      // TODO: Show sign-in modal/redirect
                      console.log("Please sign in to save builds");
                      return;
                    }
                    setSaveDialogOpen(true);
                  }}
                  disabled={!isAuthenticated}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
                <Button
                  style={{ background: "var(--linearPrimarySecondary)" }}
                  className="text-white w-full"
                  onClick={() => {
                    // TODO: API Integration - Export Parts List
                    // When database is implemented, add functionality to:
                    // - Generate PDF/CSV/JSON export of parts list
                    // - Include pricing from multiple vendors
                    // - Add affiliate links and purchase options
                    // - Generate shopping cart links for vendors
                    console.log("Export parts list");
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Parts List
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <SaveBuildDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        currentTitle={buildTitle}
        onSave={handleSaveBuild}
      />
    </>
  );
}
