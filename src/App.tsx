import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
