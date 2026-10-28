import Header from "../Header";
import Footer from "../Footer";

// Estrutura comum das páginas: Header, conteúdo principal e Footer.
// As páginas de leitura (Post e Conto) montam a própria estrutura, porque
// escondem Header e Footer no modo leitura e aplicam o tema escolhido.
export default function Layout({ children, className = "" }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="conteudo" className={className}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
