export default function ChangelogPreview() {
    return (
        <div className="flex flex-col gap-3 border-t border-sand-line pt-5">
            <h4 className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
                Changelog
            </h4>
            <p className="text-sm leading-relaxed text-muted">
                Em breve: um resumo das últimas atualizações do blog e dos projetos.
            </p>
        </div>
    );
}