import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Mail, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "signin" | "signup";
  onModeChange: (mode: "signin" | "signup") => void;
}

export function AuthDialog({
  open,
  onOpenChange,
  mode,
  onModeChange,
}: AuthDialogProps) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { signIn } = useAuth();

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: API Integration - Authentication
      // Send OTP to email: POST /api/auth/send-otp
      // Request body: { email, type: mode }
      console.log(`Sending OTP to ${email} for ${mode}`);
      setEmailSent(true);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    signIn(provider);
    onOpenChange(false);
    // Reset form state
    setEmail("");
    setEmailSent(false);
  };

  const isSignUp = mode === "signup";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isSignUp ? "Create Account" : "Sign In"}</DialogTitle>
          <DialogDescription>
            {isSignUp
              ? "Join the keyboard community and start building."
              : "Welcome back! Sign in to your account."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* OAuth Options */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthLogin("google")}
            >
              <Mail className="h-4 w-4 mr-2" />
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthLogin("github")}
            >
              <Github className="h-4 w-4 mr-2" />
              Continue with GitHub
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthLogin("discord")}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Continue with Discord
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email OTP */}
          {!emailSent ? (
            <form onSubmit={handleEmailAuth} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                style={{ background: "var(--linearPrimarySecondary)" }}
              >
                Send verification code
              </Button>
            </form>
          ) : (
            <div className="space-y-3 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  We've sent a verification code to <strong>{email}</strong>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Check your email and click the link to{" "}
                  {isSignUp ? "create your account" : "sign in"}.
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEmailSent(false);
                  setEmail("");
                }}
              >
                Use different email
              </Button>
            </div>
          )}

          {/* Mode Toggle */}
          <div className="text-center text-sm">
            {isSignUp ? (
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => {
                    onModeChange("signin");
                    setEmailSent(false);
                    setEmail("");
                  }}
                >
                  Sign in
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => {
                    onModeChange("signup");
                    setEmailSent(false);
                    setEmail("");
                  }}
                >
                  Create account
                </button>
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
