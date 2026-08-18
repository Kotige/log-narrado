import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        if (!email) return;

        // To do: integrar com um serviço de newsletter (ex: buttondown, mailchimp)

        setSubmitted(true);
    }

    return (
        <div className="flex flex-col gap-3 border-t border-sand-line bg-sand px-5 py-5">
            <h4 className="font-mono text-[12px] uppercase tracking-[0.08em] text-moss-dark">
                Newsletter
            </h4>
            <p className="text-sm leading-relaxed text-muted">
                Novos posts direto no seu e-mail, sem spam.
            </p>

            {submitted ? (
                <p className="font-mono text-[12px] text-moss-dark">
                    Inscrito! Confira sua caixa de entrada em breve.
                </p>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input type="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="seu@email.com"
                        className="border border-sand-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-moss focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="bg-moss-dark px-4 py-2 text-sm font-medium text-bg transition-colors duration=150 hover:bg-moss"
                    >
                        Assinar
                    </button>
                </form>
            )}
        </div>
    );
}