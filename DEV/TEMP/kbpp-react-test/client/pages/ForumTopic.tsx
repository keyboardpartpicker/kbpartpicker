import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReturnToTop } from "@/components/ui/return-to-top";
import { Discussion } from "@/components/Discussion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Flag,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

interface ForumPost {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  isOriginalPost?: boolean;
}

interface ForumTopicData {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  isPinned?: boolean;
  isLocked?: boolean;
  posts: ForumPost[];
}

const topicData: Record<string, ForumTopicData> = {
  "1": {
    id: "1",
    title: "First build - need advice on switch choice",
    category: "Pre-Purchase Advice",
    categoryId: "pre-purchase-advice",
    isPinned: true,
    posts: [
      {
        id: "1",
        author: "newbie_builder",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
        content:
          "Hey everyone! I'm planning my first custom keyboard build and I'm completely overwhelmed by the switch options. I'll mainly be using this for programming and some gaming. I've heard good things about tactile switches but I'm not sure if I should go with something like Holy Pandas or stick to something more mainstream like Cherry MX Browns. My budget is around $100 for switches (need about 90). Any advice would be greatly appreciated!",
        timestamp: "2 hours ago",
        likes: 8,
        isOriginalPost: true,
      },
      {
        id: "2",
        author: "switch_expert",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        content:
          "Welcome to the hobby! For a first build, I'd actually recommend staying away from Holy Pandas - they're great switches but quite expensive and can be tricky to source. For programming, you might want to consider Boba U4T switches - they have a nice tactile bump that's very satisfying for typing but won't be too loud for coworkers. They're around $0.65 per switch so well within your budget.",
        timestamp: "1 hour ago",
        likes: 12,
      },
      {
        id: "3",
        author: "programmer_keys",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        content:
          "I second the Boba U4T recommendation! As someone who codes 8+ hours a day, the tactile feedback really helps reduce typing fatigue. If you want something a bit quieter, the regular Boba U4 (silent version) is also excellent. Both are much better than Cherry MX Browns in terms of tactility.",
        timestamp: "45 minutes ago",
        likes: 6,
      },
      {
        id: "4",
        author: "budget_builder",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b9734b42?w=100&h=100&fit=crop&crop=face",
        content:
          "If you're on a budget, don't overlook Gateron Browns either. They're much cheaper than the boutique switches but still a solid choice for a first build. You could get 90 of them for around $30-40 and use the savings on other parts of your build.",
        timestamp: "30 minutes ago",
        likes: 4,
      },
    ],
  },
};

export default function ForumTopic() {
  const { topicId } = useParams<{ topicId: string }>();

  const topic = topicId ? topicData[topicId] : null;

  if (!topic) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container pt-8 pb-24">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The forum topic you're looking for doesn't exist.
            </p>
            <Link to="/forum">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Forum
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleLike = (postId: string) => {
    // TODO: API Integration - Like Forum Post
    // When database is implemented, replace with actual API call:
    // - POST /api/forum/posts/${postId}/like to toggle like status
    // - Update UI optimistically and handle errors
    // - Include user authentication
    console.log("Like forum post:", postId);
  };

  const handleReply = (content: string) => {
    // TODO: API Integration - New Forum Reply
    // When database is implemented, replace with actual API call:
    // - POST /api/forum/topics/${topicId}/replies with reply content
    // - Update UI optimistically and handle errors
    // - Include user authentication
    console.log("New forum reply:", content);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container pt-8 pb-24">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Link to={`/forum/category/${topic.categoryId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to {topic.category}
              </Button>
            </Link>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {topic.isPinned && (
                  <Badge variant="secondary" className="text-xs">
                    Pinned
                  </Badge>
                )}
                {topic.isLocked && (
                  <Badge variant="destructive" className="text-xs">
                    Locked
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
              <p className="text-muted-foreground">
                in{" "}
                <Link
                  to={`/forum/category/${topic.categoryId}`}
                  className="hover:text-primary"
                >
                  {topic.category}
                </Link>
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Flag className="h-4 w-4 mr-2" />
                Report
              </Button>
            </div>
          </div>
        </div>

        <Discussion
          items={topic.posts.map(post => ({
            id: post.id,
            content: post.content,
            author: {
              id: post.author,
              username: post.author,
              avatar: post.avatar,
            },
            createdAt: post.timestamp,
            likes: post.likes,
            isLiked: post.isLiked,
            isOriginalPost: post.isOriginalPost,
          }))}
          mode="forum-posts"
          title="Post a Reply"
          placeholder="Share your thoughts..."
          submitLabel="Post Reply"
          onSubmit={handleReply}
          onLike={(postId) => {
            // TODO: API Integration - Like Forum Post
            // When database is implemented, replace with actual API call:
            // - POST /api/forum/posts/${postId}/like to toggle like status
            // - Update UI optimistically and handle errors
            // - Include user authentication
            console.log("Like forum post:", postId);
          }}
          onReply={(parentId, replyContent) => {
            // TODO: API Integration - Reply to Forum Post
            // When database is implemented, replace with actual API call:
            // - POST /api/forum/posts/${parentId}/replies with reply content
            // - Update UI optimistically and handle errors
            // - Include user authentication
            console.log("Reply to forum post:", parentId, replyContent);
          }}
          isLocked={topic.isLocked}
        />
      </main>
      <Footer />
      <ReturnToTop />
    </div>
  );
}
