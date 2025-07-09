import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
import { ArrowLeft, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Part {
  id: number;
  name: string;
  type?: string;
  price: number;
  stock: number;
  manufacturer: string;
  specifications?: Record<string, string>;
}

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
      },
      {
        id: 2,
        name: "Gateron Black Ink V2",
        type: "Linear",
        price: 0.95,
        stock: 120,
        manufacturer: "Gateron",
        specifications: { force: "60g", travel: "4.0mm" },
      },
      {
        id: 3,
        name: "Holy Panda",
        type: "Tactile",
        price: 1.25,
        stock: 45,
        manufacturer: "Drop",
        specifications: { force: "67g", travel: "4.0mm" },
      },
      {
        id: 4,
        name: "Alpaca V2",
        type: "Linear",
        price: 0.85,
        stock: 80,
        manufacturer: "Durock",
        specifications: { force: "62g", travel: "4.0mm" },
      },
      {
        id: 5,
        name: "Zealios V2 67g",
        type: "Tactile",
        price: 1.1,
        stock: 150,
        manufacturer: "ZealPC",
        specifications: { force: "67g", travel: "4.0mm" },
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
      },
      {
        id: 2,
        name: "BM60 RGB PCB",
        price: 35.0,
        stock: 90,
        manufacturer: "KPRepublic",
        specifications: { layout: "60%", hotswap: "Yes", usb: "USB-C" },
      },
    ],
  },
};

export default function BuilderParts() {
  const { type } = useParams<{ type: string }>();
  const [loading, setLoading] = useState(true);

  const currentPartData = type ? partData[type] : null;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [type]);

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
            <Link to="/builder">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Builder
              </Button>
            </Link>
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
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/builder">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Builder
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold">{currentPartData.title}</h1>
            <p className="text-muted-foreground mt-1">
              {currentPartData.description}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Loading {currentPartData.title.toLowerCase()}...
            </p>
          </div>
        ) : type === "switches" ? (
          // Special table layout for switches
          <Table>
            <TableCaption>
              A list of available {currentPartData.title.toLowerCase()} for your
              build.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Force</TableHead>
                <TableHead>Travel</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPartData.parts.map((part) => (
                <TableRow key={part.id}>
                  <TableCell className="font-medium">{part.name}</TableCell>
                  <TableCell>{part.type}</TableCell>
                  <TableCell>{part.specifications?.force}</TableCell>
                  <TableCell>{part.specifications?.travel}</TableCell>
                  <TableCell>${part.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStockBadgeVariant(part.stock)}>
                      {getStockText(part.stock)} ({part.stock})
                    </Badge>
                  </TableCell>
                  <TableCell>{part.manufacturer}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      style={{ background: "var(--linearPrimarySecondary)" }}
                      className="text-white"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          // Card layout for other parts
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPartData.parts.map((part) => (
              <Card key={part.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{part.name}</CardTitle>
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
                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-lg font-semibold">
                        ${part.price.toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        style={{ background: "var(--linearPrimarySecondary)" }}
                        className="text-white"
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
        )}
      </main>
      <Footer />
    </div>
  );
}
