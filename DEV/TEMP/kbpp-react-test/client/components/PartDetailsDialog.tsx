import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface PartDetailsDialogProps {
  children: React.ReactNode;
  name: string;
  manufacturer: string;
  type?: string;
  thumbnail?: string;
  specifications?: Record<string, string>;
}

export function PartDetailsDialog({
  children,
  name,
  manufacturer,
  type,
  thumbnail,
  specifications,
}: PartDetailsDialogProps) {
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

  const specsEntries = specifications ? Object.entries(specifications) : [];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {name}
            {type && (
              <Badge variant="outline" className="text-xs">
                {type}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            <span>by {manufacturer}</span>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(name + " " + manufacturer)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {thumbnail && (
            <div className="w-full h-32 mb-4 rounded-md overflow-hidden bg-muted">
              <img
                src={thumbnail}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {specsEntries.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Specifications</h4>
              <div className="grid gap-2">
                {specsEntries.map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between text-sm py-1 border-b border-muted"
                  >
                    <span className="text-muted-foreground font-medium">
                      {formatLabel(key)}:
                    </span>
                    <span className="font-medium text-right ml-2">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
