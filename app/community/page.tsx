"use client";

import { useState, useEffect, type FormEvent, type FC } from "react";
import { HeartIcon, MessageCircleIcon, Share2Icon } from "@/components/Icons";
import { getPosts, createPost, likePost } from "@/lib/api";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";

const UserAvatar = ({ author }: { author: Post["author"] }) => (
  <div
    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${author.avatarColor} font-bold text-white`}
  >
    {author.name.charAt(0)}
  </div>
);

const PostCard: FC<{ post: Post; onLike: (postId: string) => void }> = ({ post, onLike }) => {
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
  };

  return (
    <article className="animate-fade-in flex gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-inner shadow-black/10">
      <UserAvatar author={post.author} />
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-neutral-50">{post.author.name}</span>
          <span className="text-sm text-neutral-400">{post.author.handle}</span>
          <span className="text-sm text-neutral-500">·</span>
          <span className="text-sm text-neutral-500">{timeAgo(post.createdAt)}</span>
        </div>
        <p className="text-neutral-300 whitespace-pre-wrap">{post.content}</p>
        <div className="mt-2 flex items-center gap-6 text-neutral-400">
          <button className="flex items-center gap-2 transition-colors hover:text-brand">
            <MessageCircleIcon className="h-4 w-4" />
            <span className="text-sm">{post.commentsCount}</span>
          </button>
          <button
            onClick={() => onLike(post.id)}
            className={cn(
              "flex items-center gap-2 transition-colors",
              post.isLiked ? "text-red-500" : "hover:text-red-500"
            )}
            aria-label={post.isLiked ? "Unlike post" : "Like post"}
          >
            <HeartIcon className={cn("h-4 w-4", post.isLiked && "fill-current")} />
            <span className="text-sm">{post.likesCount}</span>
          </button>
          <button className="transition-colors hover:text-green-500">
            <Share2Icon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

const CreatePost = ({ onAddPost }: { onAddPost: (content: string) => Promise<void> }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (content.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onAddPost(content);
        setContent("");
      } catch (error) {
        // In a real app, you'd show a toast notification here
        console.error("Failed to create post:", error);
      } finally {
        setIsSubmitting(false);
      }
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
          disabled={!content.trim() || isSubmitting}
          className="rounded-full bg-brand px-6 py-2 text-sm font-medium text-brand-foreground shadow-lg shadow-brand/30 transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:bg-brand/40 disabled:shadow-none"
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
};

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getPosts(page);
        setPosts(response.data);
        setTotalPages(response.pagination.pages);
      } catch (e) {
        setError("Failed to load posts. The backend might be offline.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [page]);

  const handleAddPost = async (content: string) => {
    try {
      const response = await createPost(content);
      // Add the new post to the top of the list
      setPosts((prevPosts) => [response.data, ...prevPosts]);
    } catch (error) {
      console.error("Failed to add post:", error);
      // Re-throw to be caught in the form component for UI feedback
      throw error;
    }
  };
  
  const handleLikePost = (postId: string) => {
    // Optimistic UI update
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1
        };
      }
      return p;
    }));

    // Send request to the server
    likePost(postId).catch(() => {
      // Revert on failure
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            isLiked: !p.isLiked,
            likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1
          };
        }
        return p;
      }));
    });
  };

  const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <header>
        <h1 className="text-4xl font-semibold sm:text-5xl">Community Feed</h1>
        <p className="mt-2 max-w-2xl text-lg text-neutral-400">
          See what fellow creators are working on and share your own progress.
        </p>
      </header>

      <CreatePost onAddPost={handleAddPost} />

      {isLoading && <p className="text-center text-neutral-400">Loading posts...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {!isLoading && !error && (
        <>
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLikePost} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="rounded-full border border-neutral-700 px-6 py-2 text-sm font-medium text-neutral-200 transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-neutral-400">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="rounded-full border border-neutral-700 px-6 py-2 text-sm font-medium text-neutral-200 transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
