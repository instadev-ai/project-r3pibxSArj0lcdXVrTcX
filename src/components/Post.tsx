import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

interface PostProps {
  username: string;
  avatarUrl: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: { username: string; text: string }[];
  timeAgo: string;
}

export default function Post({ username, avatarUrl, imageUrl, caption, likes, comments, timeAgo }: PostProps) {
  return (
    <Card className="max-w-3xl mx-auto mb-6">
      <CardHeader className="flex flex-row items-center space-x-4 p-4">
        <Avatar className="w-8 h-8">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{username}</span>
      </CardHeader>
      
      <CardContent className="p-0">
        <img 
          src={imageUrl} 
          alt={`${username}'s post`} 
          className="w-full h-auto"
        />
      </CardContent>
      
      <CardFooter className="flex flex-col p-4">
        <div className="flex justify-between w-full mb-4">
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="hover:text-red-500">
              <Heart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <Bookmark className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="w-full">
          <p className="font-semibold mb-1">{likes.toLocaleString()} likes</p>
          <p>
            <span className="font-semibold">{username}</span>{" "}
            {caption}
          </p>
          {comments.length > 0 && (
            <div className="mt-2 text-sm text-gray-500">
              <p>View all {comments.length} comments</p>
              {comments.slice(0, 2).map((comment, index) => (
                <p key={index}>
                  <span className="font-semibold">{comment.username}</span>{" "}
                  {comment.text}
                </p>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-500 mt-2">{timeAgo}</p>
        </div>
      </CardFooter>
    </Card>
  );
}