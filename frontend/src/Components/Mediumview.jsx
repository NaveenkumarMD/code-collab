import React from 'react'
import { useState, useEffect } from 'react'
import "../Styles/youtube.css"
import Questions from "../Assets/Questions/questions.json"


function Mediumview({questionId}) {

    const [data, setdata] = useState([])
    function isBlogLink(link) {
        let slicedString = link.slice(12, 19)
        return slicedString
    }


    useEffect(() => {
        console.log(questionId);
        let searchTerm = Questions.questions[questionId-1].title
        console.log(searchTerm);
        fetch("/blogsearch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                searchTerm: `${searchTerm} + problem`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                let tempData=data.organic_results.filter(item =>
                    isBlogLink(item.link) !== "youtube"
                )
                setdata(tempData)
            })
    }, [])


    return (
        <div>
            <div>Recommended blogs</div>
            <div className='videos'>
                {
                    data.length !== 0 ? data.map(item => {
                        // console.log(item);
                        return (
                            <a className='medium-card' href={item.link} target="_blank" rel="noopener noreferrer">
                                <div className="ytb-data">
                                    <div className='ytb-title'>{item.title}</div>
                                </div>
                            </a>
                        )
                    }) : <h1>No blogs found</h1>
                    
                }
            </div>

        </div>
    )
}

export default Mediumview
