import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  value: number;
  onChange: (quantity: number) => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "buttons" | "inline";
  className?: string;
  disabled?: boolean;
}

export function QuantitySelector({
  value,
  onChange,
  onIncrease,
  onDecrease,
  min = 1,
  max = 999,
  size = "md",
  variant = "buttons",
  className = "",
  disabled = false,
}: QuantitySelectorProps) {
  const [inputValue, setInputValue] = useState(value.toString());

  // Update input value when prop changes
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Allow empty input temporarily
    if (rawValue === "") {
      setInputValue("");
      return;
    }

    // Block any non-numeric characters (including 'e', '+', '-', '.')
    const numericValue = rawValue.replace(/[^0-9]/g, "");
    setInputValue(numericValue);

    // If we have a valid number, update the quantity
    if (numericValue !== "") {
      const newQuantity = parseInt(numericValue, 10);
      if (newQuantity >= min && newQuantity <= max) {
        onChange(newQuantity);
      }
    }
  };

  const handleInputBlur = () => {
    // If empty or invalid when focus is lost, revert to current valid value
    if (inputValue === "" || parseInt(inputValue, 10) < min || parseInt(inputValue, 10) > max || isNaN(parseInt(inputValue, 10))) {
      setInputValue(value.toString());
    }
  };

  const handleDecrease = () => {
    if (disabled || value <= min) return;
    
    if (onDecrease) {
      onDecrease();
    } else {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (disabled || value >= max) return;
    
    if (onIncrease) {
      onIncrease();
    } else {
      onChange(value + 1);
    }
  };

  const sizeClasses = {
    sm: {
      button: "h-5 w-5 text-xs",
      input: "h-5 w-8 text-xs",
    },
    md: {
      button: "h-8 w-8 text-sm",
      input: "h-8 w-16 text-sm",
    },
    lg: {
      button: "h-10 w-10 text-base",
      input: "h-10 w-20 text-base",
    },
  };

  const classes = sizeClasses[size];

  if (variant === "inline") {
    return (
      <div className={`flex items-center space-x-1 ${className}`}>
        <button
          className={`${classes.button} rounded bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleDecrease}
          disabled={disabled || value <= min}
        >
          -
        </button>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          disabled={disabled}
          className={`${classes.input} text-center p-1 border border-input bg-background text-foreground rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        <button
          className={`${classes.button} rounded bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleIncrease}
          disabled={disabled || value >= max}
        >
          +
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        className={`${classes.button} p-0 flex-shrink-0`}
        onClick={handleDecrease}
        disabled={disabled || value <= min}
      >
        -
      </Button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={disabled}
        className={`${classes.input} text-center p-1 flex-shrink-0 border border-input bg-background text-foreground rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      <Button
        variant="outline"
        size="sm"
        className={`${classes.button} p-0 flex-shrink-0`}
        onClick={handleIncrease}
        disabled={disabled || value >= max}
      >
        +
      </Button>
    </div>
  );
}
