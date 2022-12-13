import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import '../Styles/Allquestions.css'

import Questions from '../Assets/Questions/questions.json'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AllquestionsFilter from '../Components/AllquestionsFilter'
function Allquestions() {
    const [questions, setQuestions] = useState(Questions)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState(false)
    const [sortType, setSortType] = useState('asc')
    const [topic, setTopic] = useState('All')
    const [difficulty, setDifficulty] = useState('All')
    const [type, setType] = useState('All')
    const [countofQuestions, setCountofquestions] = useState(questions?.questions.length)
    const navigate = useNavigate()
    let a = 0
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
    return (
        <div className='aqcontainer'>
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
                                                    <td className='table-sno'>{a + 1}.</td>
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
