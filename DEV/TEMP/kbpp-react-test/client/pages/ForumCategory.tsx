import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReturnToTop } from "@/components/ui/return-to-top";
import { Button } from "@/components/ui/button";
import { ForumTopicCard } from "@/components/ForumTopicCard";
import { ArrowLeft, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";

interface ForumTopic {
  id: string;
  title: string;
  author: string;
  avatar?: string;
  createdAt: string;
  lastReply: string;
  replies: number;
  likes: number;
  isPinned?: boolean;
  isLocked?: boolean;
}

// TODO: API Integration - Forum Category Data
// When database is implemented, replace static data with API calls:
// - GET /api/forum/categories/${categoryId} to fetch category info and topics
// - GET /api/forum/categories/${categoryId}/topics?page=1&limit=20 for pagination
// - Include real-time updates for new topics and replies
// - Handle loading states, error handling, and retry logic

const categoryData: Record<
  string,
  { name: string; description: string; topics: ForumTopic[] }
> = {
  "pre-purchase-advice": {
    name: "Pre-Purchase Advice",
    description:
      "Request feedback on part lists prior to committing to a build.",
    topics: [
      {
        id: "1",
        title: "First build - need advice on switch choice",
        author: "newbie_builder",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
        createdAt: "2h ago",
        lastReply: "1h ago",
        replies: 12,
        likes: 8,
        isPinned: true,
      },
      {
        id: "2",
        title: "Budget 60% build under $200 - feedback needed",
        author: "budget_keys",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b9734b42?w=100&h=100&fit=crop&crop=face",
        createdAt: "4h ago",
        lastReply: "2h ago",
        replies: 8,
        likes: 5,
      },
      {
        id: "3",
        title: "TKL vs 75% - help me decide",
        author: "layout_confused",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        createdAt: "6h ago",
        lastReply: "3h ago",
        replies: 15,
        likes: 12,
      },
    ],
  },
  // Add more categories as needed
};

export default function ForumCategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId ? categoryData[categoryId] : null;

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container pt-8 pb-24">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The forum category you're looking for doesn't exist.
            </p>
            <Link to="/forum">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Forum
              </Button>
            </Link>
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link to="/forum">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Forum
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{category.name}</h1>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          </div>
          <Button
            style={{ background: "var(--linearPrimarySecondary)" }}
            className="text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Topic
          </Button>
        </div>

        <div className="space-y-4">
          {category.topics.map((topic) => (
            <ForumTopicCard
              key={topic.id}
              id={topic.id}
              title={topic.title}
              author={topic.author}
              avatar={topic.avatar}
              createdAt={topic.createdAt}
              lastReply={topic.lastReply}
              replies={topic.replies}
              likes={topic.likes}
              isPinned={topic.isPinned}
              isLocked={topic.isLocked}
            />
          ))}
        </div>

        {category.topics.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No topics in this category yet.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Be the first to start a discussion!
            </p>
          </div>
        )}
      </main>
      <Footer />
      <ReturnToTop />
    </div>
  );
}
