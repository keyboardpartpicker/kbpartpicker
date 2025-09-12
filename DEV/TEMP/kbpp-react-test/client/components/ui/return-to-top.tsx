import * as React from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReturnToTopProps {
  /** Scroll threshold before showing the button */
  threshold?: number;
  /** Additional className for the button */
  className?: string;
}

const ReturnToTop = React.forwardRef<HTMLButtonElement, ReturnToTopProps>(
  ({ threshold = 400, className, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const checkScrollPosition = React.useCallback(() => {
      setIsVisible(window.scrollY > threshold);
    }, [threshold]);

    React.useEffect(() => {
      checkScrollPosition();

      let ticking = false;
      const throttledScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            checkScrollPosition();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", throttledScroll, { passive: true });
      return () => window.removeEventListener("scroll", throttledScroll);
    }, [checkScrollPosition]);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    if (!isVisible) return null;

    return (
      <button
        ref={ref}
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200",
          "bg-card/90 hover:bg-card border border-border shadow-md hover:shadow-lg",
          "backdrop-blur-sm",
          "hover:scale-105 active:scale-95",
          className,
        )}
        aria-label="Return to top"
        {...props}
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    );
  },
);

ReturnToTop.displayName = "ReturnToTop";

export { ReturnToTop };
