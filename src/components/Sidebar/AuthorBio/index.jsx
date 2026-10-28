import { Link } from "react-router-dom";
import { AUTHOR } from "../../../data/site";

export default function AuthorBio() {
  return (
    <div className="flex flex-col gap-4 border-t border-sand-line pt-5">
      <div className="flex items-center gap-3">
        <img
          src={AUTHOR.avatar}
          alt={AUTHOR.avatarAlt}
          width={56}
          height={56}
          loading="lazy"
          className="h-14 w-14 shrink-0 rounded-full border border-sand-line object-cover"
        />

        <div className="flex flex-col leading-tight">
          <h2 className="font-display text-lg text-ink">{AUTHOR.name}</h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
            Autor do blog
          </span>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted">
        Escrevo sobre ciência, tecnologia e as experiências que ficam pelo
        caminho — um jeito de registrar o que aprendo enquanto aprendo.
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
