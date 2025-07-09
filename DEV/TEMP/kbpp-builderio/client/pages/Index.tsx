import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  Wrench,
  Layout,
  TrendingUp,
  MessageCircle,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Wrench,
    title: "Builder",
    description:
      "The ultimate parts configurator for assembling and customizing keyboard builds. Mix and match components to create your perfect setup.",
    href: "/builder",
  },
  {
    icon: Layout,
    title: "Builds",
    description:
      "A showcase hub for finalized builds, featuring sound tests, photos, and comprehensive user-generated build guides from the community.",
    href: "/builds",
  },
  {
    icon: TrendingUp,
    title: "Pulse",
    description:
      "Real-time analytics dashboard for monitoring price trends and group buy status across the entire keyboard ecosystem.",
    href: "/pulse",
  },
  {
    icon: MessageCircle,
    title: "Forum",
    description:
      "Dedicated discussion space for builds, components, troubleshooting, and general community chatter with fellow keyboard enthusiasts.",
    href: "/forum",
  },
];

const stats = [
  { value: "100+", label: "Retailers supported" },
  { value: "1M+", label: "Parts tracked" },
  { value: "50+", label: "Live group buys tracked" },
  { value: "400", label: "Active community members" },
];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Your keyboard journey with{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  background: "var(--linearPrimarySecondary)",
                  backgroundClip: "text",
                }}
              >
                KBPartPicker
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              The ultimate platform for keyboard enthusiasts. Build, showcase,
              track, and discuss everything about mechanical keyboards in one
              place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                style={{ background: "var(--linearPrimarySecondary)" }}
                className="hover:opacity-90 transition-opacity text-lg px-8"
                asChild
              >
                <Link to="/builder">
                  Start Your Build
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                asChild
              >
                <Link to="/builds">Explore Builds</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section
          className="py-24"
          style={{ backgroundColor: "hsl(220 8% 9%)" }}
        >
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything you need for your keyboard journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful tools designed to help you build, showcase, and connect
                with the mechanical keyboard community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <Link key={feature.title} to={feature.href}>
                  <Card className="border-0 shadow-sm bg-background hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-md"
                          style={{
                            background: "var(--linearPrimarySecondary)",
                          }}
                        >
                          <feature.icon className="h-5 w-5 text-white" />
                        </div>
                        <CardTitle className="text-xl">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-24"
          style={{ background: "var(--linearPrimarySecondary)" }}
        >
          <div className="container text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Build Smarter. Sound Better. Track Everything.
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Take the guesswork out of custom keyboards with our intelligent
                Builder, featuring sound profile predictions and automatic part
                compatibility checks. Show off your masterpiece in our Builds hub,
                stay in sync with the community using Pulse, our real-time
                analytics dashboard, and dive into the Forum to trade insights,
                troubleshoot, and spark ideas.
              </p>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8"
                  asChild
                >
                  <Link to="/builder">
                    Start Your Build
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
