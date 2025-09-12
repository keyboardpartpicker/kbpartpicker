import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Heart, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface ForumTopicCardProps {
  id: string;
  title: string;
  author: string;
  avatar?: string;
  createdAt: string;
  lastReply: string;
  replies: number;
  likes: number;
  isPinned?: boolean;
  isLocked?: boolean;
  className?: string;
}

export function ForumTopicCard({
  id,
  title,
  author,
  avatar,
  createdAt,
  lastReply,
  replies,
  likes,
  isPinned = false,
  isLocked = false,
  className = "",
}: ForumTopicCardProps) {
  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatar} alt={author} />
              <AvatarFallback>
                {author.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                {isPinned && (
                  <Badge variant="secondary" className="text-xs">
                    Pinned
                  </Badge>
                )}
                {isLocked && (
                  <Badge variant="destructive" className="text-xs">
                    Locked
                  </Badge>
                )}
                <Link
                  to={`/forum/topic/${id}`}
                  className="text-lg font-semibold hover:text-primary transition-colors line-clamp-1"
                >
                  {title}
                </Link>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>by {author}</span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{createdAt}</span>
                </span>
                <span>Last reply: {lastReply}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{replies}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
