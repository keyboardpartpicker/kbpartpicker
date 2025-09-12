import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  useEffect(() => {
    return () => {
      // Clean up any orphaned toast viewports on unmount
      const toastViewports = document.querySelectorAll(
        "[data-radix-toast-viewport]",
      );
      toastViewports.forEach((viewport) => {
        if (viewport.parentNode && viewport.parentNode !== document.body) {
          try {
            viewport.parentNode.removeChild(viewport);
          } catch (e) {
            // Ignore removal errors during cleanup
          }
        }
      });
    };
  }, []);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
