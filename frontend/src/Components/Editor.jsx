import React, { useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import "../Styles/Editor.css";
import "../Styles/Utilities.css";
import { useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import EditorTabs from "./EditorTabs";
import Collabcode from "./Collabcode";
import EditorOptions from "./EditorOptions";
import Navbar from "./Navbar";
import Leftcontainer from "./Leftcontainer";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import Questions from "../Assets/Questions/questions.json";
import io from "socket.io-client";
import "../Styles/video.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../App";
import { toastGenerator } from "../Functions/toast";
const socket = io.connect("http://localhost:5000/");

const defaultEditorConfig = {
  theme: "vs-light",
  value: "//Type something",
  fontSize: "20px",
  language: "Python",
  height: "60vh",
  width: "400px",
};
var defaultcode = `def main():
    print("Hello World")

if __name__ == "__main__":
    main()
`;
function Editorcomponent() {
  const monaco = useMonaco();
  const [config, setEditorconfig] = useState(defaultEditorConfig);
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontsize] = useState("18px");
  const middelbarref = useRef(null);
  const maincontainerref = useRef(null);
  const leftcontainerref = useRef(null);
  const rightcontainerref = useRef(null);
  const [width, setWidth] = useState(0);
  const containerref = useRef(null);
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(defaultcode);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [input, setInput] = useState("");
  const [TerminalOutput, setTerminaloutput] = useState("Output");
  const routerParams = useParams();
  const [questionId, setQuestionId] = useState(routerParams.id);
  const [questions, setQuestions] = useState(Questions);
  //test cases
  const [testcase_count, settestcaseCount] = useState(0)
  const [testcase_results, setTestcaseresults] = useState(0)

  //Socket for audio
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const editorRef = useRef();

  const [EnableAudio, setEnabelAudio] = useState(true);
  const [Enablevideo, setEnableVideo] = useState(true);

  const [userDetails, setUserDetails] = useState();

  const toggleVideo = () => {
    setEnableVideo(!Enablevideo);
    stream.getVideoTracks()[0].enabled = Enablevideo;
  };
  const toggleAudio = () => {
    setEnabelAudio(!EnableAudio);
    stream.getAudioTracks()[0].enabled = EnableAudio;
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: Enablevideo, audio: EnableAudio })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
      console.log("Me is ", me);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
    if (rightcontainerref.current)
      editorRef.current = rightcontainerref.current.querySelector(".editor");

    let details = JSON.parse(localStorage.getItem("userdata"));
    setUserDetails(details);
    if (details) {
      const docRef = doc(db, "users", details.email);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          let userdata = docSnap.data();
          if (userdata.problems) {
            const val = userdata.problems.find(
              (prob) => prob.questionId === questionId
            );
            setCode(val.code);
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!callEnded && editorRef.current) {
      editorRef.current.addEventListener("keyup", (evt) => {
        socket.send({ text: code, to: caller !== "" ? caller : idToCall });
      });
    }
  }, [caller, idToCall, code]);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
      socket.send({ text: code, to: caller !== "" ? caller : idToCall });
    });

    socket.on("message", (data) => {
      setCode(data);
      editorRef.current.value = data;
    });

    socket.on("disconnect", () => {
      peer.destroy();
      setCallEnded(true);
      console.log("disconnected");
      sessionStorage.removeItem("isOwner");
      window.location.reload(false);
    });
    connectionRef.current = peer;
    sessionStorage.setItem("isOwner", true);
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      alert("Connected");
      userVideo.current.srcObject = stream;
    });

    socket.on("message", (data) => {
      setCode(data);
      editorRef.current.value = data;
    });

    socket.on("disconnect", () => {
      peer.destroy();
      console.log("disconnected");
      setCallEnded(true);
      sessionStorage.removeItem("isOwner");
      window.location.reload(false);
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
    sessionStorage.setItem("isOwner", false);
  };

  const leaveCall = () => {
    socket.emit("forceDisconnect");
    connectionRef.current.destroy();
    setCallEnded(true);
    editorRef.current.removeEventListener("keyup", () => {
      socket.send({ text: code, to: caller !== "" ? caller : idToCall });
    });
    editorRef.current.destroy();
    sessionStorage.removeItem("isOwner");
    window.location.reload(false);
  };

  let socketprops = {
    myVideo,
    callAccepted,
    callEnded,
    callUser,
    userVideo,
    name,
    setName,
    me,
    idToCall,
    setIdToCall,
    callAccepted,
    callEnded,
    leaveCall,
    receivingCall,
    callAccepted,
    answerCall,
    toggleAudio,
    toggleVideo,
    Enablevideo,
    EnableAudio,
  };
  let EditorOptionprops = {
    language,
    setLanguage,
    theme,
    setTheme,
    fontSize,
    setFontsize,
  };
  let Navbarprops = {
    height: navbarHeight,
  };
  let questionprops = {
    questionId,
  };
  const runAllTestCases = () => {
    console.log(questions);
    var currquestion = questions?.questions.find(
      (question) => question.id == questionId
    );
    console.log(currquestion);
    const dataToRunCode = {
      language,
      code,
      questionId,
      sample_input: currquestion.sample_input,
      sample_output: currquestion.sample_output,
    };
    fetch("/runAllTestCases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToRunCode),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTestcaseresults(data.res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(()=>{
    var currquestion = questions?.questions.find(
      (question) => question.id == questionId
    );
    settestcaseCount(currquestion?.sample_input.length)
  },[questionId,questions])
  const runCode = () => {
    const dataToRunCode = {
      language,
      code,
      input,
    };
    fetch("/runcode", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataToRunCode),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.output) {
          setTerminaloutput(data.output);
        }
        if (data.error) {
          setTerminaloutput(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveCode = () => {
    toastGenerator("info","Saving code")
    console.log("Saving code");
    if (code === "")
      return toastGenerator("warning", "Write some code to save!");
    if (
      sessionStorage.getItem("isOwner") &&
      sessionStorage.getItem("isOwner") === "false"
    )
      return toastGenerator("warning", "You don't have access");
    console.log(userDetails);
    if (userDetails) {
      console.log("saving");
      const docRef = doc(db, "users", userDetails.email);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          let userdata = docSnap.data();

          if (userdata.problems) {
            userdata.problems.forEach((problem) => {
              if (problem.questionId === questionId) {
                problem.code = code;
              }
            });
          } else
            userdata = {
              ...userdata,
              problems: [{ questionId: questionId, code: code }],
            };

          // let problems = [...userdata.problems];
          console.log(userdata.problems);
          setDoc(docRef, { problems: userdata.problems }, { merge: true }).then(
            () => toastGenerator("success", "Code saved successfully")
          );
        }
      });
    }
  };

  let editorTabsprops = {
    runCode,
    TerminalOutput,
    runAllTestCases,
    saveCode,
    testcase_count,
    testcase_results
  };

  useEffect(() => {
    var drag = false;
    var leftwidth = leftcontainerref.current.getBoundingClientRect().width;
    middelbarref.current.addEventListener("mousedown", (e) => {
      console.log(e.x);
      drag = true;
    });
    containerref.current.addEventListener("mousemove", (e) => {
      if (drag) {
        console.log(e.x);
        setWidth(e.x);
        leftcontainerref.current.style.width = leftwidth + 100 + e.x + "px";
      }
    });
    containerref.current.addEventListener("mouseup", () => {
      drag = false;
    });

    maincontainerref.current.addEventListener(
      "mousemove",
      handlemousemoveonscreen
    );
    return () => {
      try {
        maincontainerref.current.removeEventListener(
          "mousemove",
          handlemousemoveonscreen
        );
        // containerref.current.removeEventListener("mouseup")
        // containerref.current.removeEventListener("mousemove")
        // middelbarref.current.removeEventListener("mousedown")
      } catch (error) { }
    };
  }, []);
  const handlemousemoveonscreen = (e) => {
    let y = e.screenY;
    if (y < 150) {
      setNavbarHeight(50);
    }
    if (y > 300) {
      setNavbarHeight(0);
    }
  };
  const handleediorchange = (newValue, e) => {
    setCode(newValue);
  };
  return (
    <div ref={maincontainerref} className="main-container">
      <Navbar {...Navbarprops} />

      <div
        className="editor-container"
        style={{ height: `calc(100vh-${navbarHeight}px)` }}
        ref={containerref}
      >
        <div className="left-container-editor" ref={leftcontainerref}>
          <div>
            <Collabcode setCode={setCode} />
          </div>
          <Leftcontainer {...questionprops} {...socketprops} />
          <div className="socket-container"></div>
        </div>
        <div className="middle-bar-editor" ref={middelbarref}>
          <HiDotsVertical size={20} color="white" />
        </div>
        <div className="right-container-editor" ref={rightcontainerref}>
          <EditorOptions {...EditorOptionprops} />
          <Editor
            height={config.height}
            defaultValue={code}
            theme={theme}
            language={language}
            options={{
              scrollBeyondLastLine: false,
              fontSize: fontSize,
            }}
            onChange={handleediorchange}
            value={code}
            className="editor"
          />
          <div>
            <EditorTabs {...editorTabsprops} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editorcomponent;
