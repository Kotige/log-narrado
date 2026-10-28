import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./routes/Home";

// A Home vem no pacote principal; as outras páginas são baixadas só quando
// visitadas. Assim, quem chega pela Home não baixa o react-markdown.
const Post = lazy(() => import("./routes/Post"));
const Posts = lazy(() => import("./routes/Posts"));
const Projects = lazy(() => import("./routes/Projects"));
const ProjectCategory = lazy(() => import("./routes/ProjectCategory"));
const FabularioIndex = lazy(() => import("./routes/FabularioIndex"));
const Conto = lazy(() => import("./routes/Conto"));
const Changelog = lazy(() => import("./routes/Changelog"));
const Autor = lazy(() => import("./routes/Autor"));
const NotFound = lazy(() => import("./routes/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-bg" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:slug" element={<Post />} />
          <Route path="/fabulario/:slug" element={<Conto />} />
          <Route path="/projetos" element={<Projects />} />
          <Route path="/projetos/fabulario" element={<FabularioIndex />} />
          <Route path="/projetos/:slug" element={<ProjectCategory />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/autor" element={<Autor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
