import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MessageCircle,
  Heart,
  Clock,
  ThumbsUp,
  Reply,
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
  const [newReply, setNewReply] = useState("");
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

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
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleReply = () => {
    if (newReply.trim()) {
      // Here you would typically send the reply to your backend
      console.log("New reply:", newReply);
      setNewReply("");
    }
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

        {/* Posts */}
        <div className="space-y-6">
          {topic.posts.map((post, index) => (
            <Card
              key={post.id}
              className={post.isOriginalPost ? "border-primary/50" : ""}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={post.avatar} alt={post.author} />
                    <AvatarFallback>
                      {post.author.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="font-semibold">{post.author}</span>
                      {post.isOriginalPost && (
                        <Badge variant="outline" className="text-xs">
                          Original Poster
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.timestamp}</span>
                      </span>
                    </div>

                    <div className="prose prose-sm max-w-none mb-4">
                      <p className="text-foreground leading-relaxed">
                        {post.content}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="flex items-center space-x-1"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            likedPosts.has(post.id)
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground"
                          }`}
                        />
                        <span className="text-sm">
                          {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                        </span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <Reply className="h-4 w-4" />
                        <span className="text-sm">Reply</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reply Section */}
        {!topic.isLocked && (
          <>
            <Separator className="my-8" />
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Post a Reply</h3>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleReply}
                      disabled={!newReply.trim()}
                      style={{ background: "var(--linearPrimarySecondary)" }}
                      className="text-white"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Post Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {topic.isLocked && (
          <Card className="mt-8">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                This topic is locked. No new replies can be posted.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}
