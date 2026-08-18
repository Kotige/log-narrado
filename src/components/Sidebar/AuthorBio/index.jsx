import { Link } from "react-router-dom";

const avatar_src = "/profile.jpg";

export default function AuthorBio() {
    return (
        <div className="flex flex-col gap-4 border-t border-sand-line pt-5">
            <div className="flex items-center gap-3">
                <img 
                    src={avatar_src} 
                    alt="Foto do autor"
                    className="h-14 w-14 flex-shrink-0 rounded-full border border-samd-line object-cover" 
                />

                <div className="flex flex-col leading-tight">
                    <span className="font-display text-lg text-ink">Vítor</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
                        Autor do blog
                    </span>
                </div>
            </div>

            <p className="text-sm leading-relaxed text-muted">
                Escrevo sobre ciência, tecnologia e as experiências que ficam pelo caminho - um jeito de registrar o que aprendo enquanto aprendo.
            </p>

            <Link
                to="/autor"
                className="font-mono text-[12px] uppercase tracking-[0.06em] text-moss-dark no-underline hover:text-moss"
            >
                Sobre o autor →
            </Link>
        </div>
    );
}