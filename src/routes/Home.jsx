import { Link } from 'react-router-dom';
import Header  from '../components/Header'
import { posts } from '../lib/posts';

export default function Home() {
    return (
        <div className=" mx-auto px-6 ">
            <Header />

            <ul className="flex flex-col gap-8">
                {posts.map((post) => (
                <li key={post.slug} className="border-b border-sand-line pb-8">
                    <p className="font-mono text-sm text-muted mb-1">
                    {post.date} · {post.category}
                    </p>
                    <h2 className="font-display text-3xl mb-2">
                    <Link to={`/posts/${post.slug}`} className="hover:text-moss-dark">
                        {post.title}
                    </Link>
                    </h2>
                    <p className="text-muted">{post.excerpt}</p>
                </li>
                ))}
            </ul>
        </div>
    );
}