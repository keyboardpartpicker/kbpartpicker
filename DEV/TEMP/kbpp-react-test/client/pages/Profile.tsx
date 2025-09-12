import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReturnToTop } from "@/components/ui/return-to-top";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  MapPin,
  Link as LinkIcon,
  Settings,
  Star,
  Eye,
  Lock,
  DollarSign,
  Wrench,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedAt: string;
  stats: {
    totalBuilds: number;
    publicBuilds: number;
    totalLikes: number;
    followers: number;
    following: number;
  };
}

interface Build {
  id: string;
  title: string;
  description?: string;
  totalPrice: number;
  thumbnail?: string;
  likes: number;
  comments: number;
  visibility: "private" | "unlisted" | "public";
  createdAt: string;
  layout?: string;
  switchType?: string;
}

interface SavedBuild {
  id: string;
  buildId: string;
  originalAuthor: string;
  authorAvatar?: string;
  title: string;
  description?: string;
  totalPrice: number;
  thumbnail?: string;
  likes: number;
  comments: number;
  visibility: "private" | "unlisted" | "public";
  createdAt: string;
  savedAt: string;
  layout?: string;
  switchType?: string;
}

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [yourBuilds, setYourBuilds] = useState<Build[]>([]);
  const [savedBuilds, setSavedBuilds] = useState<SavedBuild[]>([]);
  const [featuredBuilds, setFeaturedBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("featured");

  const isOwnProfile = currentUser && profile && currentUser.name.toLowerCase().replace(/\s+/g, '') === username;

  useEffect(() => {
    // TODO: API Integration - Fetch User Profile
    // When database is implemented, replace with actual API calls:
    // - GET /api/users/${username} to fetch user profile
    // - GET /api/users/${username}/builds?type=featured for featured builds
    // - GET /api/users/${username}/builds?type=saved for saved builds (only if own profile)
    // - Handle loading states, error handling, and 404 cases

    const fetchProfile = async () => {
      try {
        // Mock profile data
        const mockProfile: UserProfile = {
          id: "user-123",
          username: username || "testuser",
          displayName: "Test User",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          bio: "Keyboard enthusiast and mechanical switch collector. Building custom keyboards since 2020.",
          website: "https://example.com",
          joinedAt: "2023-01-15T00:00:00Z",
          stats: {
            totalBuilds: 12,
            publicBuilds: 8,
            totalLikes: 247,
            followers: 89,
            following: 156,
          },
        };

        const mockFeaturedBuilds: Build[] = [
          {
            id: "build-1",
            title: "Midnight Tactile Dream",
            description: "A sleek 65% build with Holy Panda switches",
            totalPrice: 485.50,
            thumbnail: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
            likes: 127,
            comments: 24,
            visibility: "public",
            createdAt: "2024-01-15T10:30:00Z",
            layout: "65%",
            switchType: "Tactile",
          },
          {
            id: "build-2",
            title: "Linear Gaming Beast",
            description: "High-performance linear switches for gaming",
            totalPrice: 320.75,
            thumbnail: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
            likes: 89,
            comments: 15,
            visibility: "public",
            createdAt: "2024-01-10T09:15:00Z",
            layout: "TKL",
            switchType: "Linear",
          },
        ];

        const mockYourBuilds: Build[] = isOwnProfile ? [
          ...mockFeaturedBuilds,
          {
            id: "build-3",
            title: "Work in Progress",
            description: "Experimenting with new switch combinations",
            totalPrice: 175.25,
            thumbnail: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=400&h=300&fit=crop",
            likes: 0,
            comments: 0,
            visibility: "private",
            createdAt: "2024-01-05T16:20:00Z",
            layout: "60%",
            switchType: "Tactile",
          },
        ] : [];

        const mockSavedBuilds: SavedBuild[] = isOwnProfile ? [
          {
            id: "saved-1",
            buildId: "build-external-1",
            originalAuthor: "KeyboardMaster",
            authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            title: "Ultimate Gaming Build",
            description: "Perfect for competitive gaming with linear switches",
            totalPrice: 650.00,
            thumbnail: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
            likes: 256,
            comments: 42,
            visibility: "public",
            createdAt: "2024-01-20T14:00:00Z",
            savedAt: "2024-01-21T09:30:00Z",
            layout: "TKL",
            switchType: "Linear",
          },
          {
            id: "saved-2",
            buildId: "build-external-2",
            originalAuthor: "TyperPro",
            authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            title: "Silent Office Setup",
            description: "Quiet tactile build perfect for office environments",
            totalPrice: 420.75,
            thumbnail: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
            likes: 189,
            comments: 28,
            visibility: "public",
            createdAt: "2024-01-18T11:45:00Z",
            savedAt: "2024-01-19T16:20:00Z",
            layout: "65%",
            switchType: "Tactile",
          },
        ] : [];

        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfile(mockProfile);
        setFeaturedBuilds(mockFeaturedBuilds);
        setYourBuilds(mockYourBuilds);
        setSavedBuilds(mockSavedBuilds);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, isOwnProfile]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "private":
        return <Lock className="h-3 w-3" />;
      case "unlisted":
        return <Eye className="h-3 w-3 opacity-50" />;
      case "public":
        return <Eye className="h-3 w-3" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container pt-8 pb-24">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container pt-8 pb-24">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The profile you're looking for doesn't exist.
            </p>
            <Link to="/">
              <Button>Back to Home</Button>
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
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatar} alt={profile.displayName} />
              <AvatarFallback className="text-2xl">
                {profile.displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold">{profile.displayName}</h1>
                  <p className="text-muted-foreground">@{profile.username}</p>
                </div>
                {isOwnProfile && (
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>

              {profile.bio && (
                <p className="text-foreground mb-4 max-w-2xl">{profile.bio}</p>
              )}

              <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                {profile.website && (
                  <div className="flex items-center space-x-1">
                    <LinkIcon className="h-4 w-4" />
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {profile.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {formatDate(profile.joinedAt)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  <span className="font-semibold">{profile.stats.publicBuilds}</span>
                  <span className="text-muted-foreground">builds</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold">{profile.stats.totalLikes}</span>
                  <span className="text-muted-foreground">likes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold">{profile.stats.followers}</span>
                  <span className="text-muted-foreground">followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold">{profile.stats.following}</span>
                  <span className="text-muted-foreground">following</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Builds Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={`grid w-full ${isOwnProfile ? 'grid-cols-3' : 'grid-cols-1'}`}>
            <TabsTrigger value="featured" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Featured Builds</span>
            </TabsTrigger>
            {isOwnProfile && (
              <>
                <TabsTrigger value="your-builds" className="flex items-center space-x-2">
                  <Wrench className="h-4 w-4" />
                  <span>Your Builds</span>
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>Saved Builds</span>
                </TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="featured" className="mt-6">
            {featuredBuilds.length === 0 ? (
              <div className="text-center py-12">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No featured builds</h3>
                <p className="text-muted-foreground">
                  {isOwnProfile 
                    ? "Share your builds with the community to feature them here."
                    : "This user hasn't featured any builds yet."
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredBuilds.map((build) => (
                  <BuildCard key={build.id} build={build} showVisibility={isOwnProfile} />
                ))}
              </div>
            )}
          </TabsContent>

          {isOwnProfile && (
            <>
              <TabsContent value="your-builds" className="mt-6">
                {yourBuilds.length === 0 ? (
                  <div className="text-center py-12">
                    <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No builds yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start creating your first keyboard build.
                    </p>
                    <Link to="/builder">
                      <Button
                        style={{ background: "var(--linearPrimarySecondary)" }}
                        className="text-white"
                      >
                        Create Build
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {yourBuilds.map((build) => (
                      <BuildCard key={build.id} build={build} showVisibility={true} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="saved" className="mt-6">
                {savedBuilds.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No saved builds</h3>
                    <p className="text-muted-foreground">
                      Builds you save from other users will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedBuilds.map((build) => (
                      <SavedBuildCard key={build.id} build={build} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </main>
      <Footer />
      <ReturnToTop />
    </div>
  );
}

interface BuildCardProps {
  build: Build;
  showVisibility?: boolean;
}

function BuildCard({ build, showVisibility = false }: BuildCardProps) {
  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "private":
        return <Lock className="h-3 w-3 text-gray-600" />;
      case "unlisted":
        return <Eye className="h-3 w-3 text-yellow-600 opacity-70" />;
      case "public":
        return <Eye className="h-3 w-3 text-green-600" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {build.thumbnail && (
        <div className="relative">
          <img
            src={build.thumbnail}
            alt={build.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="bg-black/70 text-white border-0"
            >
              <DollarSign className="h-3 w-3 mr-1" />
              {build.totalPrice.toFixed(0)}
            </Badge>
            {showVisibility && (
              <Badge
                variant="secondary"
                className="bg-black/70 text-white border-0"
              >
                {getVisibilityIcon(build.visibility)}
              </Badge>
            )}
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-1">{build.title}</CardTitle>
        {build.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {build.description}
          </p>
        )}
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {(build.layout || build.switchType) && (
            <div className="flex items-center space-x-2">
              {build.layout && (
                <Badge variant="outline" className="text-xs">
                  {build.layout}
                </Badge>
              )}
              {build.switchType && (
                <Badge variant="secondary" className="text-xs">
                  {build.switchType}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{build.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{build.comments}</span>
              </div>
            </div>
            <span className="font-semibold text-primary">
              ${build.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface SavedBuildCardProps {
  build: SavedBuild;
}

function SavedBuildCard({ build }: SavedBuildCardProps) {
  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "private":
        return <Lock className="h-3 w-3 text-gray-600" />;
      case "unlisted":
        return <Eye className="h-3 w-3 text-yellow-600 opacity-70" />;
      case "public":
        return <Eye className="h-3 w-3 text-green-600" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {build.thumbnail && (
        <div className="relative">
          <img
            src={build.thumbnail}
            alt={build.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="bg-black/70 text-white border-0"
            >
              <DollarSign className="h-3 w-3 mr-1" />
              {build.totalPrice.toFixed(0)}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-black/70 text-white border-0"
            >
              {getVisibilityIcon(build.visibility)}
            </Badge>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-1">{build.title}</CardTitle>
        {build.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {build.description}
          </p>
        )}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Avatar className="h-5 w-5">
            <AvatarImage src={build.authorAvatar} alt={build.originalAuthor} />
            <AvatarFallback className="text-xs">
              {build.originalAuthor.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>by {build.originalAuthor}</span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {(build.layout || build.switchType) && (
            <div className="flex items-center space-x-2">
              {build.layout && (
                <Badge variant="outline" className="text-xs">
                  {build.layout}
                </Badge>
              )}
              {build.switchType && (
                <Badge variant="secondary" className="text-xs">
                  {build.switchType}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{build.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{build.comments}</span>
              </div>
            </div>
            <span className="font-semibold text-primary">
              ${build.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
