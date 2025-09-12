import React from "react";
import { Button } from "@/components/ui/button";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";
import { X, ExternalLink } from "lucide-react";

interface BuilderCardProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  manufacturer?: string;
  thumbnail?: string;
  specifications?: Record<string, string>;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
  className?: string;
}

export function BuilderCard({
  id,
  name,
  price,
  quantity,
  manufacturer,
  thumbnail,
  specifications,
  onRemove,
  onUpdateQuantity,
  className = "",
}: BuilderCardProps) {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value) || 1;
    onUpdateQuantity(newQuantity);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    onUpdateQuantity(quantity + 1);
  };

  return (
    <div className={`p-3 bg-muted/30 rounded-md space-y-2 group ${className}`}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium truncate flex-1 min-w-0 pr-2">
            {name}
          </p>

          <div className="flex items-center space-x-1">
            {/* Price label - shown by default */}
            <span className="text-xs font-medium text-primary whitespace-nowrap group-hover:hidden">
              ${price.toFixed(2)} × {quantity}
            </span>

            {/* Controls - shown on hover */}
            <div className="hidden group-hover:flex items-center space-x-1">
              <button
                className="h-5 w-5 rounded bg-muted hover:bg-muted/80 flex items-center justify-center text-xs"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleQuantityDecrease();
                }}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                onClick={(e) => e.stopPropagation()}
                className="h-5 w-8 text-xs text-center p-1 border border-input bg-background text-foreground rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                className="h-5 w-5 rounded bg-muted hover:bg-muted/80 flex items-center justify-center text-xs"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleQuantityIncrease();
                }}
              >
                +
              </button>
              <button
                className="p-1 hover:bg-destructive/10 rounded transition-all ml-1"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onRemove();
                }}
                title={`Remove ${name}`}
              >
                <X className="h-3 w-3 text-destructive" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {manufacturer && (
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(name + " " + manufacturer)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          {manufacturer}
          <ExternalLink className="h-3 w-3" />
        </a>
      )}

      {specifications && Object.keys(specifications).length > 0 && (
        <HorizontalScroll
          className="w-full"
          showScrollButtons="hover"
          scrollButtonVariant="minimal"
          gap="gap-1"
        >
          {Object.entries(specifications).map(([key, value]) => (
            <span
              key={key}
              className="text-xs bg-muted px-1 py-0.5 rounded whitespace-nowrap flex-shrink-0"
            >
              {key}: {value}
            </span>
          ))}
        </HorizontalScroll>
      )}

      {thumbnail && (
        <div className="w-full h-24 rounded overflow-hidden bg-muted">
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
