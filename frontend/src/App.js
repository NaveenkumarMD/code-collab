import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "./Components/Editor";
import DB from "./Components/Collabcode";
import Socket from "./Components/Socket";
import Login from "./Screens/Login";
import Editorpage from "./Screens/Editorpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./Context/UserContext";

function App() {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
  });

  const updateUserData = (newuserData) => {
    setUserData({ ...userData, ...newuserData });
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, updateUserData }}>
        <Routes>
          <Route path="/" element={<Editor />} />
          <Route path="/socket" element={<Socket />} />
          <Route path="/db" element={<DB />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer autoClose={4000} />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
