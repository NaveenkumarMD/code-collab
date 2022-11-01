import React, { useRef, useState, useEffect } from 'react'
import '../Styles/Leftcontainer.css'
import Questions from '../Assets/Questions/questions.json'
import Questionview from './QuestonView'
import { CopyToClipboard } from "react-copy-to-clipboard";
function Leftcontainer({
    questionId,
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
    leaveCall,
    receivingCall,
    answerCall
}) {
    const questioncontainerRef = useRef(null)
    const connectcontainerref = useRef(null)
    const tab1ref = useRef(null)
    const tab2ref = useRef(null)
    const questions = Questions.questions
    const [question, setCurrentquestion] = useState()
    const cleanStyles = () => {
        questioncontainerRef.current.classList.remove("current-show")
        connectcontainerref.current.classList.remove("current-show")
        tab1ref.current.classList.remove("selected")
        tab2ref.current.classList.remove("selected")

    }
    useEffect(() => {
        console.log(questionId, questions)
        for (let idx = 0; idx < questions.length; idx++) {
            if (questions[idx].id == questionId) {
                console.log(questions)
                setCurrentquestion(questions[idx])
                break
            }
        }
        console.log(question)
    }, [questionId]);
    const handletabclick = (e) => {
        const tabSelected = e.target.getAttribute("name")
        cleanStyles()
        switch (tabSelected) {
            case "problem":
                questioncontainerRef.current.classList.add("current-show")
                tab1ref.current.classList.add("selected")
                break;
            case "connect":
                connectcontainerref.current.classList.add("current-show")
                tab2ref.current.classList.add("selected")
                break;

            default:
                break;
        }
    }
    return (
        <div>
            <div className='left-container-tabs'>
                <div className='selected' onClick={handletabclick} name="problem" ref={tab1ref}>Problem</div>
                <div className='' onClick={handletabclick} name="connect" ref={tab2ref}>Connect</div>

            </div>
            <div className='connect-container' ref={connectcontainerref}>
                <div className="video-container">

                    <h1 style={{ textAlign: "center", color: "white" }}>Video Chat</h1>
                    <div>
                        <div style={{ display: "flex", width: "90%" }}>
                            <div style={{ width: "auto" }}>
                                <video playsInline muted ref={myVideo} autoPlay />
                            </div>
                            <div style={{ width: "auto" }}>
                                {callAccepted && !callEnded ? (
                                    <video playsInline ref={userVideo} autoPlay />
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ marginBottom: "20px" }}
                                placeholder="Name"
                            />
                            <div style={{ color: "white" }}>id is.{me}</div>
                            <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>

                                <button>Copy ID </button>
                            </CopyToClipboard>
                            <input
                                label="ID to call"
                                value={idToCall}
                                onChange={(e) => setIdToCall(e.target.value)}
                                placeholder="user id to call"
                            />
                            <div>
                                {callAccepted && !callEnded ? (
                                    <button onClick={leaveCall}>End call</button>
                                ) : (
                                    <button onClick={() => callUser(idToCall)}>Call user</button>
                                )}
                                {idToCall}
                            </div>
                            <div>
                                {receivingCall && !callAccepted ? (
                                    <div>
                                        <h1>{name} is calling...</h1>
                                        <button onClick={answerCall}>Answer call</button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='main-container-question current-show' ref={questioncontainerRef}>
                <Questionview question={question} />
            </div>
        </div>
    )
}

export default Leftcontainer
