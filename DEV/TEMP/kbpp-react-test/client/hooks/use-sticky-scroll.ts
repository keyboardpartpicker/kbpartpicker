import { useState, useEffect, useCallback, useRef } from "react";

interface UseStickyScrollOptions {
  /** Selector for the element that marks the end of the sticky track */
  trackEndSelector?: string;
  /** Additional bottom padding when at track end (in pixels) */
  bottomPadding?: number;
}

interface StickyScrollState {
  /** Whether the element should be in sticky mode */
  isSticky: boolean;
  /** Whether the element has reached the end of its track and should be static */
  isStatic: boolean;
  /** The original position and dimensions of the element */
  originalRect: DOMRect | null;
  /** The calculated position for the sticky element */
  stickyPosition: {
    top: number;
    left: number;
    width: number;
  };
  /** The position for static mode at track end */
  staticPosition: {
    top: number;
    left: number;
  } | null;
}

export function useStickyScroll(
  elementRef: React.RefObject<HTMLElement>,
  options: UseStickyScrollOptions = {},
): StickyScrollState {
  const { trackEndSelector = "", bottomPadding = 32 } = options;

  const [state, setState] = useState<StickyScrollState>({
    isSticky: false,
    isStatic: false,
    originalRect: null,
    stickyPosition: {
      top: 0,
      left: 0,
      width: 0,
    },
    staticPosition: null,
  });

  const originalRectRef = useRef<DOMRect | null>(null);
  const naturalTopPaddingRef = useRef<number>(0);
  const trackStartScrollYRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    const scrollY = window.scrollY;

    // Check if sticky system is necessary based on page height
    const pageHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const minHeightForSticky = viewportHeight * 1.5;

    if (pageHeight < minHeightForSticky) {
      // Page is too short, disable sticky system
      setState({
        isSticky: false,
        isStatic: false,
        originalRect: null,
        stickyPosition: {
          top: 0,
          left: 0,
          width: 0,
        },
        staticPosition: null,
      });
      return;
    }

    // Capture original position and calculate natural padding on first run
    if (!originalRectRef.current) {
      const rect = element.getBoundingClientRect();
      originalRectRef.current = new DOMRect(
        rect.left,
        rect.top + scrollY,
        rect.width,
        rect.height,
      );

      // Calculate the natural padding between header and element at current scroll
      // Get actual header height dynamically
      const navbar = document.querySelector("nav");
      const headerHeight = navbar ? navbar.offsetHeight : 64;

      // Calculate target spacing to maintain between header and BuildSummary
      const targetSpacing = 32; // 32px spacing to match the natural layout
      const bufferOffset = 24; // Additional buffer to trigger sticky earlier

      naturalTopPaddingRef.current = headerHeight + targetSpacing;

      // Use BuildSummary top edge with hardcoded offset + buffer for earlier activation
      // Trigger sticky before BuildSummary reaches the target sticky position
      const stickyOffset = headerHeight + targetSpacing + bufferOffset;
      trackStartScrollYRef.current = scrollY + (rect.top - stickyOffset);
    }

    const originalRect = originalRectRef.current;
    const naturalTopPadding = naturalTopPaddingRef.current;
    const trackStartScrollY = trackStartScrollYRef.current;

    if (!originalRect) return;

    // Determine current mode
    let isSticky = false;
    let isStatic = false;
    let stickyTop = naturalTopPadding;
    let staticPosition = null;

    if (scrollY >= trackStartScrollY) {
      // We should be in sticky mode, but check if we've reached track end
      const trackEndElement = trackEndSelector
        ? document.querySelector(trackEndSelector)
        : null;

      if (trackEndElement) {
        const trackEndRect = trackEndElement.getBoundingClientRect();
        const trackEndBottom = trackEndRect.top + scrollY + trackEndRect.height;

        // Calculate where the element would be if sticky
        const stickyBottom = scrollY + naturalTopPadding + originalRect.height;
        const trackEndBuffer = 44; // Buffer to switch to absolute earlier and prevent jumping
        const maxAllowedBottom =
          trackEndBottom + bottomPadding - trackEndBuffer;

        if (stickyBottom > maxAllowedBottom) {
          // We've reached the track end - return to static positioning
          isStatic = true;
          isSticky = false;

          // Position element to match the final sticky position exactly
          const staticTop = Math.max(
            maxAllowedBottom - originalRect.height + 24, // Lower the position by additional 24px
            originalRect.top, // Never position above the original position
          );
          staticPosition = {
            top: staticTop,
            left: originalRect.left,
          };
        } else {
          // Normal sticky mode
          isSticky = true;
          stickyTop = naturalTopPadding;
        }
      } else {
        // No track end defined, just use normal sticky
        isSticky = true;
        stickyTop = naturalTopPadding;
      }
    }

    setState({
      isSticky,
      isStatic,
      originalRect,
      stickyPosition: {
        top: stickyTop,
        left: originalRect.left,
        width: originalRect.width,
      },
      staticPosition,
    });
  }, [trackEndSelector, bottomPadding]);

  // Reset when element changes
  useEffect(() => {
    originalRectRef.current = null;
    naturalTopPaddingRef.current = 0;
    trackStartScrollYRef.current = 0;
  }, [elementRef.current]);

  useEffect(() => {
    // Initial calculation
    handleScroll();

    // Throttled scroll handler
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener(
      "resize",
      () => {
        // Reset measurements on resize
        originalRectRef.current = null;
        naturalTopPaddingRef.current = 0;
        trackStartScrollYRef.current = 0;
        handleScroll();
      },
      { passive: true },
    );

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return state;
}
