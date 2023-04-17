import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Posts from './pages/Posts';
import PostPage from './pages/PostPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
