import { auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/");
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <>
      {auth.currentUser ? (
        <button
          className="px-4 py-2 bg-white border-red-300 border-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={handleSignOut}
        >
          Sign OUt
        </button>
      ) : (
        <>
          <h2 className="text-center font-bold text-xl pt-20">
            Please login to continue....
          </h2>
          <button
            className="px-4 py-2 bg-white border-blue-300 border-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={handleAuth}
          >
            Google SignIn
          </button>
        </>
      )}
    </>
  );
};

export default Login;
