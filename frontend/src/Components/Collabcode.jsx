import React, { useEffect, useState } from 'react'
import { Children } from 'react'
import connection from '../Functions/connection'

function Collabcode({ code, setCode }) {
    var doc = connection.get('doc-collection', 'doc-id')
    useEffect(() => {
        doc.subscribe((error) => {
            if (error) return console.error(error)
            if (!doc.type) {
                doc.create({
                    code:
                        `function main(){}
                    `
                }, (error) => {
                    if (error) console.error(error)
                })
            }
        });

        doc.on('op', (op, source) => {
            console.log('count', doc)
            setCode(doc.data.code)
            console.log("doc ius", doc.data)
            
        })
        console.log(connection)
    }, [connection])
    useEffect(() => {
        const op = [{
            p: ['code'], oi: code
        }]
        console.log("doc",doc)
        if (doc.data) {
            doc.submitOp(op)
        }

    }, [code])
    return (
        <>
            <button onClick={() => {
            }}>Click</button>
            <div style={{ fontSize: "30px", color: "red" }}>count is{code}</div>


        </>
    )
}

export default Collabcode
