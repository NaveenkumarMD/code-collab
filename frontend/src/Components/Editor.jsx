import React, { useRef, useState } from 'react'
import Editor, { useMonaco } from "@monaco-editor/react";
import '../Styles/Editor.css'
import '../Styles/Utilities.css'
import { useEffect } from 'react';
import { HiDotsVertical } from "react-icons/hi"
import EditorTabs from './EditorTabs';
import Collabcode from './Collabcode';
import EditorOptions from './EditorOptions';
import Navbar from './Navbar';
import Leftcontainer from './Leftcontainer';
import { useParams } from 'react-router-dom';
import Peer from "simple-peer";
import io from "socket.io-client";
import '../Styles/video.css'
const socket = io.connect("http://localhost:5000/");

const defaultEditorConfig = {
    theme: "vs-light",
    value: "//Type something",
    fontSize: "20px",
    language: "Python",
    height: "60vh",
    width: "400px"
}
var defaultcode =
    `def main():
    print("Hello World")

if __name__ == "__main__":
    main()
`
function Editorcomponent() {
    const monaco = useMonaco()
    const [config, setEditorconfig] = useState(defaultEditorConfig)
    const [theme, setTheme] = useState("vs-dark")
    const [fontSize, setFontsize] = useState("18px")
    const middelbarref = useRef(null)
    const maincontainerref = useRef(null)
    const leftcontainerref = useRef(null)
    const rightcontainerref = useRef(null)
    const [width, setWidth] = useState(0)
    const containerref = useRef(null)
    const [language, setLanguage] = useState("python")
    const [code, setCode] = useState(defaultcode)
    const [navbarHeight, setNavbarHeight] = useState(0)
    const [input, setInput] = useState("")
    const [TerminalOutput, setTerminaloutput] = useState("Output")
    const routerParams = useParams()
    const [questionId, setQuestionId] = useState(routerParams.id)

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
    const [EnableAudio, setEnabelAudio] = useState(true)
    const [Enablevideo, setEnableVideo] = useState(true)

    const toggleVideo = () => {
        setEnableVideo(!Enablevideo)
        stream.getVideoTracks()[0].enabled = Enablevideo
    }
    const toggleAudio = () => {
        setEnabelAudio(!EnableAudio)
        stream.getAudioTracks()[0].enabled = EnableAudio
    }

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video:Enablevideo, audio: EnableAudio })
            .then((stream) => {
                setStream(stream);
                myVideo.current.srcObject = stream;
            });

        socket.on("me", (id) => {
            setMe(id);
            console.log("Me is ",me)
        });

        socket.on("callUser", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
        });
    }, []);

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
        });

        connectionRef.current = peer;
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
            alert("Connected")
            userVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    };




    let socketprops={
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
        EnableAudio

}
    let EditorOptionprops = {
        language,
        setLanguage,
        theme,
        setTheme,
        fontSize,
        setFontsize
    }
    let Navbarprops = {
        height: navbarHeight
    }
    let questionprops = {
        questionId
    }
    const runAllTestCases = () => {
        const dataToRunCode = {
            language,
            code,
            questionId
        }
        fetch("/runAllTestCases", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToRunCode)
        }).then(res => res.json()).then(data => {
            console.log(data)

        })
            .catch(err => console.log(err))
    }
    const runCode = () => {
        const dataToRunCode = {
            language,
            code,
            input
        }
        fetch("/runcode", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(dataToRunCode)

        }).then(res => res.json()).then(data => {
            if (data.output) {
                setTerminaloutput(data.output)
            }
            if (data.error) {
                setTerminaloutput(data.error)
            }
        }).catch(err => {
            console.log(err)
        })
    }
    let editorTabsprops = {
        runCode,
        TerminalOutput,
        runAllTestCases
    }

    useEffect(() => {

        var drag = false
        var leftwidth = leftcontainerref.current.getBoundingClientRect().width
        middelbarref.current.addEventListener("mousedown",
            (e) => {
                console.log(e.x)
                drag = true
            }
        )
        containerref.current.addEventListener("mousemove",
            (e) => {

                if (drag) {
                    console.log(e.x)
                    setWidth(e.x)
                    leftcontainerref.current.style.width = leftwidth + 100 + e.x + "px"

                }
            }
        )
        containerref.current.addEventListener("mouseup",
            () => {
                drag = false
            }
        )

        maincontainerref.current.addEventListener("mousemove", handlemousemoveonscreen)
        return () => {
            try {
                maincontainerref.current.removeEventListener("mousemove", handlemousemoveonscreen)
                // containerref.current.removeEventListener("mouseup")
                // containerref.current.removeEventListener("mousemove")
                // middelbarref.current.removeEventListener("mousedown")  
            } catch (error) {

            }

        }
    }, [])
    const handlemousemoveonscreen = (e) => {
        let y = e.screenY
        if (y < 150) {
            setNavbarHeight(50)
        }
        if (y > 300) {
            setNavbarHeight(0)
        }
    }
    const handleediorchange = (newValue, e) => {
        setCode(newValue)
    }
    return (
        <div ref={maincontainerref} className="main-container" >
            <Navbar {...Navbarprops} />

            <div className='editor-container' style={{ height: `calc(100vh-${navbarHeight}px)` }} ref={containerref} >
                <div className='left-container-editor' ref={leftcontainerref}>
                    <div>
                        <Collabcode code={code} setCode={setCode} />
                    </div>
                    <Leftcontainer {...questionprops} {...socketprops} />
                    <div className='socket-container'>
                     
                    </div>
                </div>
                <div className='middle-bar-editor' ref={middelbarref}>
                    <HiDotsVertical size={20} color="white" />
                </div>
                <div className='right-container-editor' ref={rightcontainerref}>
                    <EditorOptions {...EditorOptionprops} />
                    <Editor
                        height={config.height}
                        defaultValue={code}
                        theme={theme}
                        language={language}
                        options={{
                            scrollBeyondLastLine: false,
                            fontSize: fontSize
                        }}
                        onChange={handleediorchange}
                        value={code}

                    />
                    <div>
                        <EditorTabs {...editorTabsprops} />
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Editorcomponent
