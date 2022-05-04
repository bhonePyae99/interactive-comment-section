import AddComment from "./AddComment";
import CommentAndReplies from "./CommentAndReplies";
import useGetComments from "../hooks/useGetComments";

const CommentContainer = () => {
  const { comments, loading } = useGetComments();
  return (
    <div className="md:w-2/3 mx-auto md:p-10 p-2">
      {loading && (
        <h2 className="animate-pulse text-xl font-bold">Loading comments...</h2>
      )}
      {comments.map((comment) => (
        <CommentAndReplies comment={comment} key={comment.id} />
      ))}
      <AddComment title="send" />
    </div>
  );
};

export default CommentContainer;
