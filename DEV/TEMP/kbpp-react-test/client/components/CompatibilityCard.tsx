import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, CheckCircle, LucideIcon } from "lucide-react";

type CompatibilityType = "error" | "warning" | "success";

interface CompatibilityCardProps {
  type: CompatibilityType;
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
}

const compatibilityStyles = {
  error: {
    border: "border-red-500/20",
    background: "bg-red-500/5",
    iconColor: "text-red-500",
    titleColor: "text-red-700 dark:text-red-400",
    defaultIcon: AlertCircle,
  },
  warning: {
    border: "border-yellow-500/20",
    background: "bg-yellow-500/5",
    iconColor: "text-yellow-500",
    titleColor: "text-yellow-700 dark:text-yellow-400",
    defaultIcon: AlertTriangle,
  },
  success: {
    border: "border-green-500/20",
    background: "bg-green-500/5",
    iconColor: "text-green-500",
    titleColor: "text-green-700 dark:text-green-400",
    defaultIcon: CheckCircle,
  },
};

export function CompatibilityCard({
  type,
  title,
  description,
  icon,
  className = "",
}: CompatibilityCardProps) {
  const styles = compatibilityStyles[type];
  const IconComponent = icon || styles.defaultIcon;

  return (
    <Card
      className={`${styles.border} ${styles.background} flex-shrink-0 w-80 ${className}`}
    >
      <CardContent className="p-3">
        <div className="flex items-center space-x-3">
          <IconComponent className={`h-4 w-4 ${styles.iconColor} flex-shrink-0`} />
          <div>
            <h3 className={`font-medium ${styles.titleColor} text-sm`}>
              {title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
