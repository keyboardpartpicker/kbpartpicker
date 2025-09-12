import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HorizontalScrollProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showScrollButtons?: boolean | "hover";
  scrollButtonVariant?: "default" | "minimal";
  gap?: string;
}

const HorizontalScroll = React.forwardRef<
  HTMLDivElement,
  HorizontalScrollProps
>(
  (
    {
      className,
      children,
      showScrollButtons = true,
      scrollButtonVariant = "default",
      gap = "gap-3",
      ...props
    },
    ref,
  ) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(false);

    const checkScrollability = React.useCallback(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth,
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

    const scroll = (direction: "left" | "right") => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    };

    const scrollButtonClass = cn(
      "absolute top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
      scrollButtonVariant === "minimal"
        ? "bg-background/80 hover:bg-background/90 border border-border shadow-sm"
        : "bg-card/90 hover:bg-card border border-border shadow-md hover:shadow-lg",
      "backdrop-blur-sm",
      showScrollButtons === "hover" ? "opacity-0 group-hover:opacity-100" : "",
    );

    return (
      <div
        className={cn(
          "relative",
          showScrollButtons === "hover" ? "group" : "",
          className,
        )}
        ref={ref}
        {...props}
      >
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex overflow-x-auto scrollbar-hide",
            gap,
            "scroll-smooth",
          )}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {children}
        </div>

        {(showScrollButtons === true || showScrollButtons === "hover") && (
          <>
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className={cn(scrollButtonClass, "-left-4")}
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}

            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className={cn(scrollButtonClass, "-right-4")}
                aria-label="Scroll right"
              >
                <ChevronRight className="h-4 w-4" />
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

HorizontalScroll.displayName = "HorizontalScroll";

export { HorizontalScroll };
