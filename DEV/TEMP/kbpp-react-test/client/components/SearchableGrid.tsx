import React, { useState, useMemo, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface FilterOption {
  key: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  width?: string;
}

interface SearchableGridProps<T> {
  items: T[];
  children: (items: T[]) => ReactNode;
  searchPlaceholder?: string;
  searchFields: (keyof T)[];
  filterOptions?: FilterOption[];
  sortOptions?: { value: string; label: string }[];
  defaultSort?: string;
  className?: string;
  onSearch?: (query: string) => void;
  onFilter?: (filters: Record<string, string>) => void;
  onSort?: (sortBy: string) => void;
}

export function SearchableGrid<T extends Record<string, any>>({
  items,
  children,
  searchPlaceholder = "Search...",
  searchFields,
  filterOptions = [],
  sortOptions = [],
  defaultSort = "",
  className = "",
  onSearch,
  onFilter,
  onSort,
}: SearchableGridProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>(
    filterOptions.reduce((acc, option) => ({ ...acc, [option.key]: "none" }), {})
  );
  const [sortBy, setSortBy] = useState(defaultSort);

  // Filter and search items
  const filteredItems = useMemo(() => {
    let filtered = [...items];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        searchFields.some((field) => {
          const value = item[field];
          if (typeof value === "string") {
            return value.toLowerCase().includes(query);
          }
          if (typeof value === "number") {
            return value.toString().includes(query);
          }
          return false;
        })
      );
    }

    // Apply other filters
    filterOptions.forEach((option) => {
      const filterValue = filters[option.key];
      if (filterValue && filterValue !== "none") {
        filtered = filtered.filter((item) => {
          // Special handling for price range
          if (option.key === "priceRange") {
            const price = item.price || 0;
            switch (filterValue) {
              case "under-1":
                return price < 1;
              case "1-50":
                return price >= 1 && price <= 50;
              case "50-100":
                return price >= 50 && price <= 100;
              case "over-100":
                return price > 100;
              case "under-200":
                return price < 200;
              case "200-400":
                return price >= 200 && price <= 400;
              case "400-600":
                return price >= 400 && price <= 600;
              case "over-600":
                return price > 600;
              default:
                return true;
            }
          }

          const itemValue = item[option.key];
          return itemValue === filterValue ||
                 (typeof itemValue === "string" && itemValue.toLowerCase() === filterValue.toLowerCase());
        });
      }
    });

    // Apply sorting
    if (sortBy && sortBy !== "none") {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "name":
            return (a.name || "").localeCompare(b.name || "");
          case "price-low":
            return (a.price || 0) - (b.price || 0);
          case "price-high":
            return (b.price || 0) - (a.price || 0);
          case "date-new":
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
          case "date-old":
            return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
          case "popularity":
            return (b.likes || 0) - (a.likes || 0);
          case "stock":
            return (b.stock || 0) - (a.stock || 0);
          case "comments":
            return (b.comments || 0) - (a.comments || 0);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [items, searchQuery, filters, sortBy, searchFields, filterOptions]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter?.(newFilters);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSort?.(value);
  };

  const clearFilters = () => {
    setSearchQuery("");
    const clearedFilters = filterOptions.reduce(
      (acc, option) => ({ ...acc, [option.key]: "none" }),
      {}
    );
    setFilters(clearedFilters);
    setSortBy(defaultSort);
    onSearch?.("");
    onFilter?.(clearedFilters);
    onSort?.(defaultSort);
  };

  const activeFilterCount = Object.values(filters).filter(
    (value) => value && value !== "none"
  ).length + (searchQuery ? 1 : 0);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        {(filterOptions.length > 0 || sortOptions.length > 0) && (
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            {filterOptions.map((option) => (
              <Select
                key={option.key}
                value={filters[option.key]}
                onValueChange={(value) => handleFilterChange(option.key, value)}
              >
                <SelectTrigger className={option.width || "w-[140px]"}>
                  <SelectValue placeholder={option.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {option.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}

            {sortOptions.length > 0 && (
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

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
        )}
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredItems.length} of {items.length} results
          </p>
        </div>
        {children(filteredItems)}
      </div>
    </div>
  );
}
