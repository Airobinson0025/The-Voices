import React from "react";
import {
  CalendarDays,
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

const JournalEntryCard = () => {
  // Fake data for the example card
  const entry = {
    id: "1",
    title: "Finding Peace in Small Moments",
    excerpt:
      "Today I realized how much the little things matter. The way sunlight filters through leaves, the sound of rain on the roof, a stranger's smile. These moments are so easily missed, yet they're what make life beautiful...",
    createdAt: "2025-03-25T14:30:00Z",
    mood: "Reflective",
    isPublished: true,
    isAnonymous: true,
    likeCount: 24,
    commentCount: 7,
    bookmarkCount: 3,
    tags: ["Mindfulness", "Gratitude"],
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          {/* Card header with publishing status and menu */}
          <div className="px-4 pt-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  entry.isPublished ? "bg-green-500" : "bg-amber-500"
                }`}
              ></span>
              <span className="text-xs text-muted-foreground font-medium">
                {entry.isPublished ? "Published" : "Draft"}
              </span>
            </div>
            <button className="text-muted-foreground hover:text-foreground rounded-full p-1">
              <MoreHorizontal size={16} />
            </button>
          </div>

          {/* Card body */}
          <div className="p-4">
            <h3 className="font-heading text-lg font-medium mb-2">
              {entry.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {entry.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                {entry.mood}
              </span>
            </div>

            {/* Entry metadata and engagement */}
            <div className="flex items-center justify-between pt-3 border-t text-muted-foreground">
              <div className="flex items-center gap-1 text-xs">
                <CalendarDays size={14} className="mr-1" />
                {formatDate(entry.createdAt)}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Heart size={14} className="text-muted-foreground" />
                  <span className="text-xs">{entry.likeCount}</span>
                </div>

                <div className="flex items-center gap-1">
                  <MessageCircle size={14} className="text-muted-foreground" />
                  <span className="text-xs">{entry.commentCount}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Bookmark size={14} className="text-muted-foreground" />
                  <span className="text-xs">{entry.bookmarkCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalEntryCard;
