import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { PartDetailsDialog } from "@/components/PartDetailsDialog";
import { ChevronRight, Trash2, ExternalLink, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface SelectedPartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  manufacturer?: string;
  thumbnail?: string;
  specifications?: Record<string, string>;
  type?: string;
}

interface PartCategory {
  name: string;
  type: string;
  icon: LucideIcon;
  description: string;
}

interface BuilderCategoryProps {
  category: PartCategory;
  selectedParts: SelectedPartItem[];
  onRemoveAll: () => void;
  onRemovePart: (partId: number) => void;
  onUpdateQuantity: (partId: number, quantity: number) => void;
}

export function BuilderCategory({
  category,
  selectedParts,
  onRemoveAll,
  onRemovePart,
  onUpdateQuantity,
}: BuilderCategoryProps) {
  const [hoveredPartId, setHoveredPartId] = useState<number | null>(null);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);

  const isSelected = selectedParts.length > 0;
  const totalPrice = selectedParts.reduce(
    (sum, part) => sum + part.price * part.quantity,
    0,
  );
  const totalQuantity = selectedParts.reduce(
    (sum, part) => sum + part.quantity,
    0,
  );

  return (
    <Card
      className={`hover:shadow-md hover:border-primary transition-all duration-200 ${isSelected ? "border-primary bg-primary/5" : ""}`}
      onMouseEnter={() => setIsCategoryHovered(true)}
      onMouseLeave={() => setIsCategoryHovered(false)}
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
                  <p className="text-sm font-medium text-white">
                    {selectedParts.length} item
                    {selectedParts.length > 1 ? "s" : ""} ({totalQuantity}{" "}
                    total) • ${totalPrice.toFixed(2)}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isSelected && (
                <button
                  className={`p-1.5 hover:bg-destructive/10 rounded transition-all duration-200 ${isCategoryHovered ? "opacity-100" : "opacity-0"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemoveAll();
                  }}
                  title={`Remove all ${category.name.toLowerCase()}`}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              )}
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </Link>

        {isSelected && (
          <div className="mt-4 border-t pt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedParts.map((part) => (
                <div
                  key={part.id}
                  className="p-3 bg-muted/30 rounded-md space-y-2"
                  onMouseEnter={() => setHoveredPartId(part.id)}
                  onMouseLeave={() => setHoveredPartId(null)}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <PartDetailsDialog
                        name={part.name}
                        manufacturer={part.manufacturer || "Unknown"}
                        type={part.type}
                        thumbnail={part.thumbnail}
                        specifications={part.specifications}
                      >
                        <button className="text-sm font-medium truncate flex-1 min-w-0 pr-2 text-left hover:text-primary transition-colors">
                          {part.name}
                        </button>
                      </PartDetailsDialog>

                      <div className="relative flex items-center">
                        {/* Price label - shown by default, positioned absolutely */}
                        <span
                          className={`text-xs font-medium text-primary whitespace-nowrap transition-opacity ${hoveredPartId === part.id ? "opacity-0" : "opacity-100"}`}
                        >
                          ${part.price.toFixed(2)} × {part.quantity}
                        </span>

                        {/* Controls - shown on hover, positioned absolutely in same spot */}
                        <div
                          className={`absolute top-0 right-0 flex items-center space-x-1 transition-opacity ${hoveredPartId === part.id ? "opacity-100" : "opacity-0"} ${hoveredPartId === part.id ? "" : "pointer-events-none"}`}
                        >
                          <QuantitySelector
                            value={part.quantity}
                            onChange={(quantity) =>
                              onUpdateQuantity(part.id, quantity)
                            }
                            onIncrease={() =>
                              onUpdateQuantity(part.id, part.quantity + 1)
                            }
                            onDecrease={() =>
                              onUpdateQuantity(part.id, part.quantity - 1)
                            }
                            size="sm"
                            variant="inline"
                          />
                          <button
                            className="p-1 hover:bg-destructive/10 rounded transition-all ml-1"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onRemovePart(part.id);
                            }}
                            title={`Remove ${part.name}`}
                          >
                            <X className="h-3 w-3 text-destructive" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {part.manufacturer && (
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(part.name + " " + part.manufacturer)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {part.manufacturer}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}

                  {part.specifications && (
                    <HorizontalScroll
                      className="w-full"
                      showScrollButtons="hover"
                      scrollButtonVariant="minimal"
                      gap="gap-1"
                    >
                      {Object.entries(part.specifications).map(
                        ([key, value]) => (
                          <span
                            key={key}
                            className="text-xs bg-muted px-1 py-0.5 rounded whitespace-nowrap flex-shrink-0"
                          >
                            {key}: {value}
                          </span>
                        ),
                      )}
                    </HorizontalScroll>
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
