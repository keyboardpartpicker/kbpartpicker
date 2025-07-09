import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Features</h1>
          <p className="text-xl text-muted-foreground">
            Discover all the powerful features that make Fusion the best
            development platform.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
