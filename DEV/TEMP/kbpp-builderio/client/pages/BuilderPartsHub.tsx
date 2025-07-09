import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BuildSummary } from "@/components/BuildSummary";
import { PageHeader } from "@/components/PageHeader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Monitor,
  Layers,
  Cpu,
  ToggleLeft,
  Anchor,
  Settings,
  Droplets,
  MousePointer,
  Cable,
  Check,
  Search,
  Filter,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBuild } from "@/contexts/BuildContext";

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

interface SelectedPart {
  id: number;
  name: string;
  price: number;
  type: string;
}

interface Filters {
  search: string;
  manufacturer: string;
  priceRange: string;
  sortBy: string;
}

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

const partData: Record<
  string,
  { title: string; description: string; parts: Part[] }
> = {
  switches: {
    title: "Switches",
    description:
      "Choose from our selection of premium mechanical switches to build your perfect keyboard.",
    parts: [
      {
        id: 1,
        name: "Cherry MX Red",
        type: "Linear",
        price: 0.75,
        stock: 250,
        manufacturer: "Cherry",
        specifications: { force: "45g", travel: "4.0mm" },
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
        specifications: { force: "60g", travel: "4.0mm" },
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
        specifications: { force: "67g", travel: "4.0mm" },
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
        specifications: { force: "62g", travel: "4.0mm" },
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
        specifications: { force: "67g", travel: "4.0mm" },
        thumbnail:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=150&fit=crop",
      },
    ],
  },
  case: {
    title: "Cases",
    description:
      "Premium keyboard cases in various materials and mounting styles.",
    parts: [
      {
        id: 1,
        name: "Tofu65 Aluminum Case",
        price: 129.99,
        stock: 45,
        manufacturer: "KBDfans",
        specifications: {
          material: "6061 Aluminum",
          mount: "Tray Mount",
          layout: "65%",
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
          mount: "Top Mount",
          layout: "65%",
        },
        thumbnail:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=150&fit=crop",
      },
    ],
  },
  plate: {
    title: "Plates",
    description:
      "Mounting plates that determine switch feel and sound characteristics.",
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
      "Printed circuit boards that form the electrical foundation of your keyboard.",
    parts: [
      {
        id: 1,
        name: "DZ65RGB v3 PCB",
        price: 65.0,
        stock: 75,
        manufacturer: "KBDfans",
        specifications: { layout: "65%", hotswap: "Yes", usb: "USB-C" },
        thumbnail:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=150&fit=crop",
      },
      {
        id: 2,
        name: "BM60 RGB PCB",
        price: 35.0,
        stock: 90,
        manufacturer: "KPRepublic",
        specifications: { layout: "60%", hotswap: "Yes", usb: "USB-C" },
        thumbnail:
          "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=200&h=150&fit=crop",
      },
    ],
  },
  stabilizers: {
    title: "Stabilizers",
    description: "Stabilizers for smooth large key operation.",
    parts: [
      {
        id: 1,
        name: "Durock V2 Stabilizers",
        price: 25.0,
        stock: 150,
        manufacturer: "Durock",
        specifications: { type: "Screw-in", material: "PC Housing" },
        thumbnail:
          "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=200&h=150&fit=crop",
      },
    ],
  },
  "mounting-method": {
    title: "Mounting Methods",
    description: "Different mounting styles affect typing feel and sound.",
    parts: [
      {
        id: 1,
        name: "Gasket Mount Kit",
        price: 15.0,
        stock: 80,
        manufacturer: "Generic",
        specifications: { type: "Gasket", material: "Silicone" },
        thumbnail:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=150&fit=crop",
      },
    ],
  },
  inserts: {
    title: "Inserts",
    description: "Sound dampening and feel modification materials.",
    parts: [
      {
        id: 1,
        name: "PE Foam Insert",
        price: 8.0,
        stock: 200,
        manufacturer: "KBDfans",
        specifications: { material: "PE Foam", thickness: "3mm" },
        thumbnail:
          "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=200&h=150&fit=crop",
      },
    ],
  },
  lubricants: {
    title: "Lubricants",
    description: "Lubricants for smooth switch and stabilizer operation.",
    parts: [
      {
        id: 1,
        name: "Krytox 205g0",
        price: 12.0,
        stock: 90,
        manufacturer: "Krytox",
        specifications: { type: "Linear switches", volume: "5ml" },
        thumbnail:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop",
      },
    ],
  },
  deskmat: {
    title: "Deskmats",
    description: "Desk protection and workspace aesthetics.",
    parts: [
      {
        id: 1,
        name: "Minimalist Gray Deskmat",
        price: 25.0,
        stock: 120,
        manufacturer: "NovelKeys",
        specifications: { size: "900x400mm", material: "Cloth" },
        thumbnail:
          "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=200&h=150&fit=crop",
      },
    ],
  },
  cables: {
    title: "Cables",
    description: "USB and connection cables for your keyboard.",
    parts: [
      {
        id: 1,
        name: "Coiled USB-C Cable",
        price: 45.0,
        stock: 60,
        manufacturer: "CableMod",
        specifications: { connector: "USB-C", length: "1.5m" },
        thumbnail:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=150&fit=crop",
      },
    ],
  },
};

