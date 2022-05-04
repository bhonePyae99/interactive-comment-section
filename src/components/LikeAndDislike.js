import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";

const LikeAndDislike = ({ likes, dislikes, commentId, repliesId }) => {
  let collectionRef = collection(db, "comments");
  const navigate = useNavigate();
  if (repliesId) {
    collectionRef = collection(db, "comments", repliesId, "replies");
  }

  const handleIncreasement = async () => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }
    const copyLike = [...likes];
    let copyDislikes = [...dislikes];

    if (copyDislikes.includes(auth.currentUser.uid)) {
      copyDislikes = copyDislikes.filter(
        (item) => item !== auth.currentUser.uid
      );
      try {
        await setDoc(
          doc(collectionRef, commentId),
          { dislikes: copyDislikes },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
      return;
    }

    if (!copyLike.includes(auth.currentUser.uid)) {
      copyLike.push(auth.currentUser.uid);
      try {
        await setDoc(
          doc(collectionRef, commentId),
          { likes: copyLike },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDecreasement = async () => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }
    let copyLike = [...likes];
    let copyDislikes = [...dislikes];

    if (copyLike.includes(auth.currentUser.uid)) {
      copyLike = copyLike.filter((item) => item !== auth.currentUser.uid);
      await setDoc(
        doc(collectionRef, commentId),
        { likes: copyLike },
        { merge: true }
      );
      return;
    }

    if (!copyDislikes.includes(auth.currentUser.uid)) {
      copyDislikes.push(auth.currentUser.uid);
      await setDoc(
        doc(collectionRef, commentId),
        { dislikes: copyDislikes },
        { merge: true }
      );
    }
  };

  return (
    <div className="bg-veryLightGray md:grid-cols-1 grid-cols-3 grid p-3 gap-3 rounded-lg w-full">
      <div
        className="col-span-1 select-none text-center text-lg cursor-pointer font-bold text-lightGrayishBlue"
        onClick={handleIncreasement}
      >
        +
      </div>
      <div className="col-span-1">
        <h2 className="text-center font-bold text-moderateBlue">
          {likes.length - dislikes.length}
        </h2>
      </div>
      <div
        className="col-span-1 select-none text-center text-lg cursor-pointer font-bold text-lightGrayishBlue"
        onClick={handleDecreasement}
      >
        -
      </div>
    </div>
  );
};

export default LikeAndDislike;
