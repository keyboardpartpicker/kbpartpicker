import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Save, Lock, Eye, EyeOff } from "lucide-react";

type BuildVisibility = "private" | "unlisted" | "public";

interface SaveBuildDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTitle?: string;
  onSave: (data: {
    title: string;
    description: string;
    visibility: BuildVisibility;
  }) => void;
}

export function SaveBuildDialog({
  open,
  onOpenChange,
  currentTitle = "",
  onSave,
}: SaveBuildDialogProps) {
  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<BuildVisibility>("private");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;

    setIsLoading(true);
    
    // TODO: API Integration - Save Build
    // When database is implemented, replace with actual API call:
    // - POST /api/builds with build data, title, description, and visibility
    // - Include user authentication and validation
    // - Handle image uploads for build thumbnails
    // - Generate shareable URLs for public/unlisted builds
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSave({
        title: title.trim(),
        description: description.trim(),
        visibility,
      });
      onOpenChange(false);
      // Reset form
      setTitle("");
      setDescription("");
      setVisibility("private");
    } catch (error) {
      console.error("Error saving build:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getVisibilityInfo = (vis: BuildVisibility) => {
    switch (vis) {
      case "private":
        return {
          icon: <Lock className="h-4 w-4" />,
          label: "Private",
          description: "Only you can see this build",
          color: "text-gray-600",
        };
      case "unlisted":
        return {
          icon: <EyeOff className="h-4 w-4" />,
          label: "Unlisted",
          description: "Anyone with the link can view",
          color: "text-yellow-600",
        };
      case "public":
        return {
          icon: <Eye className="h-4 w-4" />,
          label: "Public",
          description: "Visible to everyone in the community",
          color: "text-green-600",
        };
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Save className="h-5 w-5" />
            <span>Save Build</span>
          </DialogTitle>
          <DialogDescription>
            Save your keyboard configuration and choose how to share it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Build Title</Label>
            <Input
              id="title"
              placeholder="My Awesome Keyboard Build"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">
              {title.length}/100 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe your build, components, or inspiration..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              className="min-h-[80px]"
            />
            <p className="text-xs text-muted-foreground">
              {description.length}/500 characters
            </p>
          </div>

          <div className="space-y-3">
            <Label>Visibility</Label>
            <Select value={visibility} onValueChange={(value: BuildVisibility) => setVisibility(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-gray-600" />
                    <span>Private</span>
                  </div>
                </SelectItem>
                <SelectItem value="unlisted">
                  <div className="flex items-center space-x-2">
                    <EyeOff className="h-4 w-4 text-yellow-600" />
                    <span>Unlisted</span>
                  </div>
                </SelectItem>
                <SelectItem value="public">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-green-600" />
                    <span>Public</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <span className={getVisibilityInfo(visibility).color}>
                  {getVisibilityInfo(visibility).icon}
                </span>
                <Badge variant="outline" className={getVisibilityInfo(visibility).color}>
                  {getVisibilityInfo(visibility).label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {getVisibilityInfo(visibility).description}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim() || isLoading}
            style={{ background: "var(--linearPrimarySecondary)" }}
            className="text-white"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>Saving...</span>
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Build
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
