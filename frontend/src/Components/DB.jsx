import React, { useEffect } from 'react'
import ReconnectingWebSocket from "reconnecting-websocket"
import Connection from "sharedb/lib/client"

var socket = new ReconnectingWebSocket('ws://localhost:5000')
var connection = new Connection(socket)

var doc = connection.get('doc-collection', 'doc-id')
doc.subscribe((error) => {
    if (error) return console.error(error)
    if (!doc.type) {
        doc.create({ counter: 0 }, (error) => {
            if (error) console.error(error)
        })
    }
})


function DB() {
    useEffect(() => {
        doc.on('op', (op) => {
            console.log('count', doc.data.counter)
        })

    }, [])
    return (
        <div>
            <button onClick={() => {
                doc.submitOp([{ p: ['counter'], na: 1 }])
            }}>Click</button>
        </div>
    )
}

export default DB
