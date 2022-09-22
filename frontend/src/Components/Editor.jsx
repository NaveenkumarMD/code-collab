import React, { useRef, useState } from 'react'
import Editor from "@monaco-editor/react";
import '../Styles/Editor.css'
import { useEffect } from 'react';

const defaultEditorConfig = {
    theme: "vs-dark",
    value: "//Type something",
    fontSize: "20px",
    language: "Python",
    height: "100vh",
    width: "400px"
}

function Editorcomponent() {
    const [code, setCode] = useState("")
    const [config, setConfig] = useState(defaultEditorConfig)
    const editorconatinerref = useRef()
    const middleelementref = useRef(null)
    const rightcontainerref = useRef(null)
    const containerref = useRef(null)
    const handleEditorchange = (value, event) => {
        setCode(value)
        console.log(value)
    }

    useEffect(() => {
        var drag = false
        var moveX = editorconatinerref.current.getBoundingClientRect().width +
            middleelementref.current.getBoundingClientRect().width / 2
        middleelementref.current.addEventListener("mousedown", (e) => {
            drag = true
            moveX = e.x
        })
        containerref.current.addEventListener("mousemove", (e) => {
            moveX = e.x
            if (drag) {
                editorconatinerref.current.style.width = moveX - middleelementref.current.getBoundingClientRect().width / 2 + "px"
            }
        })
        containerref.current.addEventListener("mouseup", (e) => {
            drag = false
        })
    }, [])
    return (
        <div ref={containerref}>
            <div className='editorcontainer' ref={editorconatinerref}>
                <Editor
                    height={config.height}
                    defaultValue={config.value}
                    theme={config.theme}
                    language={config.language}
                    onChange={handleEditorchange}
                    options={{
                        scrollBeyondLastLine: false,
                        fontSize: "18px"
                    }}
                />
                <div className='middle-cursorcontainer' ref={middleelementref}></div>
                <div className='right-editorcontainer'>
                </div>
            </div>
        </div>
    )
}

export default Editorcomponent
