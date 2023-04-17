import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostDetail from './PostDetail';
import { Post, Comment } from '../types/types';

const PostPage = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { id } = useParams<{ id: string }>();
  const helloMessage = 'Hello from';

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
      {post && <PostDetail post={post} comments={comments} helloMessage={helloMessage} />}
    </div>
  );
};

export default PostPage;
