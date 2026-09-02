import Header from "../components/Header";
import Footer from "../components/Footer";

const AVATAR_SRC = "/profile.jpg";

const INTERESTS = [
  "Ciência",
  "Tecnologia",
  "Física",
  "Web Development",
  "Data Science",
  "RPG",
  "Literatura",
  "Jogos",
];

export default function Autor() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header activeHref="/autor" />

      <main className="mx-auto flex w-full max-w-190 flex-col gap-16 px-8 py-20">
        {/* Cabeçalho: foto + nome */}
        <div className="flex flex-col items-center gap-5 text-center">
          <img
            src={AVATAR_SRC}
            alt="Foto de Vítor"
            className="h-36 w-36 rounded-full border border-sand-line object-cover"
          />
          <div className="flex flex-col gap-1">
            <h1 className="font-display text-4xl text-ink">Vítor</h1>
            <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
              autor do Log Narrado
            </p>
          </div>
        </div>

        {/* Bio longa */}
        <div className="flex flex-col gap-5 text-base leading-relaxed text-muted">
          <p>
            Dou aulas de física, mas sigo numa trajetória em transição, não um
            ciclo que volta ao ponto de partida, mas sim um deslocamento, uma
            reta que muda de direção sem previsão de retorno. Levo comigo o que
            já sabia de física, estatística, matemática e vou testando esse
            conhecimento em terreno desconhecido, aprendendo a ser um cientista
            de dados.
          </p>
          <p>
            Escrevo há anos: crio mundos de fantasia, futuros possíveis e
            impossíveis, contos que nascem de perguntas sem resposta fácil. Mais
            recentemente, tenho escrito crônicas onde a física, a tecnologia e a
            programação escapam da abstração e se misturam ao cotidiano, um
            jeito de encontrar poesia onde normamente só se procura por lógica.
            O Log Narrado nasceu para abrigar essas histórias, mas também para
            ser um diário aberto, um lugar onde registro essa travessia entre
            duas carreiras e o que vou construindo fica visível, ainda que em
            obras.
          </p>

          <p>
            Fora das telas, desacelero com RPG e cozy games. Às vezes troco tudo
            isso pela quadra: o vôlei é onde consigo desligar de vez, sem
            cálculo, sem terminal, sem preocupações.
          </p>
          <p>
            Como toda travessia, este blog é um processo. Ele se escreve
            devagar, com ajustes de rota pelo caminho, um caderno de campo que
            cresce junto comigo, enquanto eu ainda estou aprendendo a lê-lo.
          </p>
        </div>

        {/* Áreas de interesse */}
        <div className="flex flex-col gap-4 pt-8">
          <h2 className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted md:text-center">
            Áreas de interesses
          </h2>
          <div className="flex flex-wrap gap-4 md:justify-center md:px-20">
            {INTERESTS.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-sand-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.04em] text-moss-dark"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
