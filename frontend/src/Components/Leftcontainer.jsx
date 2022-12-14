import React, { useRef, useState, useEffect } from 'react'
import '../Styles/Leftcontainer.css'
import Questions from '../Assets/Questions/questions.json'
import Questionview from './QuestonView'
import { CopyToClipboard } from "react-copy-to-clipboard";
import '../Styles/video.css'
import { BiClipboard, BiPhoneCall, BiSearch } from "react-icons/bi"
import { CgSearch } from "react-icons/cg"
import { MdCallEnd, MdMic, MdVideoCall, MdVideocam, MdVideocamOff, MdMicOff } from "react-icons/md"
import Avatar from "react-avatar"
import ReactTooltip from "react-tooltip"
import Youtubeview from './Youtubeview';
import Mediumview from './Mediumview';
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
    answerCall,
    toggleAudio,
    toggleVideo,
    EnableAudio,
    Enablevideo,
}) {
    const questioncontainerRef = useRef(null)
    const connectcontainerref = useRef(null)
    const mediumref = useRef(null)
    const youtuberef = useRef(null)
    const tab1ref = useRef(null)
    const tab2ref = useRef(null)
    const tab3ref = useRef(null)
    const tab4ref = useRef(null)
    const questions = Questions.questions
    const [question, setCurrentquestion] = useState()
    const cleanStyles = () => {
        questioncontainerRef.current.classList.remove("current-show")
        connectcontainerref.current.classList.remove("current-show")
        youtuberef.current.classList.remove("current-show")
        mediumref.current.classList.remove("current-show")
        tab1ref.current.classList.remove("selected")
        tab2ref.current.classList.remove("selected")
        tab3ref.current.classList.remove("selected")
        tab4ref.current.classList.remove("selected")

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
            case "youtube":
                youtuberef.current.classList.add("current-show")
                tab3ref.current.classList.add("selected")
                break;
            case "medium":
                mediumref.current.classList.add("current-show")
                tab4ref.current.classList.add("selected")

            default:
                break;
        }
    }
    return (
        <div>
            <div className='left-container-tabs'>
                <div className='selected' onClick={handletabclick} name="problem" ref={tab1ref}>Problem</div>
                <div className='' onClick={handletabclick} name="connect" ref={tab2ref}>Connect</div>
                <div className='' onClick={handletabclick} name="youtube" ref={tab3ref}>Youtube</div>
                <div className='' onClick={handletabclick} name="medium" ref={tab4ref}>Medium</div>
            </div>
            <div className='connect-container' ref={connectcontainerref}>
                <div className="video-container">

                    <div style={{ marginTop: "20px" }}>
                        <div className="video-main-container">
                            <div className='video-containerx'>
                                <video playsInline muted ref={myVideo} autoPlay />
                            </div>
                            <div className='video-containery'>
                                {callAccepted && !callEnded ? (
                                    <video playsInline ref={userVideo} autoPlay />
                                ) : null}
                            </div>
                        </div>

                        <div className='mic-and-cam-container'>
                            <div>
                                <div className='video-icon-container' onClick={toggleAudio} >
                                    {
                                        EnableAudio ? <MdMic /> : <MdMicOff />

                                    }
                                </div>
                            </div>
                            <div>
                                <div className='video-icon-container endcall' onClick={() => leaveCall()}>
                                    <MdCallEnd />
                                </div>
                            </div>
                            <div>
                                <div className='video-icon-container' onClick={toggleVideo} >
                                    {
                                        Enablevideo ? <MdVideocam /> : <MdVideocamOff />
                                    }
                                </div>
                            </div>

                        </div>
                        <div className='call-recieving-container'>
                            {receivingCall && !callAccepted ? (
                                <div>
                                    <div className='namee'>{name || "Someone"} tries to connect</div>
                                    <div className='call-accept-container'>
                                        <div className='call-btn'
                                            onClick={answerCall}
                                        >
                                            <span>Accept</span><BiPhoneCall />
                                        </div>
                                        <div className='call-btn cancel'
                                            onClick={answerCall}
                                        >
                                            <span>Decline</span><BiPhoneCall />
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <div className='call-log-container'>
                            <div className='call-container'>
                                <div className='flex input-search'>
                                    <input
                                        label="ID to call"
                                        value={idToCall}
                                        onChange={e => setIdToCall(e.target.value)}
                                        type="text" placeholder='Enter the user ID' />
                                    <BiSearch size={20} color="var(--color-fg)" />
                                </div>
                                <div className='call-btn'
                                    onClick={() => callUser(idToCall)}
                                >
                                    <span>Call</span><BiPhoneCall />
                                </div>

                                <CopyToClipboard text={me} >
                                    <div className='call-btn'>
                                        <span>Copy</span><BiClipboard />
                                    </div>
                                </CopyToClipboard>
                                {/* <ReactTooltip place="top" event="click" eventOff='mouseout' type="dark" /> */}
                            </div>
                            <div className='call-logs-main-container'>
                                <div className='call-logs-hint-text'>
                                    Recent call logs
                                </div>
                                <div className='recent-users-container'>
                                    <div className='user-container'>
                                        <div>
                                            <Avatar name="Naveen kumar" size='40' round color='var(--color-fg)' />
                                        </div>
                                        <div className='name-container'>
                                            <div >Naveenkumar M</div>
                                            <div>12 days ago</div>
                                        </div>
                                    </div>
                                    <div className='user-container'>
                                        <div>
                                            <Avatar name="Naveen kumar" size='40' round color='var(--color-fg)' />
                                        </div>
                                        <div className='name-container'>
                                            <div >Naveenkumar M</div>
                                            <div>12 days ago</div>
                                        </div>
                                    </div>
                                    <div className='user-container'>
                                        <div>
                                            <Avatar name="Naveen kumar" size='40' round color='var(--color-fg)' />
                                        </div>
                                        <div className='name-container'>
                                            <div >Naveenkumar M</div>
                                            <div>12 days ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div className='main-container-question current-show' ref={questioncontainerRef}>
                <Questionview question={question} />
            </div>
            <div className='main-container-youtube' ref={youtuberef}>
                <Youtubeview />
            </div>
            <div className='main-container-medium' ref={mediumref}>
                <Mediumview />
            </div>
        </div>
    )
}

export default Leftcontainer
