import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import { Post, User } from '../types/types';
import withLogging from '../hoc/withLog';

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>('');

  const debouncedFilter = useDebounce(filter, 500);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));

    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  const filteredPosts = posts.filter((post) =>
    users.find((user) => user.id === post.userId)?.name
      .toLowerCase()
      .includes(debouncedFilter.toLowerCase()),
  );

  return (
    <div className="container">
      <h1>Posts</h1>
      <div className="row">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by user"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="row mt-4">
        {filteredPosts.map((post) => (
          <div className="col-md-6 mb-4" key={post.id}>
            <div className="card" style={{ height: "100%" }}>
              <div className="card-body">
                <Link to={`/post/${post.id}`}>
                  <h2 className="card-title">{post.title}</h2>
                </Link>
                <p className="card-text">{post.body}</p>
                <p className="card-text">
                  User: {users.find((user) => user.id === post.userId)?.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withLogging(Posts);
