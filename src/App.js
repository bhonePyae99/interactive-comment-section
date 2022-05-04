import "./App.css";
import CommentContainer from "./components/CommentContainer";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="w-full min-h-screen bg-lightGray">
      <Routes>
        <Route path="/" element={<CommentContainer />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
