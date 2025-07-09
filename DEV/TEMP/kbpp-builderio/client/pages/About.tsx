import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-muted-foreground">
            Learn more about our mission to transform the way developers build
            applications.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
