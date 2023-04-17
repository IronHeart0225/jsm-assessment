import { Post, Comment } from '../types/types';

interface PostDetailProps {
  post: Post;
  comments: Comment[];
  helloMessage: string;
}

const PostDetail = ({ post, comments, helloMessage }: PostDetailProps) => {
  console.log(`${helloMessage} PostDetail`);

  return (
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
  );
};

export default PostDetail;
