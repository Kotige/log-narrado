import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Com <BrowserRouter> o React Router não mexe na rolagem: sem isto, ao clicar
// em "próximo post" no fim de um texto, o novo post abriria já lá embaixo.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
