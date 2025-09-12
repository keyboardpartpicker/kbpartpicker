import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { PartDetailsDialog } from "@/components/PartDetailsDialog";
import { Plus, ExternalLink, Info } from "lucide-react";

interface PartsCardProps {
  id: number;
  name: string;
  price: number;
  stock: number;
  manufacturer: string;
  thumbnail?: string;
  specifications?: Record<string, string>;
  type?: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddPart: () => void;
  showCustomBadge?: boolean;
  className?: string;
}

export function PartsCard({
  id,
  name,
  price,
  stock,
  manufacturer,
  thumbnail,
  specifications,
  type,
  quantity,
  onQuantityChange,
  onAddPart,
  showCustomBadge = false,
  className = "",
}: PartsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const getStockBadgeVariant = (stock: number) => {
    if (stock > 100) return "default";
    if (stock > 50) return "secondary";
    return "destructive";
  };

  const getStockText = (stock: number) => {
    if (stock > 100) return "In Stock";
    if (stock > 50) return "Low Stock";
    return "Limited";
  };

  // Human-readable label mapping
  const formatLabel = (key: string): string => {
    const labelMap: Record<string, string> = {
      layout: "Layout",
      count: "Count",
      upper_housing: "Upper Housing",
      bottom_housing: "Bottom Housing",
      stem_material: "Stem Material",
      pin_type: "Pin Type",
      spring_type: "Spring Type",
      actuation_force: "Actuation Force",
      bottom_out_force: "Bottom Out Force",
      pre_travel: "Pre Travel",
      total_travel: "Total Travel",
      lubed: "Lubricated",
      housing_material: "Housing Material",
      wire_material: "Wire Material",
      compatible_pcb: "Compatible PCB",
      profile: "Profile",
      material: "Material",
      thickness: "Thickness",
      shine_through: "Shine Through",
      stem_type: "Stem Type",
      bumpon_type: "Bumpon Type",
      mount_type: "Mount Type",
      hot_swap: "Hot Swap",
      mounting_style: "Mounting Style",
      switch_compatibility: "Switch Compatibility",
      stabilizer_support: "Stabilizer Support",
      location: "Location",
      dampening_level: "Dampening Level",
      affects_sound: "Affects Sound",
      viscosity: "Viscosity",
      application: "Application",
      effect: "Effect",
      size: "Size",
      type: "Type",
      connector: "Connector",
      color: "Color",
    };

    return (
      labelMap[key] ||
      key
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  };

  // Show limited specs in card, with option to view all in dialog
  const maxSpecsInCard = 3;
  const specsEntries = specifications ? Object.entries(specifications) : [];
  const displayedSpecs = specsEntries.slice(0, maxSpecsInCard);
  const hasMoreSpecs = specsEntries.length > maxSpecsInCard;

  return (
    <Card
      className={`hover:shadow-lg transition-all duration-200 ${className} h-[400px] flex flex-col group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2 flex-shrink-0">
        {thumbnail && (
          <div className="w-full h-20 mb-2 rounded-md overflow-hidden bg-muted relative">
            <img
              src={thumbnail}
              alt={name}
              className="w-full h-full object-cover"
            />
            {/* Glassy Info Button */}
            {hasMoreSpecs && (
              <PartDetailsDialog
                name={name}
                manufacturer={manufacturer}
                type={type}
                thumbnail={thumbnail}
                specifications={specifications}
              >
                <button
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute top-2 right-2 h-7 w-7 rounded-lg backdrop-blur-md bg-white/20 border border-white/30 text-white shadow-lg hover:bg-white/30 transition-all duration-200 flex items-center justify-center ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
                  title="View detailed specifications"
                >
                  <Info className="h-3.5 w-3.5" />
                </button>
              </PartDetailsDialog>
            )}
          </div>
        )}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm line-clamp-1" title={name}>
                {name}
              </CardTitle>
              {showCustomBadge && id > 1000000 && (
                <Badge variant="secondary" className="text-xs">
                  Custom
                </Badge>
              )}
              {type && (
                <Badge variant="outline" className="text-xs">
                  {type}
                </Badge>
              )}
            </div>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(name + " " + manufacturer)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              {manufacturer}
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>
          <Badge variant={getStockBadgeVariant(stock)} className="ml-2">
            {getStockText(stock)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 space-y-3">
          {specifications && Object.keys(specifications).length > 0 && (
            <div className="space-y-2">
              {displayedSpecs.map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between text-sm items-start"
                >
                  <span className="text-muted-foreground font-medium text-left flex-shrink-0">
                    {formatLabel(key)}:
                  </span>
                  <span className="font-medium text-right ml-2 truncate">
                    {value}
                  </span>
                </div>
              ))}
              {hasMoreSpecs && (
                <div className="text-center pt-1">
                  {!thumbnail ? (
                    <PartDetailsDialog
                      name={name}
                      manufacturer={manufacturer}
                      type={type}
                      thumbnail={thumbnail}
                      specifications={specifications}
                    >
                      <button className="text-xs text-primary hover:text-primary/80 underline transition-colors">
                        View all specifications ({specsEntries.length} total)
                      </button>
                    </PartDetailsDialog>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      +{specsEntries.length - maxSpecsInCard} more (hover image
                      for details)
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
          <div className="space-y-3 pt-3 border-t mt-auto flex-shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">
                ${price.toFixed(2)} × {quantity} = $
                {(price * quantity).toFixed(2)}
              </span>
              <div className="flex items-center space-x-2 min-w-0 flex-shrink-0">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  Qty:
                </span>
                <QuantitySelector
                  value={quantity}
                  onChange={onQuantityChange}
                  size="sm"
                  variant="buttons"
                />
              </div>
            </div>
            <Button
              size="sm"
              onClick={onAddPart}
              style={{ background: "var(--linearPrimarySecondary)" }}
              className="text-white w-full"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add to Build
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
