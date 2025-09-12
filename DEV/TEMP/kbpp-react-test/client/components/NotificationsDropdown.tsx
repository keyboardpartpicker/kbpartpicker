import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageCircle, Heart, User, Settings } from "lucide-react";

interface Notification {
  id: string;
  type: "comment" | "like" | "follow" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export function NotificationsDropdown() {
  // TODO: API Integration - Notifications
  // When database is implemented, replace static data with API calls:
  // - GET /api/notifications to fetch user notifications
  // - PUT /api/notifications/{id}/read to mark as read
  // - POST /api/notifications/mark-all-read to mark all as read
  // - WebSocket connection for real-time notifications

  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "comment",
      title: "New comment on your build",
      message: "switchenthusiast commented on 'Midnight Tactile Dream'",
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "like",
      title: "Your build was liked",
      message: "5 people liked your 'Budget Beast 60%' build",
      timestamp: "4 hours ago",
      read: false,
    },
    {
      id: "3",
      type: "follow",
      title: "New follower",
      message: "tactile_lover started following you",
      timestamp: "1 day ago",
      read: true,
    },
    {
      id: "4",
      type: "system",
      title: "Weekly digest",
      message: "Check out the most popular builds this week",
      timestamp: "2 days ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "follow":
        return <User className="h-4 w-4 text-green-500" />;
      case "system":
        return <Settings className="h-4 w-4 text-gray-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // TODO: API Integration - Mark as Read
    // When implemented, add API call to mark notification as read
    // - PUT /api/notifications/${notification.id}/read
    console.log("Notification clicked:", notification.id);
    
    if (notification.actionUrl) {
      // TODO: Navigate to the relevant page
      console.log("Navigate to:", notification.actionUrl);
    }
  };

  const handleMarkAllRead = () => {
    // TODO: API Integration - Mark All as Read
    // When implemented, add API call to mark all notifications as read
    // - POST /api/notifications/mark-all-read
    console.log("Mark all notifications as read");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-primary hover:text-primary/80"
              onClick={handleMarkAllRead}
            >
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex items-start space-x-3 p-3 cursor-pointer ${
                  !notification.read ? "bg-muted/50" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!notification.read ? "font-medium" : ""}`}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.timestamp}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
        )}
        
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center text-primary">
              <span>View all notifications</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
