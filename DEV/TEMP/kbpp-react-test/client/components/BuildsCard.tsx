import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNotificationHelpers } from "@/components/ClientNotifications";

interface BuildsCardProps {
  id: string;
  title: string;
  description: string;
  totalPrice: number;
  thumbnail: string;
  poster: {
    username: string;
    profilePicture?: string;
  };
  likes: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

export function BuildsCard({
  id,
  title,
  description,
  totalPrice,
  thumbnail,
  poster,
  likes,
  comments,
  isLiked = false,
  isSaved = false,
}: BuildsCardProps) {
  const { notifyPostLiked, notifyPostSaved, notifyPostShared } = useNotificationHelpers();

  const handleLike = () => {
    // TODO: API Integration - Like Build
    // When database is implemented, replace with actual API call:
    // - POST /api/builds/${id}/like to toggle like status
    // - Update UI optimistically and handle errors
    // - Include user authentication
    notifyPostLiked(title);
    console.log("Like build:", id);
  };

  const handleSave = () => {
    // TODO: API Integration - Save Build
    // When database is implemented, replace with actual API call:
    // - POST /api/builds/${id}/save to toggle save status
    // - Update UI optimistically and handle errors
    // - Include user authentication
    notifyPostSaved(title);
    console.log("Save build:", id);
  };

  const handleShare = () => {
    // TODO: API Integration - Share Build
    // When database is implemented, replace with actual API call:
    // - POST /api/builds/${id}/share to track shares
    // - Implement proper share functionality (copy link, social media, etc.)
    notifyPostShared(title);
    console.log("Share build:", id);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg hover:border-primary transition-all duration-200">
      <Link to={`/builds/post/${id}`}>
        <div className="relative cursor-pointer">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-black/70 text-white border-0"
            >
              <DollarSign className="h-3 w-3 mr-1" />
              {totalPrice.toFixed(0)}
            </Badge>
          </div>
        </div>
      </Link>

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={poster.profilePicture} alt={poster.username} />
              <AvatarFallback className="text-xs">
                {poster.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground">
              {poster.username}
            </span>
          </div>
        </div>
        <Link to={`/builds/post/${id}`}>
          <div className="cursor-pointer">
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className="flex items-center space-x-1 h-8 px-2"
            >
              <Heart
                className={`h-4 w-4 ${
                  isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
                }`}
              />
              <span className="text-xs text-muted-foreground">{likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 h-8 px-2"
            >
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{comments}</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="h-8 w-8 p-0"
            >
              <Bookmark
                className={`h-4 w-4 ${
                  isSaved ? "fill-current text-primary" : "text-muted-foreground"
                }`}
              />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="h-8 w-8 p-0"
            >
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
