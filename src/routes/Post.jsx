import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug } from '../lib/posts';

export default function Post() {
    const { slug } = useParams();
    const post = getPostBySlug(slug);

    if (!post) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-16">
                <p>Post não encontrado.</p>
                <Link to="/" className="text-moss-dark">Voltar</Link>
            </div>
        );
    }

    return (
        <article className="max-w-3xl mx-auto px-6 py-16">
            <Link to="/" className="font-mono text-sm text-muted hover:text-moss-dark">
                ← voltar
            </Link>

            <p className="font-mono text-sm text-muted mt-6 mb-1">
                {post.date} · {post.category}
            </p>
            <h1 className="font-display text-4xl mb-8">{post.title}</h1>

            <div className="prose prose-neutral max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </div>
        </article>
    );
}