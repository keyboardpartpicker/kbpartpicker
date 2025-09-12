import React, { createContext, useContext, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { X, Check, Heart, Share2, Bookmark, Save } from "lucide-react";

type NotificationType = "success" | "error" | "info" | "warning";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  icon?: React.ReactNode;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, "id">) => {
    const id = Date.now().toString();
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration ?? 5000,
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Auto-remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearAll,
      }}
    >
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onRemove: () => void;
}

function NotificationItem({ notification, onRemove }: NotificationItemProps) {
  const getTypeStyles = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400";
      case "error":
        return "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400";
      case "warning":
        return "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "info":
      default:
        return "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400";
    }
  };

  const getDefaultIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <Check className="h-4 w-4" />;
      case "error":
        return <X className="h-4 w-4" />;
      case "warning":
        return <X className="h-4 w-4" />;
      case "info":
      default:
        return <Check className="h-4 w-4" />;
    }
  };

  return (
    <div
      className={cn(
        "group relative flex items-start space-x-3 rounded-lg border p-4 shadow-lg transition-all duration-200",
        "bg-card/90 hover:bg-card backdrop-blur-sm",
        "hover:shadow-xl hover:scale-105",
        "animate-in slide-in-from-left-2 fade-in duration-300",
        getTypeStyles(notification.type)
      )}
    >
      <div className="flex-shrink-0 mt-0.5">
        {notification.icon || getDefaultIcon(notification.type)}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-tight">
          {notification.title}
        </p>
        {notification.message && (
          <p className="mt-1 text-xs opacity-90 leading-tight">
            {notification.message}
          </p>
        )}
        {notification.action && (
          <button
            onClick={notification.action.onClick}
            className="mt-2 text-xs font-medium underline hover:no-underline"
          >
            {notification.action.label}
          </button>
        )}
      </div>

      <button
        onClick={onRemove}
        className="flex-shrink-0 rounded-full p-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Dismiss notification"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

// Helper functions for common notification types
export function useNotificationHelpers() {
  const { addNotification } = useNotifications();

  return {
    notifyBuildSaved: (buildTitle: string, visibility: string) => {
      addNotification({
        type: "success",
        title: "Build Saved Successfully",
        message: `"${buildTitle}" saved as ${visibility}`,
        icon: <Save className="h-4 w-4" />,
        duration: 4000,
      });
    },

    notifyPostLiked: (postTitle: string) => {
      addNotification({
        type: "success",
        title: "Post Liked",
        message: `Liked "${postTitle}"`,
        icon: <Heart className="h-4 w-4" />,
        duration: 3000,
      });
    },

    notifyPostShared: (postTitle: string) => {
      addNotification({
        type: "success",
        title: "Post Shared",
        message: `Shared "${postTitle}"`,
        icon: <Share2 className="h-4 w-4" />,
        duration: 3000,
      });
    },

    notifyPostSaved: (postTitle: string) => {
      addNotification({
        type: "success",
        title: "Post Saved",
        message: `Saved "${postTitle}" to your collection`,
        icon: <Bookmark className="h-4 w-4" />,
        duration: 3000,
      });
    },

    notifyError: (title: string, message?: string) => {
      addNotification({
        type: "error",
        title,
        message,
        duration: 5000,
      });
    },

    notifySuccess: (title: string, message?: string) => {
      addNotification({
        type: "success",
        title,
        message,
        duration: 4000,
      });
    },
  };
}
