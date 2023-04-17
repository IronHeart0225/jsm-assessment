import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Post, Comment } from '../types/types';
import withLogging from '../hoc/withLog';

const PostDetail = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  useEffect(() => {
    if (post) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then((response) => response.json())
        .then((data) => setComments(data));
    }
  }, [post]);

  return (
    <div className="container mt-5">
      {post && (
        <div className="card p-3 border-0">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      )}
      <div className="row mt-3">
        <div className="col-12 px-5">
          <h3>Comments:</h3>
        </div>
        {comments.map((comment) => (
          <div className="col-md-6" key={comment.id}>
            <div className="card p-3 m-2 border-0">
              <div className="card-header bg-white border-0">
                {comment.name}
              </div>
              <div className="card-body border-0">
                <blockquote className="blockquote mb-0">
                  <p>{comment.body}</p>
                  <footer className="blockquote-footer">
                    {comment.email}
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withLogging(PostDetail);
