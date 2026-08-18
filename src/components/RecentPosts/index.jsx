import { Link } from "react-router-dom";
import { getRecentPosts } from "../../utils/getPosts";

function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return dateStr;

    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function PostCard({ post }) {
    return (
        <Link 
            to={`/posts/${post.slug}`}
            className="group flex flex-col gap-2 border-t border-sand-line pt-5 no-underline"
        >
            <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] uppercase tracking-[0.06em] text-muted">
                <span>{formatDate(post.date)}</span>
                <span className="text-sand-line">·</span>
                <span className="text-terracota">{post.category}</span>
            </div>

            <h3 className="font-display text-2xl leading-snug text-ink transition-colors duration-150 group-hover:text-moss-dark">
                {post.title}
            </h3>
        </Link>
    );
}

export default function RecentPosts() {
    const posts = getRecentPosts(4);

    if (posts.length === 0) return null;

    return (
        <div className="grid w-full grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
            ))}
        </div>
    );
}