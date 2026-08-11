import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Post from './routes/Post';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:slug" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;