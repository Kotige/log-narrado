import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Post from "./routes/Post";
import Projects from "./routes/Projects";
import ProjectCategory from "./routes/ProjectCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:slug" element={<Post />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/projetos/:slug" element={<ProjectCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
