import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ReturnToTop } from "@/components/ui/return-to-top";
import { Discussion } from "@/components/Discussion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  MessageCircle,
  Share,
  Play,
  Volume2,
  ArrowLeft,
  Send,
  MoreHorizontal,
  Calendar,
  DollarSign,
  Keyboard,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface Comment {
  id: string;
  author: {
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

interface BuildPost {
  id: string;
  title: string;
  description: string;
  author: {
    username: string;
    avatar: string;
    followers: number;
  };
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  totalPrice: number;
  layout: string;
  switchType: string;
  gallery: string[];
  youtubeUrl?: string;
  soundFileUrl?: string;
  specifications: {
    case: string;
    switches: string;
    keycaps: string;
    plate: string;
  };
}

export default function BuildPost() {
  const { id } = useParams<{ id: string }>();
  const [buildPost, setBuildPost] = useState<BuildPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const fetchBuildPost = async () => {
      try {
        // TODO: API Integration - Individual Build Post
        // When builds database is implemented, replace with actual API calls:
        // - GET /api/builds/${id} for build post data
        // - GET /api/builds/${id}/comments for comments
        // - POST /api/builds/${id}/like for like functionality
        // - POST /api/builds/${id}/comments for new comments
        // - Include user authentication for personalized features
        // - Add real-time updates for likes and comments
        const mockPost: BuildPost = {
          id: id || "1",
          title: "Midnight Tactile Dream",
          description:
            "A sleek 65% build featuring Holy Panda switches, GMK Laser keycaps, and a custom aluminum case. Perfect for both gaming and productivity with a satisfying tactile bump.\n\nThis build took me about 3 months to complete, sourcing parts from various group buys and vendors. The Holy Panda switches are lubed with Krytox 205g0 for the smoothest tactile experience. The case is a custom powder-coated Tofu65 in midnight blue.\n\nThe sound signature is deep and thocky with just the right amount of tactile feedback. Perfect for long typing sessions and gaming marathons.",
          author: {
            username: "keybdlover",
            avatar:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
            followers: 1247,
          },
          createdAt: "2024-01-15",
          likes: 247,
          comments: 38,
          isLiked: false,
          totalPrice: 485,
          layout: "65%",
          switchType: "Tactile",
          gallery: [
            "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
          ],
          youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          soundFileUrl: "https://example.com/keyboard-sound.mp3",
          specifications: {
            case: "Tofu65 Aluminum (Midnight Blue)",
            switches: "Holy Panda (Lubed with Krytox 205g0)",
            keycaps: "GMK Laser (Cherry Profile)",
            plate: "Brass Plate (1.5mm)",
          },
        };

        const mockComments: Comment[] = [
          {
            id: "1",
            author: {
              username: "switchenthusiast",
              avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            },
            content:
              "Absolutely gorgeous build! The Holy Pandas are my favorite tactile switches. How do you like the brass plate compared to other materials?",
            timestamp: "2h ago",
            likes: 12,
          },
          {
            id: "2",
            author: {
              username: "tactile_lover",
              avatar:
                "https://images.unsplash.com/photo-1494790108755-2616b9734b42?w=100&h=100&fit=crop&crop=face",
            },
            content:
              "The color combination is perfect! Did you have any issues with the GMK Laser set? I've heard some people have shine issues.",
            timestamp: "4h ago",
            likes: 8,
          },
          {
            id: "3",
            author: {
              username: "budget_builder",
              avatar:
                "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face",
            },
            content:
              "This is goals! One day I'll have a build this clean. The sound test is amazing - so thocky!",
            timestamp: "6h ago",
            likes: 15,
          },
          {
            id: "4",
            author: {
              username: "keybdlover",
              avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            },
            content:
              "@switchenthusiast The brass plate definitely adds more weight and warmth to the sound compared to aluminum. It's a bit softer feeling too, which pairs really well with the Holy Pandas!",
            timestamp: "1h ago",
            likes: 5,
          },
          {
            id: "5",
            author: {
              username: "linear_life",
              avatar:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
            },
            content:
              "Beautiful work! I'm usually a linear guy but this makes me want to try tactiles again. What's your next build going to be?",
            timestamp: "8h ago",
            likes: 6,
          },
          {
            id: "6",
            author: {
              username: "artisan_hunter",
              avatar:
                "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face",
            },
            content:
              "The stabilizers sound so clean! Did you do any modding to them? Mine always seem to have a bit of rattle no matter what I try.",
            timestamp: "12h ago",
            likes: 9,
          },
          {
            id: "7",
            author: {
              username: "silent_typer",
              avatar:
                "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face",
            },
            content:
              "Amazing build documentation! The step-by-step photos really help beginners like me understand the process. Thanks for sharing!",
            timestamp: "1d ago",
            likes: 11,
          },
        ];

        await new Promise((resolve) => setTimeout(resolve, 500));
        setBuildPost(mockPost);
        setComments(mockComments);
      } catch (error) {
        console.error("Error loading build post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildPost();
  }, [id]);

  const handleLike = () => {
    // TODO: API Integration - Like Build Post
    // When database is implemented, replace with actual API call:
    // - POST /api/builds/${buildPost?.id}/like to toggle like status
    // - Update UI optimistically and handle errors
    // - Include user authentication
    console.log("Like build post:", buildPost?.id);
  };

  const handleCommentSubmit = (content: string) => {
    if (!content.trim()) return;

    // TODO: API Integration - Comment Submission
    // When database is implemented, replace with actual API call:
    // - POST /api/builds/${buildPost?.id}/comments with comment data
    // - Include user authentication and validation
    // - Handle optimistic updates and error states

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        username: "current_user",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      },
      content: content.trim(),
      timestamp: "Just now",
      likes: 0,
    };

    setComments((prev) => [comment, ...prev]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container pt-8 pb-24">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading build post...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!buildPost) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container pt-8 pb-24">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Build Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The build post you're looking for doesn't exist.
            </p>
            <Link to="/builds">
              <Button>Back to Builds</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container pt-8 pb-24">
        <div className="mb-6">
          <Link to="/builds">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Builds
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Post Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={buildPost.author.avatar} />
                      <AvatarFallback>
                        {buildPost.author.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">
                        {buildPost.author.username}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {buildPost.author.followers.toLocaleString()} followers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(buildPost.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <h1 className="text-2xl font-bold mb-2">{buildPost.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>${buildPost.totalPrice}</span>
                    </div>
                    <Badge variant="secondary">{buildPost.layout}</Badge>
                    <Badge variant="outline">{buildPost.switchType}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {buildPost.description
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {buildPost.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video rounded-lg overflow-hidden bg-muted"
                    >
                      <img
                        src={image}
                        alt={`${buildPost.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Build Process Video */}
            {buildPost.youtubeUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>Build Process</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <iframe
                      src={buildPost.youtubeUrl}
                      title="Build Process Video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sound Preview */}
            {buildPost.soundFileUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Volume2 className="h-5 w-5" />
                    <span>Sound Test</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-6">
                    <audio controls className="w-full">
                      <source src={buildPost.soundFileUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <p className="text-sm text-muted-foreground mt-2">
                      Listen to the typing sound of this build
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Engagement */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLike}
                      className={`${buildPost.isLiked ? "text-red-500" : ""}`}
                    >
                      <Heart
                        className={`h-4 w-4 mr-2 ${buildPost.isLiked ? "fill-current" : ""}`}
                      />
                      {buildPost.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {comments.length}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                <Separator className="mb-4" />

                <Discussion
                  items={comments.map(comment => ({
                    id: comment.id,
                    content: comment.content,
                    author: {
                      id: comment.author.username,
                      username: comment.author.username,
                      avatar: comment.author.avatar,
                    },
                    createdAt: comment.timestamp,
                    likes: comment.likes,
                    isLiked: false,
                  }))}
                  mode="comments"
                  onSubmit={handleCommentSubmit}
                  onLike={(commentId) => {
                    // TODO: API Integration - Like Comment
                    // When database is implemented, replace with actual API call:
                    // - POST /api/comments/${commentId}/like to toggle like status
                    // - Update UI optimistically and handle errors
                    // - Include user authentication
                    console.log("Like comment:", commentId);
                  }}
                  onReply={(parentId, replyContent) => {
                    // TODO: API Integration - Reply to Comment
                    // When database is implemented, replace with actual API call:
                    // - POST /api/comments/${parentId}/replies with reply content
                    // - Update UI optimistically and handle errors
                    // - Include user authentication
                    console.log("Reply to comment:", parentId, replyContent);
                  }}
                  currentUser={{
                    id: "current-user",
                    username: "You",
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Build Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Keyboard className="h-5 w-5" />
                  <span>Specifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(buildPost.specifications).map(
                  ([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground capitalize">
                          {key}:
                        </span>
                        <span className="font-medium text-right flex-1 ml-2">
                          {value}
                        </span>
                      </div>
                    </div>
                  ),
                )}
                <Separator />
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Cost:</span>
                  <span className="text-lg">${buildPost.totalPrice}</span>
                </div>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle>About the Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={buildPost.author.avatar} />
                    <AvatarFallback>
                      {buildPost.author.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {buildPost.author.username}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {buildPost.author.followers.toLocaleString()} followers
                    </p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Follow
                </Button>
              </CardContent>
            </Card>

            {/* Related Builds */}
            <Card>
              <CardHeader>
                <CardTitle>More from {buildPost.author.username}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    title: "Silent Office Build",
                    price: 320,
                    image:
                      "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=200&h=150&fit=crop",
                  },
                  {
                    title: "Gaming Linear Setup",
                    price: 280,
                    image:
                      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=150&fit=crop",
                  },
                ].map((build, index) => (
                  <div
                    key={index}
                    className="flex space-x-3 cursor-pointer hover:bg-muted/50 rounded-lg p-2 transition-colors"
                  >
                    <div className="w-16 h-12 rounded bg-muted overflow-hidden">
                      <img
                        src={build.image}
                        alt={build.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{build.title}</p>
                      <p className="text-xs text-muted-foreground">
                        ${build.price}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <ReturnToTop />
    </div>
  );
}
