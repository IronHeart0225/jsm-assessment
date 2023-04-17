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
    <div>
      {post && (
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>

          <h3>Comments:</h3>
          {comments.map((comment) => (
            <div key={comment.id}>
              <h4>{comment.name}</h4>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withLogging(PostDetail);
