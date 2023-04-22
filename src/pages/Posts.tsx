import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Post, User } from '../types/types';
import withLogging from '../hoc/withLog';
import SearchInput from '../components/SearchInput';

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));

    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  useMemo(() => {
    setFilteredPosts(posts.filter((post) =>
      users.find((user) => user.id === post.userId)?.name
        .toLowerCase()
        .includes(keyword.toLowerCase()),
    ));
  }, [posts]);

  return (
    <div className="container">
      <h1>Posts</h1>
      <div className="row">
        <div className="col-md-6">
          <SearchInput
            onFilterChange={setKeyword}
            placeholder="Filter by user"
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
