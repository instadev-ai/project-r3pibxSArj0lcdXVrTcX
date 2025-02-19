import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle } from "lucide-react";
import StoryViewer from "./StoryViewer";

interface Story {
  id: string;
  imageUrl: string;
  duration?: number;
}

interface UserStory {
  userId: string;
  username: string;
  avatarUrl: string;
  hasUnreadStory: boolean;
  stories: Story[];
}

// Mock data for stories
const mockStories: UserStory[] = [
  {
    userId: "1",
    username: "your_story",
    avatarUrl: "https://github.com/shadcn.png",
    hasUnreadStory: false,
    stories: [],
  },
  {
    userId: "2",
    username: "john_doe",
    avatarUrl: "https://github.com/shadcn.png",
    hasUnreadStory: true,
    stories: [
      {
        id: "1",
        imageUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
        duration: 5000,
      },
      {
        id: "2",
        imageUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
        duration: 5000,
      },
    ],
  },
  {
    userId: "3",
    username: "jane_smith",
    avatarUrl: "https://github.com/shadcn.png",
    hasUnreadStory: true,
    stories: [
      {
        id: "1",
        imageUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
        duration: 5000,
      },
    ],
  },
];

export default function StoriesBar() {
  const [selectedStory, setSelectedStory] = useState<{
    userIndex: number;
    storyIndex: number;
  } | null>(null);

  const handleStoryClick = (userIndex: number) => {
    if (mockStories[userIndex].stories.length > 0) {
      setSelectedStory({ userIndex, storyIndex: 0 });
    }
  };

  return (
    <>
      <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-4 mb-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4">
            <div className="flex flex-col items-center space-y-1">
              <div className="relative">
                <Avatar className="w-16 h-16 border-2 border-white">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>YS</AvatarFallback>
                </Avatar>
                <PlusCircle className="absolute bottom-0 right-0 bg-white rounded-full text-blue-500 w-6 h-6" />
              </div>
              <span className="text-xs">Your Story</span>
            </div>
            
            {mockStories.slice(1).map((story, index) => (
              <button
                key={story.userId}
                className="flex flex-col items-center space-y-1"
                onClick={() => handleStoryClick(index + 1)}
              >
                <Avatar 
                  className={`w-16 h-16 ring-2 ${
                    story.hasUnreadStory
                      ? 'ring-gradient-to-tr from-pink-500 via-red-500 to-yellow-500'
                      : 'ring-gray-300'
                  } p-0.5 rounded-full`}
                >
                  <AvatarImage src={story.avatarUrl} />
                  <AvatarFallback>{story.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-xs">{story.username}</span>
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {selectedStory && (
        <StoryViewer
          stories={mockStories.filter(story => story.stories.length > 0)}
          initialUserIndex={selectedStory.userIndex - 1}
          initialStoryIndex={selectedStory.storyIndex}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </>
  );
}