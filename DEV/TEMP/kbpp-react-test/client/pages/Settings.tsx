import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReturnToTop } from "@/components/ui/return-to-top";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Camera,
  Mail,
  Phone,
  Link as LinkIcon,
  Upload,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotificationHelpers } from "@/components/ClientNotifications";

interface NotificationSettings {
  email: {
    comments: boolean;
    likes: boolean;
    follows: boolean;
    buildSaves: boolean;
    systemUpdates: boolean;
    weeklyDigest: boolean;
  };
  push: {
    comments: boolean;
    likes: boolean;
    follows: boolean;
    buildSaves: boolean;
  };
}

export default function Settings() {
  const { user } = useAuth();
  const { notifySuccess, notifyError } = useNotificationHelpers();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({
    displayName: user?.name || "",
    email: user?.email || "",
    bio: "",
    website: "",
    phone: "",
  });
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: {
      comments: true,
      likes: true,
      follows: true,
      buildSaves: true,
      systemUpdates: true,
      weeklyDigest: false,
    },
    push: {
      comments: true,
      likes: false,
      follows: true,
      buildSaves: true,
    },
  });

  const handleProfileSave = () => {
    // TODO: API Integration - Update User Profile
    // When database is implemented, add API call:
    // - PUT /api/users/profile with updated profile data
    // - Handle validation and error responses
    // - Update authentication context with new data

    console.log("Saving profile:", profileForm);
    notifySuccess("Profile updated successfully");
  };

  const handleNotificationSave = () => {
    // TODO: API Integration - Update Notification Preferences
    // When database is implemented, add API call:
    // - PUT /api/users/notifications with notification settings
    // - Handle validation and error responses

    console.log("Saving notification settings:", notificationSettings);
    notifySuccess("Notification preferences updated");
  };

  const handleAvatarChange = () => {
    // TODO: API Integration - Upload Avatar
    // When database is implemented, add functionality to:
    // - Handle file upload with proper validation
    // - POST /api/users/avatar with form data
    // - Update user context with new avatar URL
    
    console.log("Avatar upload not yet implemented");
    notifyError("Avatar upload coming soon");
  };

  const updateNotificationSetting = (
    category: keyof NotificationSettings,
    setting: string,
    value: boolean
  ) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container pt-8 pb-24">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
            <p className="text-muted-foreground">
              You need to be signed in to access settings.
            </p>
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Appearance</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xl">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Button variant="outline" onClick={handleAvatarChange}>
                        <Camera className="h-4 w-4 mr-2" />
                        Change Avatar
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={profileForm.displayName}
                        onChange={(e) =>
                          setProfileForm(prev => ({ ...prev, displayName: e.target.value }))
                        }
                        placeholder="Your display name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={profileForm.email}
                          onChange={(e) =>
                            setProfileForm(prev => ({ ...prev, email: e.target.value }))
                          }
                          className="pl-10"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="website"
                          type="url"
                          value={profileForm.website}
                          onChange={(e) =>
                            setProfileForm(prev => ({ ...prev, website: e.target.value }))
                          }
                          className="pl-10"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) =>
                            setProfileForm(prev => ({ ...prev, phone: e.target.value }))
                          }
                          className="pl-10"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileForm.bio}
                      onChange={(e) =>
                        setProfileForm(prev => ({ ...prev, bio: e.target.value }))
                      }
                      placeholder="Tell us about yourself and your keyboard journey..."
                      className="min-h-[100px]"
                    />
                    <p className="text-sm text-muted-foreground">
                      {profileForm.bio.length}/500 characters
                    </p>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleProfileSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-comments">Comments on your builds</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone comments on your builds
                          </p>
                        </div>
                        <Switch
                          id="email-comments"
                          checked={notificationSettings.email.comments}
                          onCheckedChange={(value) =>
                            updateNotificationSetting("email", "comments", value)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-likes">Likes on your builds</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone likes your builds
                          </p>
                        </div>
                        <Switch
                          id="email-likes"
                          checked={notificationSettings.email.likes}
                          onCheckedChange={(value) =>
                            updateNotificationSetting("email", "likes", value)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-follows">New followers</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone follows you
                          </p>
                        </div>
                        <Switch
                          id="email-follows"
                          checked={notificationSettings.email.follows}
                          onCheckedChange={(value) =>
                            updateNotificationSetting("email", "follows", value)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-saves">Build saves</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone saves your builds
                          </p>
                        </div>
                        <Switch
                          id="email-saves"
                          checked={notificationSettings.email.buildSaves}
                          onCheckedChange={(value) =>
                            updateNotificationSetting("email", "buildSaves", value)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-system">System updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Important updates about the platform
                          </p>
                        </div>
                        <Switch
                          id="email-system"
                          checked={notificationSettings.email.systemUpdates}
                          onCheckedChange={(value) =>
                            updateNotificationSetting("email", "systemUpdates", value)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-digest">Weekly digest</Label>
                          <p className="text-sm text-muted-foreground">
                            Weekly summary of activity and trending builds
                          </p>
                        </div>
                        <Switch
                          id="email-digest"
                          checked={notificationSettings.email.weeklyDigest}
                          onCheckedChange={(value) =>
                            updateNotificationSetting("email", "weeklyDigest", value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-comments">Comments on your builds</Label>
                          <p className="text-sm text-muted-foreground">
                            Instant notifications for new comments
                          </p>
                        </div>
                        <Switch
                          id="push-comments"
                          checked={notificationSettings.push.comments}
                          onCheckedChange={(value) =>
                            updateNotificationSetting("push", "comments", value)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-likes">Likes on your builds</Label>
                          <p className="text-sm text-muted-foreground">
                            Instant notifications for new likes
                          </p>
                        </div>
                        <Switch
                          id="push-likes"
                          checked={notificationSettings.push.likes}
                          onCheckedChange={(value) =>
                            updateNotificationSetting("push", "likes", value)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-follows">New followers</Label>
                          <p className="text-sm text-muted-foreground">
                            Instant notifications for new followers
                          </p>
                        </div>
                        <Switch
                          id="push-follows"
                          checked={notificationSettings.push.follows}
                          onCheckedChange={(value) =>
                            updateNotificationSetting("push", "follows", value)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-saves">Build saves</Label>
                          <p className="text-sm text-muted-foreground">
                            Instant notifications when someone saves your builds
                          </p>
                        </div>
                        <Switch
                          id="push-saves"
                          checked={notificationSettings.push.buildSaves}
                          onCheckedChange={(value) =>
                            updateNotificationSetting("push", "buildSaves", value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button onClick={handleNotificationSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">
                          Make your profile visible to other users
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Build Activity</Label>
                        <p className="text-sm text-muted-foreground">
                          Display your recent build activity on your profile
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow Direct Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Let other users send you direct messages
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Data Analytics</Label>
                        <p className="text-sm text-muted-foreground">
                          Help improve the platform with anonymous usage data
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Management</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Upload className="h-4 w-4 mr-2" />
                        Export Your Data
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                        <Shield className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Theme Preference</Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        Choose your preferred color scheme
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-primary">
                          <div className="w-full h-16 bg-background border rounded mb-2"></div>
                          <p className="text-sm font-medium text-center">Light</p>
                        </div>
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-primary border-primary">
                          <div className="w-full h-16 bg-gradient-to-br from-background to-muted border rounded mb-2"></div>
                          <p className="text-sm font-medium text-center">System</p>
                        </div>
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-primary">
                          <div className="w-full h-16 bg-gray-900 border rounded mb-2"></div>
                          <p className="text-sm font-medium text-center">Dark</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Compact Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Use a more compact interface layout
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Animations</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable smooth animations and transitions
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <ReturnToTop />
    </div>
  );
}
