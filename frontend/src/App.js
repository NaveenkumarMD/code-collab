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
import Allquestions from "./Screens/Allquestions";
import Signup from "./Screens/Signup";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import Questioncontext from "./Context/Questioncontext";
import addx from "./Functions/x";
import ViewJobs from "./Components/ViewJobs";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#34B37A',
    },
    secondary: {
      main: '#2ec5d3',
    },
    background: {
      default: '#1C1D1D',
      paper: '#1C1D1D',
    },
  },
});
const firebaseConfig = {
  apiKey: "AIzaSyAk5go6VlGe9cvE2-5mjZ_tkPLsoxDHzfo",
  authDomain: "archive-39cf2.firebaseapp.com",
  projectId: "archive-39cf2",
  storageBucket: "archive-39cf2.appspot.com",
  messagingSenderId: "1013930689771",
  appId: "1:1013930689771:web:886ce7acf65e69a1b8aaae",
  measurementId: "G-0LC2D8L643"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app)

function App() {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
  });
  const [question,setQuestion]=useState({})

  const updateUserData = (newuserData) => {
    setUserData({ ...userData, ...newuserData });
  };

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Questioncontext.Provider value={{question,setQuestion}}>
      <UserContext.Provider value={{ userData, updateUserData }}>
        <Routes>
          <Route path="/solve/:id" element={<Editor />} />
          <Route path="/socket" element={<Socket />} />
          <Route path="/db" element={<DB />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Allquestions/>} />
          <Route path="/viewjobs" element={<ViewJobs/>} />
        </Routes>
        <ToastContainer autoClose={4000} />
      </UserContext.Provider>
      </Questioncontext.Provider> 
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
