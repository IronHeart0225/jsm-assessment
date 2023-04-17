import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import { Post, User } from '../types/types';

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("");

  const debouncedFilter = useDebounce(filter, 500);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  const filteredPosts = posts.filter((post) =>
    users.find((user) => user.id === post.userId)?.name
      .toLowerCase()
      .includes(debouncedFilter.toLowerCase())
  );

  return (
    <div>
      <h1>Posts</h1>
      <input
        type="text"
        placeholder="Filter by user"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {filteredPosts.map((post) => (
        <Link key={post.id} to={`/post/${post.id}`}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>User: {users.find((user) => user.id === post.userId)?.name}</p>
        </Link>
      ))}
    </div>
  );
}

export default Posts;
