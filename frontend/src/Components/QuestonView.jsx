import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext'
import Questioncontext from '../Context/Questioncontext'

function Questionview() {
    const [question,setQuestion]=useState(JSON.parse(localStorage.getItem("question")))
    return (
        <>

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
                    </>
    )
}

export default Questionview
