import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Story {
  id: string;
  imageUrl: string;
  duration?: number;
}

interface StoryViewerProps {
  stories: {
    userId: string;
    username: string;
    avatarUrl: string;
    stories: Story[];
  }[];
  initialUserIndex: number;
  initialStoryIndex: number;
  onClose: () => void;
}

export default function StoryViewer({ 
  stories, 
  initialUserIndex, 
  initialStoryIndex, 
  onClose 
}: StoryViewerProps) {
  const [currentUserIndex, setCurrentUserIndex] = useState(initialUserIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentUser = stories[currentUserIndex];
  const currentStory = currentUser?.stories[currentStoryIndex];
  const storyDuration = currentStory?.duration || 5000; // Default 5 seconds

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Move to next story or user
            if (currentStoryIndex < currentUser.stories.length - 1) {
              setCurrentStoryIndex(prev => prev + 1);
            } else if (currentUserIndex < stories.length - 1) {
              setCurrentUserIndex(prev => prev + 1);
              setCurrentStoryIndex(0);
            } else {
              onClose();
            }
            return 0;
          }
          return prev + (100 / (storyDuration / 100));
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [currentStoryIndex, currentUserIndex, isPaused, storyDuration]);

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
    } else if (currentUserIndex > 0) {
      setCurrentUserIndex(prev => prev - 1);
      setCurrentStoryIndex(stories[currentUserIndex - 1].stories.length - 1);
    }
    setProgress(0);
  };

  const handleNext = () => {
    if (currentStoryIndex < currentUser.stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else if (currentUserIndex < stories.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
      setCurrentStoryIndex(0);
    } else {
      onClose();
    }
    setProgress(0);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white z-50"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Story content */}
      <div className="relative w-full max-w-lg aspect-[9/16] bg-gray-900">
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 p-2">
          {currentUser?.stories.map((_, index) => (
            <div
              key={index}
              className="h-0.5 flex-1 bg-gray-600 overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: `${index === currentStoryIndex ? progress : index < currentStoryIndex ? '100' : '0'}%`
                }}
              />
            </div>
          ))}
        </div>

        {/* User info */}
        <div className="absolute top-4 left-0 right-0 z-50 flex items-center px-4 mt-4">
          <Avatar className="w-8 h-8 mr-2">
            <AvatarImage src={currentUser?.avatarUrl} />
            <AvatarFallback>{currentUser?.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-white font-semibold">{currentUser?.username}</span>
        </div>

        {/* Story image */}
        <img
          src={currentStory?.imageUrl}
          alt="Story"
          className="absolute inset-0 w-full h-full object-cover"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onMouseLeave={() => setIsPaused(false)}
        />

        {/* Navigation buttons */}
        <button
          className="absolute left-0 top-0 bottom-0 w-1/2 z-40"
          onClick={handlePrevious}
        />
        <button
          className="absolute right-0 top-0 bottom-0 w-1/2 z-40"
          onClick={handleNext}
        />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-50 opacity-50 hover:opacity-100"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-50 opacity-50 hover:opacity-100"
          onClick={handleNext}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}