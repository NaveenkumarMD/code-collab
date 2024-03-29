import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import '../Styles/Allquestions.css'

import Questions from '../Assets/Questions/questions.json'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AllquestionsFilter from '../Components/AllquestionsFilter'
import Createjobe from './Createjobe'
import ViewJobs from '../Components/ViewJobs'
function Allquestions() {
    const [questions, setQuestions] = useState(Questions)
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState(false)
    const [sortType, setSortType] = useState('asc')
    const [topic, setTopic] = useState('All')
    const [difficulty, setDifficulty] = useState('All')
    const [type, setType] = useState('All')
    const [countofQuestions, setCountofquestions] = useState(questions?.questions.length)
    const navigate = useNavigate()
    let a = -1
    let filterprops = {
        topic,
        setTopic,
        difficulty,
        setDifficulty,
        type,
        setType,
        search,
        setSearch
    }
    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userdata"))
        if (!userdata) {
            navigate("/login")
        }
    }, [])
    return (
        <div className='aqcontainer'>
            <Createjobe {...{ open, setOpen }} />
            <ViewJobs open={open1}  setOpen={setOpen1} />
            <div style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                display: "flex",
                flexDirection: "row"
            }}>
                <div className="btn-run" onClick={() => setOpen(true)}>
                    Create job
                </div>
                <div className="btn-run" onClick={() => {setOpen1(true) }}>
                    Apply for jobs
                </div>
            </div>
            <div className='qcontainer'>
                <div>
                    <div className='aqheader'>
                        All problems
                    </div>
                    <AllquestionsFilter {...filterprops} />
                    <div>
                        <div className='result-identifier-text'>Results | {countofQuestions} problems</div>
                        <table >
                            <thead>
                                <tr className='title-table'>
                                    <th className='table-sno'>S.No</th>
                                    <th className='table-question'>Question</th>
                                    <th className='table-score'>Score</th>
                                    <th className='table-difficulty'>Difficulty</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    questions.questions.map((question, index) => {
                                        if (question.title.toLowerCase().includes(search.toLowerCase()) && (question.tags.includes(topic) || topic === 'All') && (question.difficulty === difficulty || difficulty === 'All') && (question.type === type || type === 'All')) {
                                            a += 1;
                                            return (
                                                <tr className='question-container-bar' key={question.id}
                                                    onClick={() => navigate(`/solve/${question.id}`)}
                                                >
                                                    <td className='table-sno'>{index + 1}.</td>
                                                    <td>{question.title}</td>
                                                    <td>{question.score}</td>
                                                    <td>{question.difficulty}</td>
                                                </tr>
                                            )
                                        }
                                    })

                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Allquestions
