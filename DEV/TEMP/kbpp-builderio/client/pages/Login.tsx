import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container pt-8 pb-24">
        <h1 className="text-4xl font-bold mb-12">Sign In</h1>
        <div className="text-center">
          <p className="text-xl text-muted-foreground">
            Sign in to your account to access your builds and community
            features.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
