import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  action,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`mb-8 ${className}`} data-page-header>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        {action && <div>{action}</div>}
      </div>
      {description && (
        <p className="text-muted-foreground text-lg max-w-3xl">{description}</p>
      )}
    </div>
  );
}
