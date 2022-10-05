
import React, { useEffect, useState } from 'react'

import connection from '../Functions/connection'


function DB() {
    const [counter,setCounter]=useState("")
    var doc = connection.get('doc-collection', 'doc-id')
    useEffect(() => {
        doc.subscribe((error) => {
            if (error) return console.error(error)
            if (!doc.type) {
                doc.create({ counter: 0 }, (error) => {
                    if (error) console.error(error)
                })
            }
        });

        doc.on('op', (op) => {
            console.log('count', doc.data.counter)
            setCounter(doc.data.counter)
        })
    }, [connection])
    return (
        <div>
            <button onClick={() => {
                console.log(doc)
                doc.submitOp([{ p: ['counter'], na: 1 }])
            }}>Click</button>
            <div style={{fontSize:"30px",color:"red"}}>count is{counter}</div>
    
        </div>
    )
}

export default DB
