import { auth } from "../firebase-config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AddComment = ({
  title,
  commentId,
  replyTo,
  setShowReply,
  initialValues,
}) => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (initialValues) {
      let value = initialValues;
      if (value.replyTo) {
        value = `${value.replyTo} ` + initialValues.content;
        setContent(value);
        return;
      }
      setContent(initialValues.content);
      return;
    }
    if (replyTo) {
      setContent(`@${replyTo} `);
    }
  }, [replyTo, initialValues]);

  const user = auth.currentUser;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    const commentObj = {
      userId: user.uid,
      userName: user.displayName,
      userProfile: user.photoURL,
      content: e.target.content.value,
      createdAt: serverTimestamp(),
      likes: [],
      dislikes: [],
    };
    if (replyTo) {
      const username = `@${replyTo} `;
      commentObj.content = content.replace(username, "");
      commentObj.replyTo = username;
    }

    if (commentId) {
      try {
        setContent("");
        setShowReply(false);
        await setDoc(
          doc(
            db,
            "comments",
            commentId,
            "replies",
            initialValues ? initialValues.id : "fuck" + Date.now()
          ),
          commentObj
        );
      } catch (error) {
        console.log(error);
      }
      return;
    }

    try {
      setContent("");
      if (initialValues) {
        setShowReply(false);
        await setDoc(
          doc(collection(db, "comments"), initialValues.id),
          commentObj
        );
        return;
      }
      await addDoc(collection(db, "comments"), commentObj);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="bg-white w-full p-4 mt-5 rounded-lg shadow grid md:grid-cols-10 gap-3 mb-2"
      onSubmit={handleSubmit}
    >
      <div className="md:col-span-1 justify-center md:flex hidden">
        <Profile image={user && `${user.photoURL}`} />
      </div>
      <div className="md:col-span-8">
        <textarea
          name="content"
          autoFocus
          value={content || ""}
          onChange={(e) => setContent(e.target.value)}
          className="border-lightGray rounded-lg w-full p-3 border-2 h-[120px]"
          placeholder="Add a comment..."
        ></textarea>
      </div>
      <div className="md:col-span-1 hidden md:block">
        <button className=" bg-moderateBlue btn">{title}</button>
      </div>
      <div className="flex justify-between w-full md:hidden">
        <div className="col-span-1 justify-center flex">
          <Profile image={user && `${user.photoURL}`} />
        </div>
        <button className=" bg-moderateBlue btn">{title}</button>
      </div>
    </form>
  );
};

export default AddComment;
