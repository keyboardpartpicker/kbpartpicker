import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container pt-8 pb-24">
        <h1 className="text-4xl font-bold mb-12">Get Started</h1>
        <div className="text-center">
          <p className="text-xl text-muted-foreground">
            Create your account to start building custom keyboards and join the
            community.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