export default function BuilderPartsHub() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { selectedParts, addPart, removePart, updatePartQuantity } = useBuild();
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    manufacturer: "none",
    priceRange: "none",
    sortBy: "name",
  });
  const [partQuantities, setPartQuantities] = useState<Record<number, number>>(
    {},
  );

  const currentType = type || "switches";
  const currentPartData = partData[currentType];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [currentType]);

  // Compute filtered parts directly instead of using separate state
  const filteredParts = React.useMemo(() => {
    if (!currentPartData) return [];

    let filtered = [...currentPartData.parts];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (part) =>
          part.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          part.manufacturer
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          (part.type &&
            part.type.toLowerCase().includes(filters.search.toLowerCase())),
      );
    }

    // Manufacturer filter
    if (filters.manufacturer && filters.manufacturer !== "none") {
      filtered = filtered.filter(
        (part) => part.manufacturer === filters.manufacturer,
      );
    }

    // Price range filter
    if (filters.priceRange && filters.priceRange !== "none") {
      filtered = filtered.filter((part) => {
        switch (filters.priceRange) {
          case "under-1":
            return part.price < 1;
          case "1-50":
            return part.price >= 1 && part.price <= 50;
          case "50-100":
            return part.price >= 50 && part.price <= 100;
          case "over-100":
            return part.price > 100;
          default:
            return true;
        }
      });
    }

    // Sort parts
    return filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "stock":
          return b.stock - a.stock;
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [currentPartData, filters]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      manufacturer: "none",
      priceRange: "none",
      sortBy: "name",
    });
  };

  const activeFilterCount = Object.values(filters).filter(
    (value, index) =>
      value && (index === 0 || value !== (index === 3 ? "name" : "none")),
  ).length;

  // Get unique manufacturers for filter dropdown
  const manufacturers = currentPartData
    ? [...new Set(currentPartData.parts.map((part) => part.manufacturer))]
    : [];

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

  const totalPrice = Object.values(selectedParts).reduce(
    (sum, parts) =>
      sum +
      parts.reduce((partSum, part) => partSum + part.price * part.quantity, 0),
    0,
  );
  const selectedCount = Object.values(selectedParts).reduce(
    (sum, parts) => sum + parts.length,
    0,
  );

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
            {/* Build Summary with integrated buttons */}
            <BuildSummary
              showBackButton={true}
              showExportButtons={true}
              selectedParts={selectedParts}
              onRemovePart={handleRemovePart}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">
                {currentPartData.title}
              </h2>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search parts..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>

                <Select
                  value={filters.manufacturer}
                  onValueChange={(value) =>
                    handleFilterChange("manufacturer", value)
                  }
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Manufacturer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {manufacturers.map((manufacturer) => (
                      <SelectItem key={manufacturer} value={manufacturer}>
                        {manufacturer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.priceRange}
                  onValueChange={(value) =>
                    handleFilterChange("priceRange", value)
                  }
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="under-1">Under $1</SelectItem>
                    <SelectItem value="1-50">$1 - $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="over-100">Over $100</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => handleFilterChange("sortBy", value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="stock">Stock</SelectItem>
                  </SelectContent>
                </Select>

                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="flex items-center space-x-1"
                  >
                    <X className="h-4 w-4" />
                    <span>Clear Filters</span>
                    <Badge variant="secondary" className="ml-1">
                      {activeFilterCount}
                    </Badge>
                  </Button>
                )}
              </div>
            </div>

            {/* Results */}
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Loading {currentPartData.title.toLowerCase()}...
                </p>
              </div>
            ) : filteredParts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No parts found matching your criteria.
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            ) : (
              // Card layout for other parts
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredParts.length} of{" "}
                    {currentPartData.parts.length} parts
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredParts.map((part) => (
                    <Card
                      key={part.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        {part.thumbnail && (
                          <div className="w-full h-32 mb-3 rounded-md overflow-hidden bg-muted">
                            <img
                              src={part.thumbnail}
                              alt={part.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              {part.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {part.manufacturer}
                            </p>
                          </div>
                          <Badge
                            variant={getStockBadgeVariant(part.stock)}
                            className="ml-2"
                          >
                            {getStockText(part.stock)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {part.specifications && (
                            <div className="space-y-2">
                              {Object.entries(part.specifications).map(
                                ([key, value]) => (
                                  <div
                                    key={key}
                                    className="flex justify-between text-sm"
                                  >
                                    <span className="text-muted-foreground capitalize">
                                      {key}:
                                    </span>
                                    <span className="font-medium">{value}</span>
                                  </div>
                                ),
                              )}
                            </div>
                          )}
                          <div className="space-y-3 pt-3 border-t">
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-semibold">
                                ${part.price.toFixed(2)}
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-muted-foreground">
                                  Qty:
                                </span>
                                <div className="flex items-center space-x-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => {
                                      const currentQty =
                                        partQuantities[part.id] || 1;
                                      if (currentQty > 1) {
                                        setPartQuantities((prev) => ({
                                          ...prev,
                                          [part.id]: currentQty - 1,
                                        }));
                                      }
                                    }}
                                  >
                                    -
                                  </Button>
                                  <Input
                                    type="number"
                                    min="1"
                                    value={partQuantities[part.id] || 1}
                                    onChange={(e) => {
                                      const newQuantity =
                                        parseInt(e.target.value) || 1;
                                      setPartQuantities((prev) => ({
                                        ...prev,
                                        [part.id]: newQuantity,
                                      }));
                                    }}
                                    className="h-8 w-16 text-sm text-center p-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => {
                                      const currentQty =
                                        partQuantities[part.id] || 1;
                                      setPartQuantities((prev) => ({
                                        ...prev,
                                        [part.id]: currentQty + 1,
                                      }));
                                    }}
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => {
                                const quantity = partQuantities[part.id] || 1;
                                handleAddPart(part, currentType, quantity);
                                // Reset quantity after adding
                                setPartQuantities((prev) => ({
                                  ...prev,
                                  [part.id]: 1,
                                }));
                              }}
                              style={{
                                background: "var(--linearPrimarySecondary)",
                              }}
                              className="text-white w-full"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add to Build
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
