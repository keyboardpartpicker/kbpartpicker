import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Users, Clock, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  posts: number;
  topics: number;
  lastPost?: {
    title: string;
    author: string;
    timestamp: string;
    avatar?: string;
  };
}

interface ForumSectionProps {
  icon: LucideIcon;
  title: string;
  categories: ForumCategory[];
}

export function ForumSection({
  icon: Icon,
  title,
  categories,
}: ForumSectionProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader
        className="pb-4"
        style={{ backgroundColor: "hsl(220 8% 15%)" }}
      >
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y" style={{ borderColor: "hsl(220 8% 20%)" }}>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/forum/category/${category.id}`}
              className="block hover:bg-muted/50 transition-colors"
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-foreground text-sm">
                        {category.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {category.posts}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          {category.topics}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {category.lastPost && (
                    <div className="ml-4 text-right min-w-0 max-w-xs">
                      <div className="text-xs text-muted-foreground truncate mb-1">
                        {category.lastPost.title}
                      </div>
                      <div className="flex items-center justify-end space-x-2">
                        <Avatar className="h-4 w-4">
                          <AvatarImage
                            src={category.lastPost.avatar}
                            alt={category.lastPost.author}
                          />
                          <AvatarFallback className="text-xs">
                            {category.lastPost.author.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-xs text-muted-foreground">
                          <div>{category.lastPost.author}</div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{category.lastPost.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
