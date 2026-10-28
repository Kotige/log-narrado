// Ainda não há um serviço de newsletter integrado. Em vez de um formulário que
// finge inscrever o leitor, o bloco avisa que ela está a caminho.
//
// Ao integrar (Buttondown, Substack etc.), use o formulário/endpoint público do
// serviço. Nunca coloque chave de API em variáveis VITE_* — elas vão para o
// bundle público.
export default function Newsletter() {
  return (
    <div className="flex flex-col gap-3 border-t border-sand-line bg-sand px-5 py-5">
      <h2 className="font-mono text-[12px] uppercase tracking-[0.08em] text-moss-dark">
        Newsletter
      </h2>
      <p className="text-sm leading-relaxed text-muted">
        Novos posts direto no seu e-mail, sem spam.
      </p>
      <span className="w-fit rounded-full border border-moss px-3 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-moss-dark">
        Em breve
      </span>
    </div>
  );
}
