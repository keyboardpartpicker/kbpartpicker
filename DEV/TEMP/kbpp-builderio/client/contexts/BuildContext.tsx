import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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

interface BuildContextType {
  selectedParts: Record<string, SelectedPartItem[]>;
  addPart: (
    part: {
      id: number;
      name: string;
      price: number;
      manufacturer?: string;
      thumbnail?: string;
      specifications?: Record<string, string>;
      type?: string;
    },
    partType: string,
    quantity?: number,
  ) => void;
  removePart: (partType: string, partId?: number) => void;
  updatePartQuantity: (
    partType: string,
    partId: number,
    quantity: number,
  ) => void;
  clearBuild: () => void;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export function useBuild() {
  const context = useContext(BuildContext);
  if (context === undefined) {
    throw new Error("useBuild must be used within a BuildProvider");
  }
  return context;
}

interface BuildProviderProps {
  children: ReactNode;
}

export function BuildProvider({ children }: BuildProviderProps) {
  const [selectedParts, setSelectedParts] = useState<
    Record<string, SelectedPartItem[]>
  >({});

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("keyboard-build");
    if (saved) {
      try {
        const parsedBuild = JSON.parse(saved);
        setSelectedParts(parsedBuild);
      } catch (error) {
        console.error("Failed to parse saved build:", error);
      }
    }
  }, []);

  // Save to localStorage whenever selectedParts changes
  useEffect(() => {
    localStorage.setItem("keyboard-build", JSON.stringify(selectedParts));
  }, [selectedParts]);

  const addPart = (
    part: {
      id: number;
      name: string;
      price: number;
      manufacturer?: string;
      thumbnail?: string;
      specifications?: Record<string, string>;
      type?: string;
    },
    partType: string,
    quantity: number = 1,
  ) => {
    setSelectedParts((prev) => {
      const existingParts = prev[partType] || [];
      const existingPartIndex = existingParts.findIndex(
        (p) => p.id === part.id,
      );

      if (existingPartIndex >= 0) {
        // Update quantity of existing part
        const updatedParts = [...existingParts];
        updatedParts[existingPartIndex] = {
          ...updatedParts[existingPartIndex],
          quantity: updatedParts[existingPartIndex].quantity + quantity,
        };
        return {
          ...prev,
          [partType]: updatedParts,
        };
      } else {
        // Add new part
        return {
          ...prev,
          [partType]: [
            ...existingParts,
            {
              id: part.id,
              name: part.name,
              price: part.price,
              quantity,
              manufacturer: part.manufacturer,
              thumbnail: part.thumbnail,
              specifications: part.specifications,
              type: part.type,
            },
          ],
        };
      }
    });
  };

  const removePart = (partType: string, partId?: number) => {
    setSelectedParts((prev) => {
      if (partId === undefined) {
        // Remove entire category
        const updated = { ...prev };
        delete updated[partType];
        return updated;
      } else {
        // Remove specific part
        const existingParts = prev[partType] || [];
        const filteredParts = existingParts.filter((p) => p.id !== partId);

        if (filteredParts.length === 0) {
          const updated = { ...prev };
          delete updated[partType];
          return updated;
        } else {
          return {
            ...prev,
            [partType]: filteredParts,
          };
        }
      }
    });
  };

  const updatePartQuantity = (
    partType: string,
    partId: number,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      removePart(partType, partId);
      return;
    }

    setSelectedParts((prev) => {
      const existingParts = prev[partType] || [];
      const updatedParts = existingParts.map((part) =>
        part.id === partId ? { ...part, quantity } : part,
      );

      return {
        ...prev,
        [partType]: updatedParts,
      };
    });
  };

  const clearBuild = () => {
    setSelectedParts({});
  };

  const value = {
    selectedParts,
    addPart,
    removePart,
    updatePartQuantity,
    clearBuild,
  };

  return (
    <BuildContext.Provider value={value}>{children}</BuildContext.Provider>
  );
}
