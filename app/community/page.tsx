"use client";

import { useState, type FormEvent, type FC } from "react";
import { HeartIcon, MessageCircleIcon, Share2Icon } from "@/components/Icons";

type Post = {
  id: number;
  author: {
    name: string;
    handle: string;
    avatarColor: string;
  };
  content: string;
  timestamp: string;
};

const initialPosts: Post[] = [
  {
    id: 1,
    author: {
      name: "Elena Vox",
      handle: "@elenavox",
      avatarColor: "bg-purple-500",
    },
    content: "Just pushed the final designs for Project Nova. The launch is getting so close I can taste it! So excited to share this with you all. #gamedev #design",
    timestamp: "2h ago",
  },
  {
    id: 2,
    author: {
      name: "Sam K.",
      handle: "@samk_dev",
      avatarColor: "bg-sky-500",
    },
    content: "Debugging a tricky state management issue in the new creator dashboard. It's moments like these that make the final product feel so rewarding. Almost there!",
    timestamp: "5h ago",
  },
  {
    id: 3,
    author: {
      name: "Aisha Labs",
      handle: "@aishalabs",
      avatarColor: "bg-emerald-500",
    },
    content: "Beta feedback has been incredible. Thank you to our early adopters for the detailed insights. We're already implementing some of your suggestions for V1.",
    timestamp: "1d ago",
  },
];

const UserAvatar = ({ author }: { author: Post["author"] }) => (
  <div
    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${author.avatarColor} font-bold text-white`}
  >
    {author.name.charAt(0)}
  </div>
);

// FIX: Explicitly type PostCard as a React.FC to resolve incorrect 'key' prop error.
const PostCard: FC<{ post: Post }> = ({ post }) => (
  <article className="animate-fade-in flex gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-inner shadow-black/10">
    <UserAvatar author={post.author} />
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-baseline gap-2">
        <span className="font-semibold text-neutral-50">{post.author.name}</span>
        <span className="text-sm text-neutral-400">{post.author.handle}</span>
        <span className="text-sm text-neutral-500">·</span>
        <span className="text-sm text-neutral-500">{post.timestamp}</span>
      </div>
      <p className="text-neutral-300">{post.content}</p>
      <div className="mt-2 flex items-center gap-6 text-neutral-400">
        <button className="flex items-center gap-2 transition-colors hover:text-brand">
          <MessageCircleIcon className="h-4 w-4" />
          <span className="text-sm">12</span>
        </button>
        <button className="flex items-center gap-2 transition-colors hover:text-red-500">
          <HeartIcon className="h-4 w-4" />
          <span className="text-sm">45</span>
        </button>
        <button className="transition-colors hover:text-green-500">
          <Share2Icon className="h-4 w-4" />
        </button>
      </div>
    </div>
  </article>
);

const CreatePost = ({ onAddPost }: { onAddPost: (content: string) => void }) => {
  const [content, setContent] = useState("");

  {/* FIX: Use FormEvent type from react import instead of React.FormEvent namespace */}
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAddPost(content);
      setContent("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening in your creative world?"
        className="w-full resize-none border-none bg-transparent text-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-0"
        rows={3}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!content.trim()}
          className="rounded-full bg-brand px-6 py-2 text-sm font-medium text-brand-foreground shadow-lg shadow-brand/30 transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:bg-brand/40 disabled:shadow-none"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleAddPost = (content: string) => {
    const newPost: Post = {
      id: Date.now(),
      author: {
        name: "You",
        handle: "@creator",
        avatarColor: "bg-brand",
      },
      content,
      timestamp: "Just now",
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-4xl font-semibold sm:text-5xl">Community Feed</h1>
        <p className="mt-2 max-w-2xl text-lg text-neutral-400">
          See what fellow creators are working on and share your own progress.
        </p>
      </header>

      <CreatePost onAddPost={handleAddPost} />

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}