import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase-config";

const useGetReplies = (commentId) => {
  const collectionRef = collection(db, "comments", commentId, "replies");
  const q = query(collectionRef, orderBy("createdAt"));
  const [repliesData, loading, error] = useCollection(q);

  let replies = [];
  if (repliesData) {
    replies = repliesData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  return { replies, loading, error };
};

export default useGetReplies;
