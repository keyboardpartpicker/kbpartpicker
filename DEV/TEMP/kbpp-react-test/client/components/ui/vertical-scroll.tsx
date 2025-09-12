import * as React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VerticalScrollProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showScrollButtons?: boolean;
  scrollButtonVariant?: "default" | "minimal";
  gap?: string;
  maxHeight?: string;
}

const VerticalScroll = React.forwardRef<HTMLDivElement, VerticalScrollProps>(
  (
    {
      className,
      children,
      showScrollButtons = true,
      scrollButtonVariant = "default",
      gap = "gap-3",
      maxHeight = "max-h-96",
      ...props
    },
    ref,
  ) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [canScrollUp, setCanScrollUp] = React.useState(false);
    const [canScrollDown, setCanScrollDown] = React.useState(false);

    const checkScrollability = React.useCallback(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      setCanScrollUp(container.scrollTop > 0);
      setCanScrollDown(
        container.scrollTop < container.scrollHeight - container.clientHeight,
      );
    }, []);

    React.useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      checkScrollability();
      container.addEventListener("scroll", checkScrollability);

      const resizeObserver = new ResizeObserver(checkScrollability);
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener("scroll", checkScrollability);
        resizeObserver.disconnect();
      };
    }, [checkScrollability]);

    const scroll = (direction: "up" | "down") => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollAmount = container.clientHeight * 0.8;
      container.scrollBy({
        top: direction === "up" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    };

    const scrollButtonClass = cn(
      "absolute left-1/2 -translate-x-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
      scrollButtonVariant === "minimal"
        ? "bg-background/80 hover:bg-background/90 border border-border shadow-sm"
        : "bg-card/90 hover:bg-card border border-border shadow-md hover:shadow-lg",
      "backdrop-blur-sm",
    );

    return (
      <div className={cn("relative", className)} ref={ref} {...props}>
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex flex-col overflow-y-auto scrollbar-hide",
            gap,
            maxHeight,
            "scroll-smooth",
          )}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {children}
        </div>

        {showScrollButtons && (
          <>
            {canScrollUp && (
              <button
                onClick={() => scroll("up")}
                className={cn(scrollButtonClass, "-top-4")}
                aria-label="Scroll up"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
            )}

            {canScrollDown && (
              <button
                onClick={() => scroll("down")}
                className={cn(scrollButtonClass, "-bottom-4")}
                aria-label="Scroll down"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            )}
          </>
        )}

        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    );
  },
);

VerticalScroll.displayName = "VerticalScroll";

export { VerticalScroll };
