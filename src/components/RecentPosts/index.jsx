import { Link } from "react-router-dom";
import PostCard from "../PostCard";
import { getRecentPosts } from "../../lib/posts";

export default function RecentPosts() {
  const posts = getRecentPosts(4);

  return (
    <section aria-labelledby="posts-recentes">
      <h2 id="posts-recentes" className="sr-only">
        Posts recentes
      </h2>

      {posts.length > 0 && (
        <div className="grid w-full grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} headingLevel="h3" />
          ))}
        </div>
      )}

      <div className={posts.length > 0 ? "mt-10" : ""}>
        <Link
          to="/posts"
          className="text-moss-dark border border-sand-line py-1 px-4 transition-colors duration-150 hover:bg-sand"
        >
          Ver todos
        </Link>
      </div>
    </section>
  );
}
