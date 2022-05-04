import useGetReplies from "../hooks/useGetReplies";
import Comment from "./Comment";

const CommentAndReplies = ({ comment }) => {
  const { replies, loading } = useGetReplies(comment.id);

  return (
    <div className="w-full flex flex-col items-end">
      <Comment data={comment} />
      {loading && (
        <h2 className="animate-pulse text-xl font-bold">Loading comments...</h2>
      )}
      {replies.length !== 0 && (
        <div className="md:w-[95%] md:pl-8 pl-4 border-l-2">
          {replies.map((replie) => {
            return (
              <Comment data={replie} key={replie.id} repliesId={comment.id} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommentAndReplies;
