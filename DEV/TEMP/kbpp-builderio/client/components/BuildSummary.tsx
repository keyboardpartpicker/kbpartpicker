import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";

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
}: BuildSummaryProps) {
  const navigate = useNavigate();
  const [buildTitle, setBuildTitle] = useState("New Unsaved Build");
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Map part keys to route types
  const partKeyToRoute: Record<string, string> = {
    case: "case",
    plate: "plate",
    pcb: "pcb",
    switches: "switches",
    stabilizers: "stabilizers",
    mountingMethod: "mounting-method",
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
    stabilizers: selectedParts.stabilizers || [],
    mountingMethod: selectedParts["mounting-method"] || [],
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
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditingTitle(false);
    } else if (e.key === "Escape") {
      setBuildTitle("New Unsaved Build");
      setIsEditingTitle(false);
    }
  };

  return (
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
                  onFocus={() => setIsEditingTitle(true)}
                  onBlur={() => {
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
                    <button
                      className="p-1 hover:bg-destructive/10 rounded transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveClick(key, undefined, e);
                      }}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </button>
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
                    .reduce((sum, part) => sum + part.price * part.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>

              {hasItems && (
                <div className="ml-6 space-y-1">
                  {parts.map((part) => (
                    <div
                      key={part.id}
                      className="flex items-center space-x-2 text-sm bg-muted/20 p-2 rounded-md"
                    >
                      <button
                        className="p-1 hover:bg-destructive/10 rounded transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveClick(key, part.id, e);
                        }}
                      >
                        <X className="h-3 w-3 text-destructive" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">
                          {part.name}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          className="h-6 w-6 rounded bg-muted hover:bg-muted/80 flex items-center justify-center text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(
                              key,
                              part.id,
                              part.quantity - 1,
                            );
                          }}
                        >
                          -
                        </button>
                        <Input
                          type="number"
                          min="1"
                          value={part.quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value) || 1;
                            handleQuantityChange(key, part.id, newQuantity);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="h-6 w-12 text-xs text-center p-1 border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                          className="h-6 w-6 rounded bg-muted hover:bg-muted/80 flex items-center justify-center text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(
                              key,
                              part.id,
                              part.quantity + 1,
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-medium">
                        ${(part.price * part.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

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
              <Button variant="outline" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
              <Button
                style={{ background: "var(--linearPrimarySecondary)" }}
                className="text-white w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Parts List
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
