import React, { useRef, useState, useEffect } from 'react'
import '../Styles/Leftcontainer.css'
import Questions from '../Assets/Questions/questions.json'
function Leftcontainer({ questionId }) {
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
        console.log(questionId,questions)
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
                conect container
            </div>
            <div className='main-container-question current-show' ref={questioncontainerRef}>
                <div className='main-title'>
                    {question?.title}
                </div>
                <div className='tags'>
                    {
                        question?.tags.map((tag, index) => {
                            return (
                                <div className='tag' id={index}>{tag}</div>
                            )
                        })
                    }       

                </div>
                <div className='main-description'>
                    {question?.description}
                     </div>
                <div className='sub-container'>
                    <div className='sub-title'>Input Format</div>
                    <div className='sub-content'>
                        {question?.input_format}
                         </div>
                </div>
                <div className='sub-container'>
                    <div className='sub-title'>Output Format</div>
                    <div className='sub-content'>
                        {question?.output_format}
                        </div>
                </div>
                <div className='main-title green'>
                    Examples
                </div>
                <div className='sub-container'>
                    <div className='sub-title'>Sample input</div>
                    {
                        question?.sample_input.map((input, index) => {
                            return (
                                <div className='code-container'>
                                    {input}
                                </div>
                            )
                        })
                    }

                </div>
                <div className='sub-container'>
                    <div className='sub-title'>Expected Output</div>
                    {
                        question?.sample_output.map((output, index) => {
                            return (
                                <div className='code-container'>
                                    {output}
                                </div>
                            )
                        })
                    }
                </div>
                <div className='main-title green'>
                    Constraints
                </div>
                <div className='constraints'>
                    {
                        question?.constraints.map((constraint, index) => {
                            return (
                                <div className='constraint' id={index}>{constraint}</div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Leftcontainer
