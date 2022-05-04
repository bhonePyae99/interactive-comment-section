import AddComment from "./AddComment";
import { auth, db } from "../firebase-config";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faReply, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import LikeAndDislike from "./LikeAndDislike";
import moment from "moment";
import Profile from "./Profile";
import { useEffect, useState } from "react";

const Comment = ({ data, repliesId }) => {
  const [showReply, setShowReply] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [time, setTime] = useState("");
  const user = auth.currentUser;

  useEffect(() => {
    const date = data.createdAt;
    if (date) {
      const dateData = moment(date.toDate());
      const fromNow = dateData.fromNow();
      setTime(fromNow);
      return;
    }

    setTime("A moment ago");
  }, [data.createdAt]);

  const handleDelete = async () => {
    let targetDoc = doc(collection(db, "comments"), data.id);

    if (repliesId) {
      targetDoc = doc(
        collection(db, "comments", repliesId, "replies"),
        data.id
      );
    }
    try {
      await deleteDoc(targetDoc);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div className="p-2 mb-2 bg-white flex rounded">
        <div className="w-[60px] mr-4 hidden md:block">
          <LikeAndDislike
            dislikes={data.dislikes}
            likes={data.likes}
            commentId={data.id}
            repliesId={repliesId}
          />
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Profile image={data.userProfile} />
              <h2 className="font-bold text-moderateBlue">{data.userName}</h2>
              <h2 className="text-gray-400 font-bold text-sm">{time}</h2>
            </div>
            {user && user.uid === data.userId ? (
              <div className="flex">
                <div
                  className="md:flex items-center cursor-pointer mr-2 hidden select-none"
                  onClick={() => setShowEdit(!showEdit)}
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    className="text-moderateBlue mr-2"
                  />
                  <h2 className="text-moderateBlue font-bold">Edit</h2>
                </div>
                <div
                  className="md:flex items-center cursor-pointer hidden select-none"
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="text-softRed mr-2"
                  />
                  <h2 className="text-softRed font-bold">Delete</h2>
                </div>
              </div>
            ) : (
              <div
                className="md:flex items-center cursor-pointer hidden select-none"
                onClick={() => setShowReply(!showReply)}
              >
                <FontAwesomeIcon
                  icon={faReply}
                  className="text-moderateBlue mr-2"
                />
                <h2 className="text-moderateBlue font-bold">Reply</h2>
              </div>
            )}
          </div>
          <div>
            <p className="text-gray-400">
              {data.replyTo && (
                <span className="font-bold text-moderateBlue">
                  {data.replyTo}
                </span>
              )}
              {data.content}
            </p>
          </div>
          <div className="flex md:hidden justify-between mt-5">
            <div className="w-[100px]">
              <LikeAndDislike
                dislikes={data.dislikes}
                likes={data.likes}
                commentId={data.id}
                repliesId={repliesId}
              />
            </div>
            {user && user.uid === data.userId ? (
              <div className="flex">
                <div
                  className="items-center flex cursor-pointer mr-3 md:hidden select-none"
                  onClick={() => setShowEdit(!showEdit)}
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    className="text-moderateBlue mr-1"
                  />
                  <h2 className="text-moderateBlue font-bold">Edit</h2>
                </div>
                <div
                  className="items-center flex cursor-pointer md:hidden select-none"
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="text-softRed mr-1"
                  />
                  <h2 className="text-softRed font-bold">Delete</h2>
                </div>
              </div>
            ) : (
              <div
                className="items-center cursor-pointer flex"
                onClick={() => setShowReply(!showReply)}
              >
                <FontAwesomeIcon
                  icon={faReply}
                  className="text-moderateBlue mr-2"
                />
                <h2 className="text-moderateBlue font-bold">Reply</h2>
              </div>
            )}
          </div>
        </div>
      </div>
      {showReply && (
        <AddComment
          setShowReply={setShowReply}
          title="reply"
          commentId={repliesId ? repliesId : data.id}
          replyTo={data.userName}
        />
      )}
      {showEdit && (
        <AddComment
          setShowReply={setShowEdit}
          title="edit"
          commentId={repliesId && repliesId}
          initialValues={data}
        />
      )}
    </div>
  );
};

export default Comment;
