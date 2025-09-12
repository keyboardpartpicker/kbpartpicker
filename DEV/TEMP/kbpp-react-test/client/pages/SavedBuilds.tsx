import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ReturnToTop } from "@/components/ui/return-to-top";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  MoreHorizontal,
  Edit,
  Share2,
  Trash2,
  DollarSign,
  Calendar,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SavedBuild {
  id: string;
  title: string;
  description?: string;
  totalPrice: number;
  partCount: number;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  thumbnail?: string;
  layout?: string;
  switchType?: string;
}

export default function SavedBuilds() {
  const [builds, setBuilds] = useState<SavedBuild[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [buildToDelete, setBuildToDelete] = useState<SavedBuild | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: API Integration - Fetch Saved Builds
    // When database is implemented, replace with actual API call:
    // - GET /api/user/builds to fetch user's saved builds
    // - Include pagination for large numbers of builds
    // - Handle loading states, error handling, and retry logic
    // - Add real-time updates when builds are modified

    const mockBuilds: SavedBuild[] = [
      {
        id: "build-1",
        title: "Daily Driver 65%",
        description: "My main keyboard for work and gaming",
        totalPrice: 485.50,
        partCount: 8,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T14:45:00Z",
        isPublic: true,
        layout: "65%",
        switchType: "Tactile",
        thumbnail: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
      },
      {
        id: "build-2",
        title: "Budget Linear Build",
        description: "Affordable linear switch build under $200",
        totalPrice: 175.25,
        partCount: 6,
        createdAt: "2024-01-10T09:15:00Z",
        updatedAt: "2024-01-10T09:15:00Z",
        isPublic: false,
        layout: "60%",
        switchType: "Linear",
        thumbnail: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
      },
      {
        id: "build-3",
        title: "Clicky Office Board",
        description: "Blue switches for maximum satisfaction",
        totalPrice: 320.75,
        partCount: 7,
        createdAt: "2024-01-05T16:20:00Z",
        updatedAt: "2024-01-12T11:30:00Z",
        isPublic: true,
        layout: "TKL",
        switchType: "Clicky",
        thumbnail: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=400&h=300&fit=crop",
      },
    ];

    setTimeout(() => {
      setBuilds(mockBuilds);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEditBuild = (buildId: string) => {
    // TODO: API Integration - Load Build in Builder
    // When implemented, add functionality to:
    // - GET /api/builds/${buildId} to fetch build details
    // - Load build data into BuildContext
    // - Navigate to /builder with loaded build
    console.log("Edit build:", buildId);
  };

  const handleShareBuild = (build: SavedBuild) => {
    // TODO: API Integration - Share Build
    // When implemented, add functionality to:
    // - POST /api/builds/${build.id}/share to generate share link
    // - Copy share URL to clipboard
    // - Show success toast notification
    // - Update build visibility settings
    console.log("Share build:", build.id);
  };

  const handleDeleteBuild = (build: SavedBuild) => {
    setBuildToDelete(build);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteBuild = () => {
    if (buildToDelete) {
      // TODO: API Integration - Delete Build
      // When implemented, add API call:
      // - DELETE /api/builds/${buildToDelete.id}
      // - Remove build from local state
      // - Show success notification
      setBuilds(builds.filter(b => b.id !== buildToDelete.id));
      setBuildToDelete(null);
      setDeleteDialogOpen(false);
      console.log("Deleted build:", buildToDelete.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container pt-8 pb-24">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading your builds...</p>
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
        <PageHeader
          title="Saved Builds"
          description="Manage your keyboard configurations and builds"
          action={
            <Link to="/builder">
              <Button
                style={{ background: "var(--linearPrimarySecondary)" }}
                className="text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Build
              </Button>
            </Link>
          }
        />

        {builds.length === 0 ? (
          <div className="text-center py-12">
            <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No builds yet</h3>
            <p className="text-muted-foreground mb-6">
              Start building your first keyboard configuration
            </p>
            <Link to="/builder">
              <Button
                style={{ background: "var(--linearPrimarySecondary)" }}
                className="text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Build
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {builds.map((build) => (
              <Card key={build.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                      {build.isPublic && (
                        <Badge variant="secondary" className="bg-green-600/80 text-white border-0">
                          Public
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg line-clamp-1">
                        {build.title}
                      </CardTitle>
                      {build.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {build.description}
                        </p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditBuild(build.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Build
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShareBuild(build)}>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share Build
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteBuild(build)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Build
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Parts:</span>
                      <span className="font-medium">{build.partCount} components</span>
                    </div>
                    
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

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Updated {formatDate(build.updatedAt)}</span>
                      </div>
                      <span className="font-semibold text-primary">
                        ${build.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Build</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{buildToDelete?.title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDeleteBuild}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Build
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
      <Footer />
      <ReturnToTop />
    </div>
  );
}
