import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle } from "lucide-react";

interface Story {
  id: string;
  username: string;
  avatarUrl: string;
  hasStory: boolean;
}

const mockStories: Story[] = [
  {
    id: "1",
    username: "your_story",
    avatarUrl: "https://github.com/shadcn.png",
    hasStory: false,
  },
  {
    id: "2",
    username: "john_doe",
    avatarUrl: "https://github.com/shadcn.png",
    hasStory: true,
  },
  {
    id: "3",
    username: "jane_smith",
    avatarUrl: "https://github.com/shadcn.png",
    hasStory: true,
  },
  // Add more mock stories as needed
];

export default function StoriesBar() {
  return (
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
          
          {mockStories.slice(1).map((story) => (
            <div key={story.id} className="flex flex-col items-center space-y-1">
              <Avatar className="w-16 h-16 border-2 border-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                <AvatarImage src={story.avatarUrl} />
                <AvatarFallback>{story.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-xs">{story.username}</span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}