import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase-config";

const useGetComments = () => {
  const collectionRef = collection(db, "comments");
  const q = query(collectionRef, orderBy("createdAt"));
  const [commentsData, loading] = useCollection(q);

  let comments = [];
  if (commentsData) {
    comments = commentsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  return { comments, loading };
};

export default useGetComments;
