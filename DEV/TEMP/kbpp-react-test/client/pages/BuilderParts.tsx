import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BuildSummary } from "@/components/BuildSummary";
import { PageHeader } from "@/components/PageHeader";
import { ReturnToTop } from "@/components/ui/return-to-top";
import { PartsCard } from "@/components/PartsCard";
import { SearchableGrid } from "@/components/SearchableGrid";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useBuild } from "@/contexts/BuildContext";
import { useStickyScroll } from "@/hooks/use-sticky-scroll";

interface Part {
  id: number;
  name: string;
  type?: string;
  price: number;
  stock: number;
  manufacturer: string;
  specifications?: Record<string, string>;
  thumbnail?: string;
}

const partData: Record<
  string,
  { title: string; description: string; parts: Part[] }
> = {
  switches: {
    title: "Switches",
    description:
      "Mechanical switches are the heart of your keyboard, determining the feel, sound, and responsiveness of every keystroke. Choose from linear, tactile, or clicky switches based on your typing preferences.",
    parts: [
      {
        id: 1,
        name: "Cherry MX Red",
        type: "Linear",
        price: 0.75,
        stock: 250,
        manufacturer: "Cherry",
        specifications: {
          count: "1 switch",
          upper_housing: "Nylon",
          bottom_housing: "Nylon",
          stem_material: "POM",
          pin_type: "3-pin",
          spring_type: "Standard",
          actuation_force: "45g",
          bottom_out_force: "60g",
          pre_travel: "2.0mm",
          total_travel: "4.0mm",
          lubed: "No",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=200&h=150&fit=crop",
      },
      {
        id: 2,
        name: "Gateron Black Ink V2",
        type: "Linear",
        price: 0.95,
        stock: 120,
        manufacturer: "Gateron",
        specifications: {
          count: "1 switch",
          upper_housing: "Proprietary Blend",
          bottom_housing: "Proprietary Blend",
          stem_material: "POM",
          pin_type: "5-pin",
          spring_type: "Progressive",
          actuation_force: "60g",
          bottom_out_force: "70g",
          pre_travel: "2.0mm",
          total_travel: "4.0mm",
          lubed: "Factory",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=150&fit=crop",
      },
      {
        id: 3,
        name: "Holy Panda",
        type: "Tactile",
        price: 1.25,
        stock: 45,
        manufacturer: "Drop",
        specifications: {
          count: "1 switch",
          upper_housing: "Polycarbonate",
          bottom_housing: "Nylon",
          stem_material: "POM",
          pin_type: "5-pin",
          spring_type: "Standard",
          actuation_force: "67g",
          bottom_out_force: "67g",
          pre_travel: "2.0mm",
          total_travel: "4.0mm",
          lubed: "No",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=200&h=150&fit=crop",
      },
      {
        id: 4,
        name: "Alpaca V2",
        type: "Linear",
        price: 0.85,
        stock: 80,
        manufacturer: "Durock",
        specifications: {
          count: "1 switch",
          upper_housing: "Polycarbonate",
          bottom_housing: "Nylon",
          stem_material: "POM",
          pin_type: "5-pin",
          spring_type: "Standard",
          actuation_force: "62g",
          bottom_out_force: "62g",
          pre_travel: "2.0mm",
          total_travel: "4.0mm",
          lubed: "No",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop",
      },
      {
        id: 5,
        name: "Zealios V2 67g",
        type: "Tactile",
        price: 1.1,
        stock: 150,
        manufacturer: "ZealPC",
        specifications: {
          count: "1 switch",
          upper_housing: "Polycarbonate",
          bottom_housing: "Nylon",
          stem_material: "POM",
          pin_type: "5-pin",
          spring_type: "Progressive",
          actuation_force: "67g",
          bottom_out_force: "67g",
          pre_travel: "2.0mm",
          total_travel: "4.0mm",
          lubed: "Factory",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=150&fit=crop",
      },
    ],
  },
  keycaps: {
    title: "Keycaps",
    description:
      "Keycaps are the interface between you and your keyboard. Profile, material, and build quality significantly impact both feel and aesthetics.",
    parts: [
      {
        id: 1,
        name: "GMK Olivia++ Light",
        price: 145.0,
        stock: 25,
        manufacturer: "GMK",
        specifications: {
          layout: "ANSI",
          count: "104 keycaps",
          profile: "Cherry",
          material: "ABS",
          thickness: "1.5mm",
          shine_through: "No",
          stem_type: "MX",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=200&h=150&fit=crop",
      },
      {
        id: 2,
        name: "Drop MT3 Camillo",
        price: 85.0,
        stock: 60,
        manufacturer: "Drop",
        specifications: {
          layout: "ANSI",
          count: "87 keycaps",
          profile: "MT3",
          material: "PBT",
          thickness: "1.4mm",
          shine_through: "No",
          stem_type: "MX",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=150&fit=crop",
      },
      {
        id: 3,
        name: "HyperX Pudding Keycaps",
        price: 25.0,
        stock: 200,
        manufacturer: "HyperX",
        specifications: {
          layout: "ANSI",
          count: "104 keycaps",
          profile: "OEM",
          material: "PBT",
          thickness: "1.2mm",
          shine_through: "Yes",
          stem_type: "MX",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=200&h=150&fit=crop",
      },
    ],
  },
  case: {
    title: "Cases",
    description:
      "The case is the foundation of your keyboard, providing structural support and aesthetic appeal. Different materials and mounting styles affect both the typing feel and sound signature of your build.",
    parts: [
      {
        id: 1,
        name: "Tofu65 Aluminum Case",
        price: 129.99,
        stock: 45,
        manufacturer: "KBDfans",
        specifications: {
          material: "Aluminum",
          layout: "65%",
          bumpon_type: "Silicone",
          mount_type: "Tray",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=200&h=150&fit=crop",
      },
      {
        id: 2,
        name: "NK65 Entry Edition",
        price: 95.0,
        stock: 80,
        manufacturer: "NovelKeys",
        specifications: {
          material: "Polycarbonate",
          layout: "65%",
          bumpon_type: "Rubber",
          mount_type: "Top",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=150&fit=crop",
      },
      {
        id: 3,
        name: "Mode80 Gasket Mount",
        price: 450.0,
        stock: 25,
        manufacturer: "Mode Designs",
        specifications: {
          material: "Aluminum",
          layout: "TKL",
          bumpon_type: "Silicone",
          mount_type: "Gasket",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=200&h=150&fit=crop",
      },
    ],
  },
  plate: {
    title: "Plates",
    description:
      "The plate sits between your switches and PCB, directly influencing typing feel and acoustics. Materials like aluminum provide firmness, while brass adds weight and warmth to the sound.",
    parts: [
      {
        id: 1,
        name: "Brass 65% Plate",
        price: 35.0,
        stock: 120,
        manufacturer: "KBDfans",
        specifications: {
          material: "Brass",
          thickness: "1.5mm",
          layout: "65%",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=200&h=150&fit=crop",
      },
      {
        id: 2,
        name: "Carbon Fiber 60% Plate",
        price: 45.0,
        stock: 60,
        manufacturer: "Keypresso",
        specifications: {
          material: "Carbon Fiber",
          thickness: "1.2mm",
          layout: "60%",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop",
      },
    ],
  },
  pcb: {
    title: "PCBs",
    description:
      "The PCB (Printed Circuit Board) is the electronic brain of your keyboard, handling key registration and features like RGB lighting. Hotswap PCBs allow easy switch changes without soldering.",
    parts: [
      {
        id: 1,
        name: "DZ65RGB v3 PCB",
        price: 65.0,
        stock: 75,
        manufacturer: "KBDfans",
        specifications: {
          layout: "65%",
          hot_swap: "Yes",
          mounting_style: "Gasket",
          switch_compatibility: "MX",
          stabilizer_support: "Screw-in",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=150&fit=crop",
      },
      {
        id: 2,
        name: "BM60 RGB PCB",
        price: 35.0,
        stock: 90,
        manufacturer: "KPRepublic",
        specifications: {
          layout: "60%",
          hot_swap: "Yes",
          mounting_style: "Tray",
          switch_compatibility: "MX",
          stabilizer_support: "Plate-mount",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=200&h=150&fit=crop",
      },
      {
        id: 3,
        name: "Bakeneko60 PCB",
        price: 55.0,
        stock: 40,
        manufacturer: "CannonKeys",
        specifications: {
          layout: "60%",
          hot_swap: "No",
          mounting_style: "Top",
          switch_compatibility: "MX",
          stabilizer_support: "Screw-in",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=150&fit=crop",
      },
    ],
  },
  stabilizers: {
    title: "Stabilizers",
    description:
      "Stabilizers ensure smooth, rattle-free operation of larger keys like spacebar, enter, and shift. Quality stabilizers are essential for a premium typing experience.",
    parts: [
      {
        id: 1,
        name: "Durock V2 Stabilizers",
        price: 25.0,
        stock: 150,
        manufacturer: "Durock",
        specifications: {
          type: "Screw-in",
          housing_material: "Polycarbonate",
          wire_material: "Stainless Steel",
          lubed: "No",
          compatible_pcb: "Screw-in PCB",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=200&h=150&fit=crop",
      },
      {
        id: 2,
        name: "Cherry Plate Mount Stabilizers",
        price: 15.0,
        stock: 200,
        manufacturer: "Cherry",
        specifications: {
          type: "Plate-mount",
          housing_material: "Nylon",
          wire_material: "Stainless Steel",
          lubed: "No",
          compatible_pcb: "Any PCB",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=200&h=150&fit=crop",
      },
    ],
  },
  inserts: {
    title: "Inserts",
    description:
      "Sound dampening and feel modification materials that enhance acoustic properties and typing feel.",
    parts: [
      {
        id: 1,
        name: "PE Foam Insert",
        price: 8.0,
        stock: 200,
        manufacturer: "KBDfans",
        specifications: {
          location: "Case",
          material: "EVA",
          thickness: "3mm",
          dampening_level: "3",
          affects_sound: "Yes",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=200&h=150&fit=crop",
      },
      {
        id: 2,
        name: "Poron Plate Foam",
        price: 12.0,
        stock: 150,
        manufacturer: "Stupidfish",
        specifications: {
          location: "Plate",
          material: "Poron",
          thickness: "2mm",
          dampening_level: "4",
          affects_sound: "Yes",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=200&h=150&fit=crop",
      },
    ],
  },
  lubricants: {
    title: "Lubricants",
    description:
      "Lubricants reduce friction and eliminate scratchiness in switches and stabilizers. Proper lubrication significantly improves smoothness and reduces unwanted noise.",
    parts: [
      {
        id: 1,
        name: "Krytox 205g0",
        price: 12.0,
        stock: 90,
        manufacturer: "Krytox",
        specifications: {
          viscosity: "NLGI 0",
          application: "Switch",
          effect: "Smoothness",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop",
      },
      {
        id: 2,
        name: "Tribosys 3204",
        price: 15.0,
        stock: 75,
        manufacturer: "Miller-Stephenson",
        specifications: {
          viscosity: "NLGI 0",
          application: "Switch",
          effect: "Sound Reduction",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop",
      },
      {
        id: 3,
        name: "Dielectric Grease",
        price: 8.0,
        stock: 120,
        manufacturer: "Super Lube",
        specifications: {
          viscosity: "NLGI 2",
          application: "Stabilizer",
          effect: "Sound Reduction",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop",
      },
    ],
  },
  deskmat: {
    title: "Deskmats",
    description:
      "Deskmats protect your workspace while providing a stable, comfortable surface for your keyboard and mouse. They also add personality and cohesion to your setup.",
    parts: [
      {
        id: 1,
        name: "Minimalist Gray Deskmat",
        price: 25.0,
        stock: 120,
        manufacturer: "NovelKeys",
        specifications: {
          material: "Cloth",
          thickness: "3mm",
          size: "900x400mm",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=200&h=150&fit=crop",
      },
      {
        id: 2,
        name: "Cork Wood Deskmat",
        price: 45.0,
        stock: 60,
        manufacturer: "Keycap Dungeon",
        specifications: {
          material: "Cork",
          thickness: "4mm",
          size: "800x350mm",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=200&h=150&fit=crop",
      },
    ],
  },
  cables: {
    title: "Cables",
    description:
      "Custom cables complete your build's aesthetic while providing reliable connectivity. Coiled cables add vintage charm and reduce desk clutter.",
    parts: [
      {
        id: 1,
        name: "Coiled USB-C Cable",
        price: 45.0,
        stock: 60,
        manufacturer: "CableMod",
        specifications: {
          type: "Coiled",
          connector: "USB-C",
          material: "Paracord",
          color: "Navy Blue",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=150&fit=crop",
      },
      {
        id: 2,
        name: "Aviator Straight Cable",
        price: 65.0,
        stock: 35,
        manufacturer: "Space Cables",
        specifications: {
          type: "Straight",
          connector: "USB-C",
          material: "Aviator",
          color: "Carbon Black",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=150&fit=crop",
      },
    ],
  },
};

export default function BuilderParts() {
  const { type } = useParams<{ type: string }>();
  const { selectedParts, addPart, removePart, updatePartQuantity } = useBuild();

  // Ref for BuildSummary container
  const buildSummaryRef = useRef<HTMLDivElement>(null);

  // Sticky scroll behavior for BuildSummary
  const stickyState = useStickyScroll(buildSummaryRef, {
    trackEndSelector: "[data-parts-bottom]",
    bottomPadding: 24,
  });

  const [loading, setLoading] = useState(true);
  const [partQuantities, setPartQuantities] = useState<Record<number, number>>(
    {},
  );
  const [customParts, setCustomParts] = useState<Record<string, Part[]>>({});
  const [isCustomPartModalOpen, setIsCustomPartModalOpen] = useState(false);
  const [customPartForm, setCustomPartForm] = useState({
    name: "",
    manufacturer: "",
    price: "",
    specifications: "",
  });

  const currentType = type || "switches";
  const currentPartData = partData[currentType];

  useEffect(() => {
    // TODO: API Integration - Parts Database
    // When parts database is implemented, replace the setTimeout with actual API call:
    // - Fetch parts for current category: GET /api/parts?category=${currentType}
    // - Include pagination, filtering, and sorting in API call
    // - Handle loading states, error states, and retry logic
    // - Cache results for better performance

    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [currentType]);

  // Get unique manufacturers for filter dropdown
  const manufacturers = currentPartData
    ? [...new Set(currentPartData.parts.map((part) => part.manufacturer))]
    : [];

  // Combine original parts with custom parts
  const allParts = currentPartData
    ? [...currentPartData.parts, ...(customParts[currentType] || [])]
    : [];

  const handleAddPart = (
    part: Part,
    partType: string,
    quantity: number = 1,
  ) => {
    addPart(
      {
        id: part.id,
        name: part.name,
        price: part.price,
        manufacturer: part.manufacturer,
        thumbnail: part.thumbnail,
        specifications: part.specifications,
        type: part.type,
      },
      partType,
      quantity,
    );
  };

  const handleRemovePart = (partType: string, partId?: number) => {
    removePart(partType, partId);
  };

  const handleUpdateQuantity = (
    partType: string,
    partId: number,
    quantity: number,
  ) => {
    updatePartQuantity(partType, partId, quantity);
  };

  const handleAddCustomPart = () => {
    if (
      !customPartForm.name ||
      !customPartForm.manufacturer ||
      !customPartForm.price
    ) {
      return;
    }

    let specifications = undefined;
    if (customPartForm.specifications.trim()) {
      try {
        // Try to parse as JSON first
        specifications = JSON.parse(customPartForm.specifications);
      } catch (error) {
        // If JSON parsing fails, treat as simple key-value pairs
        // Parse simple format like "force: 45g, travel: 4.0mm" or "Layout: 87%"
        const specObj: Record<string, string> = {};
        const pairs = customPartForm.specifications
          .split(",")
          .map((s) => s.trim());

        for (const pair of pairs) {
          const colonIndex = pair.indexOf(":");
          if (colonIndex > 0) {
            const key = pair.substring(0, colonIndex).trim();
            const value = pair.substring(colonIndex + 1).trim();
            if (key && value) {
              specObj[key.toLowerCase()] = value;
            }
          } else if (pair.trim()) {
            // Single value without colon, use as "description"
            specObj.description = pair.trim();
          }
        }

        specifications = Object.keys(specObj).length > 0 ? specObj : undefined;
      }
    }

    const newPart = {
      id: Date.now(), // Simple ID generation
      name: customPartForm.name,
      manufacturer: customPartForm.manufacturer,
      price: parseFloat(customPartForm.price),
      specifications,
    };

    // TODO: API Integration - Custom Parts Creation
    // When database is implemented, add API call to save custom part:
    // - POST /api/parts/custom with part data
    // - Receive back part ID from database
    // - Then add to build with the actual part ID

    // Add directly to build instead of parts list
    handleAddPart(newPart as Part, currentType, 1);

    // Reset form
    setCustomPartForm({
      name: "",
      manufacturer: "",
      price: "",
      specifications: "",
    });
    setIsCustomPartModalOpen(false);
  };

  if (!currentPartData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container pt-8 pb-24">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Part Type Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The part type you're looking for doesn't exist.
            </p>
            <div className="max-w-md mx-auto">
              <BuildSummary showBackButton={true} showExportButtons={false} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container pt-8 pb-24">
        <PageHeader
          title="Parts Selection"
          description="Choose components for your keyboard build"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
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
                showBackButton={true}
                showExportButtons={true}
                selectedParts={selectedParts}
                onRemovePart={handleRemovePart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  {currentPartData.title}
                </h2>
                <p className="text-muted-foreground">
                  {currentPartData.description}
                </p>
              </div>
              <Dialog
                open={isCustomPartModalOpen}
                onOpenChange={setIsCustomPartModalOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Part
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      Add Custom {currentPartData.title.slice(0, -1)}
                    </DialogTitle>
                    <DialogDescription>
                      Create a custom part entry for your build. This will be
                      saved locally.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={customPartForm.name}
                        onChange={(e) =>
                          setCustomPartForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="col-span-3"
                        placeholder="Part name"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="manufacturer" className="text-right">
                        Brand
                      </Label>
                      <Input
                        id="manufacturer"
                        value={customPartForm.manufacturer}
                        onChange={(e) =>
                          setCustomPartForm((prev) => ({
                            ...prev,
                            manufacturer: e.target.value,
                          }))
                        }
                        className="col-span-3"
                        placeholder="Manufacturer"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={customPartForm.price}
                        onChange={(e) =>
                          setCustomPartForm((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        }
                        className="col-span-3"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label
                        htmlFor="specifications"
                        className="text-right mt-2"
                      >
                        Specs
                      </Label>
                      <div className="col-span-3">
                        <Textarea
                          id="specifications"
                          value={customPartForm.specifications}
                          onChange={(e) =>
                            setCustomPartForm((prev) => ({
                              ...prev,
                              specifications: e.target.value,
                            }))
                          }
                          placeholder="force: 45g, travel: 4.0mm"
                          className="min-h-[60px]"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Optional: Use "key: value" pairs separated by commas,
                          or JSON format
                        </p>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCustomPartModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" onClick={handleAddCustomPart}>
                      Add Part
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* SearchableGrid replaces the inline search/filter implementation */}
            <SearchableGrid
              items={allParts}
              searchPlaceholder="Search parts..."
              searchFields={["name", "manufacturer", "type"]}
              filterOptions={[
                {
                  key: "manufacturer",
                  label: "Manufacturer",
                  placeholder: "Manufacturer",
                  options: manufacturers.map((m) => ({ value: m, label: m })),
                  width: "w-[140px]",
                },
                {
                  key: "priceRange",
                  label: "Price Range",
                  placeholder: "Price Range",
                  options: [
                    { value: "under-1", label: "Under $1" },
                    { value: "1-50", label: "$1 - $50" },
                    { value: "50-100", label: "$50 - $100" },
                    { value: "over-100", label: "Over $100" },
                  ],
                  width: "w-[140px]",
                },
              ]}
              sortOptions={[
                { value: "name", label: "Name" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
                { value: "stock", label: "Stock" },
              ]}
              defaultSort="name"
            >
              {(filteredParts) => {
                if (loading) {
                  return (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Loading {currentPartData.title.toLowerCase()}...
                      </p>
                    </div>
                  );
                }

                if (filteredParts.length === 0) {
                  return (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg">
                        No parts found matching your criteria.
                      </p>
                      <p className="text-muted-foreground text-sm mt-2">
                        Try adjusting your filters or search terms.
                      </p>
                    </div>
                  );
                }

                return (
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    data-parts-bottom
                  >
                    {filteredParts.map((part) => (
                      <PartsCard
                        key={part.id}
                        id={part.id}
                        name={part.name}
                        price={part.price}
                        stock={part.stock}
                        manufacturer={part.manufacturer}
                        thumbnail={part.thumbnail}
                        specifications={part.specifications}
                        type={part.type}
                        quantity={partQuantities[part.id] || 1}
                        onQuantityChange={(quantity) =>
                          setPartQuantities((prev) => ({
                            ...prev,
                            [part.id]: quantity,
                          }))
                        }
                        onAddPart={() => {
                          const quantity = partQuantities[part.id] || 1;
                          handleAddPart(part, currentType, quantity);
                          setPartQuantities((prev) => ({
                            ...prev,
                            [part.id]: 1,
                          }));
                        }}
                        showCustomBadge={true}
                      />
                    ))}
                  </div>
                );
              }}
            </SearchableGrid>
          </div>
        </div>
      </main>
      <Footer />
      <ReturnToTop />
    </div>
  );
}
