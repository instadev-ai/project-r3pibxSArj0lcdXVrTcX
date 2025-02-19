import { useEffect, useState } from "react";
import Post from "./Post";
import StoriesBar from "./StoriesBar";
import { useInView } from "react-intersection-observer";

interface PostData {
  id: string;
  username: string;
  avatarUrl: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: { username: string; text: string }[];
  timeAgo: string;
}

// Mock data for initial posts
const mockPosts: PostData[] = [
  {
    id: "1",
    username: "john_doe",
    avatarUrl: "https://github.com/shadcn.png",
    imageUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    caption: "Beautiful sunset at the beach! 🌅",
    likes: 1234,
    comments: [
      { username: "jane_smith", text: "Amazing shot! 😍" },
      { username: "photo_lover", text: "The colors are incredible!" }
    ],
    timeAgo: "2 hours ago"
  },
  {
    id: "2",
    username: "travel_enthusiast",
    avatarUrl: "https://github.com/shadcn.png",
    imageUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    caption: "Exploring new places ✈️",
    likes: 856,
    comments: [
      { username: "wanderlust", text: "Where is this?" },
      { username: "adventure_time", text: "Take me there! 🙌" }
    ],
    timeAgo: "4 hours ago"
  }
];

export default function Feed() {
  const [posts, setPosts] = useState<PostData[]>(mockPosts);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  // Simulate loading more posts when reaching the bottom
  useEffect(() => {
    if (inView) {
      // In a real app, this would be an API call
      const loadMorePosts = () => {
        const newPosts = [...posts, ...mockPosts.map(post => ({
          ...post,
          id: `${post.id}-${page}`
        }))];
        setPosts(newPosts);
        setPage(page + 1);
      };

      loadMorePosts();
    }
  }, [inView]);

  return (
    <div className="max-w-3xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <StoriesBar />
      
      <div className="space-y-6">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
      
      {/* Infinite scroll trigger */}
      <div ref={ref} className="h-10" />
    </div>
  );
}