import React, { useEffect } from 'react'
import { useState } from 'react'
import '../Styles/youtube.css'
function Youtubeview() {
    const [data,setdata]=useState([])
    useEffect(() => {
        fetch("/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                search: "hello"
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setdata(data.items)
            })
    }, [])
    return (
        <div>
            <div>Recommended videos</div>
            <div className='videos'>
                {
                    data && data.map((item) => {
                        if(item.type !='video'){
                            return
                        }
                        return (
                            <div className='youtube-card'>
                                <div className='youtube-card-image'>
                                    <img src={item.thumbnail?.thumbnails[0]?.url} alt='youtube' />
                                </div>
                                <div className='ytb-data'>
                                    <div className='ytb-title'>{item.title}</div>
                                    <div className='ytb-channel'>{item.channelTitle}</div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Youtubeview
