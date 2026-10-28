import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import useDocumentMeta from "../hooks/useDocumentMeta";

export default function NotFound({
  title = "Página não encontrada",
  message = "O endereço que você procurou não existe — ou ainda não foi escrito.",
  backTo = "/",
  backLabel = "← Voltar pra Home",
}) {
  useDocumentMeta({ title });

  return (
    <Layout className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-20 text-center">
      <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-terracota">
        404
      </span>
      <h1 className="font-display text-4xl text-ink">{title}</h1>
      <p className="max-w-[50ch] text-sm leading-relaxed text-muted">
        {message}
      </p>
      <Link
        to={backTo}
        className="font-mono text-[12px] uppercase tracking-[0.06em] text-moss-dark no-underline hover:text-moss"
      >
        {backLabel}
      </Link>
    </Layout>
  );
}
