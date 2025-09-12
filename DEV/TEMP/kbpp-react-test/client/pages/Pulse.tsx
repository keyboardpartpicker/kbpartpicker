import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ReturnToTop } from "@/components/ui/return-to-top";

export default function Pulse() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container pt-8 pb-24">
        <PageHeader
          title="Pulse"
          description="A real-time analytics dashboard for monitoring price trends and group buy status across the keyboard ecosystem. Stay informed on market movements."
        />
        <div className="text-center">
          <p className="text-muted-foreground">
            Analytics dashboard content will be displayed here.
          </p>
        </div>
      </main>
      <Footer />
      <ReturnToTop />
    </div>
  );
}
