import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Send,
  MessageCircle,
  Heart,
  ThumbsUp,
  MoreHorizontal,
  Reply,
  Clock
} from "lucide-react";

interface Author {
  id: string;
  username: string;
  avatar?: string;
}

interface DiscussionItem {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
  likes?: number;
  isLiked?: boolean;
  replies?: DiscussionItem[];
  isOriginalPost?: boolean;
}

interface DiscussionProps {
  items: DiscussionItem[];
  mode: "comments" | "forum" | "forum-posts";
  title?: string;
  placeholder?: string;
  submitLabel?: string;
  onSubmit: (content: string) => void;
  onLike?: (itemId: string) => void;
  onReply?: (parentId: string, content: string) => void;
  isLocked?: boolean;
  className?: string;
  currentUser?: Author;
}

export function Discussion({
  items,
  mode,
  title,
  placeholder,
  submitLabel,
  onSubmit,
  onLike,
  onReply,
  isLocked = false,
  className = "",
  currentUser,
}: DiscussionProps) {
  const [newContent, setNewContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const defaultPlaceholder = mode === "comments" ? "Add a comment..." : "Share your thoughts...";
  const defaultSubmitLabel = mode === "comments" ? "Comment" : "Post Reply";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newContent.trim()) {
      onSubmit(newContent.trim());
      setNewContent("");
      setIsFocused(false);
    }
  };

  const handleReplySubmit = (parentId: string) => {
    if (replyContent.trim() && onReply) {
      onReply(parentId, replyContent.trim());
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  const handleLike = (itemId: string) => {
    if (onLike) {
      onLike(itemId);
    }
  };

  const formatDate = (dateString: string) => {
    // If it's already a relative time string (like "2h ago", "Just now"), return as-is
    if (dateString.includes("ago") || dateString === "Just now") {
      return dateString;
    }

    // Try to parse as a date
    const date = new Date(dateString);

    // If parsing failed, return the original string
    if (isNaN(date.getTime())) {
      return dateString;
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString();
  };

  const renderDiscussionItem = (item: DiscussionItem, isReply = false) => {
    if (mode === "forum-posts") {
      return (
        <Card
          key={item.id}
          className={item.isOriginalPost ? "border-primary/50" : ""}
        >
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={item.author.avatar} alt={item.author.username} />
                <AvatarFallback>
                  {item.author.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="font-semibold">{item.author.username}</span>
                  {item.isOriginalPost && (
                    <Badge variant="outline" className="text-xs">
                      Original Poster
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(item.createdAt)}</span>
                  </span>
                </div>

                <div className="prose prose-sm max-w-none mb-4">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {item.content}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  {item.likes !== undefined && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(item.id)}
                      className="flex items-center space-x-1"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          item.isLiked
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-sm">
                        {item.likes}
                      </span>
                    </Button>
                  )}

                  {onReply && !isLocked && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingTo(replyingTo === item.id ? null : item.id)}
                      className="flex items-center space-x-1"
                    >
                      <Reply className="h-4 w-4" />
                      <span className="text-sm">Reply</span>
                    </Button>
                  )}
                </div>

                {replyingTo === item.id && (
                  <div className="mt-4 space-y-2">
                    <Textarea
                      placeholder="Write a reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setReplyingTo(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleReplySubmit(item.id)}
                        disabled={!replyContent.trim()}
                        style={{ background: "var(--linearPrimarySecondary)" }}
                        className="text-white"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Original comment/forum style rendering
    return (
      <div key={item.id} className={`flex space-x-3 ${isReply ? "ml-8 mt-3" : ""}`}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={item.author.avatar} />
          <AvatarFallback>
            {item.author.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{item.author.username}</span>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {formatDate(item.createdAt)}
              </div>
            </div>
            <p className="text-sm whitespace-pre-wrap">{item.content}</p>
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            {item.likes !== undefined && (
              <button
                onClick={() => handleLike(item.id)}
                className={`flex items-center space-x-1 hover:text-primary transition-colors ${
                  item.isLiked ? "text-red-500" : ""
                }`}
              >
                <Heart className={`h-4 w-4 ${item.isLiked ? "fill-current" : ""}`} />
                <span>{item.likes}</span>
              </button>
            )}

            {onReply && !isLocked && (
              <button
                onClick={() => setReplyingTo(replyingTo === item.id ? null : item.id)}
                className="flex items-center space-x-1 hover:text-primary transition-colors"
              >
                <Reply className="h-4 w-4" />
                <span>Reply</span>
              </button>
            )}
          </div>

          {replyingTo === item.id && (
            <div className="mt-3 space-y-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReplyingTo(null)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleReplySubmit(item.id)}
                  disabled={!replyContent.trim()}
                >
                  Reply
                </Button>
              </div>
            </div>
          )}

          {item.replies && item.replies.length > 0 && (
            <div className="space-y-3">
              {item.replies.map((reply) => renderDiscussionItem(reply, true))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isLocked) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            {mode === "comments" 
              ? "Comments are disabled for this post."
              : "This topic is locked. No new replies can be posted."
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  const renderReplyForm = () => (
    <Card>
      <CardContent className="p-6">
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "comments" ? (
            <div className="flex space-x-3">
              {currentUser && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback>
                    {currentUser.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1">
                <Textarea
                  placeholder={placeholder || defaultPlaceholder}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    if (!newContent.trim()) {
                      setIsFocused(false);
                    }
                  }}
                  className={`transition-all duration-200 resize-none ${
                    isFocused ? "min-h-[80px]" : "min-h-[40px]"
                  }`}
                />
                {(isFocused || newContent.trim()) && (
                  <div className="flex justify-end mt-2">
                    <Button type="submit" size="sm" disabled={!newContent.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      {submitLabel || defaultSubmitLabel}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Textarea
                placeholder={placeholder || defaultPlaceholder}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!newContent.trim()}
                  style={{ background: "var(--linearPrimarySecondary)" }}
                  className="text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {submitLabel || defaultSubmitLabel}
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* New Content Form - Show at top for comments, at bottom for forum-posts */}
      {mode !== "forum-posts" && renderReplyForm()}

      {/* Discussion Items */}
      {items.length > 0 && (
        mode === "forum-posts" ? (
          <div className="space-y-6">
            {items.map((item) => renderDiscussionItem(item))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {items.map((item) => renderDiscussionItem(item))}
              </div>
            </CardContent>
          </Card>
        )
      )}

      {/* New Content Form - Show at bottom for forum-posts */}
      {mode === "forum-posts" && renderReplyForm()}
    </div>
  );
}
