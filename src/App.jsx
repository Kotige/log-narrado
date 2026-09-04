import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Post from "./routes/Post";
import Projects from "./routes/Projects";
import ProjectCategory from "./routes/ProjectCategory";
import Autor from "./routes/Autor";
import Changelog from "./routes/Changelog";
import Posts from "./routes/Posts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:slug" element={<Post />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/projetos/:slug" element={<ProjectCategory />} />
        <Route path="/autor" element={<Autor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
