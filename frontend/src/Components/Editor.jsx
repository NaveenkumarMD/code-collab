import React, { useRef, useState } from 'react'
import Editor, { useMonaco } from "@monaco-editor/react";
import '../Styles/Editor.css'
import '../Styles/Utilities.css'
import { useEffect } from 'react';
import { HiDotsVertical } from "react-icons/hi"
import EditorTabs from './EditorTabs';
import Collabcode from './Collabcode';
import EditorOptions from './EditorOptions';
import Navbar from './Navbar';
import Leftcontainer from './Leftcontainer';
const defaultEditorConfig = {
    theme: "vs-light",
    value: "//Type something",
    fontSize: "20px",
    language: "Python",
    height: "60vh",
    width: "400px"
}

function Editorcomponent() {
    const monaco = useMonaco()
    const [config, setEditorconfig] = useState(defaultEditorConfig)
    const [theme, setTheme] = useState("green-black")
    const [fontSize, setFontsize] = useState("18px")
    const middelbarref = useRef(null)
    const maincontainerref = useRef(null)
    const leftcontainerref = useRef(null)
    const rightcontainerref = useRef(null)
    const [width, setWidth] = useState(0)
    const containerref = useRef(null)
    const [language, setLanguage] = useState("python")
    const [code, setCode] = useState("")
    const [navbarHeight, setNavbarHeight] = useState(0)
    const [input, setInput] = useState("")
    let EditorOptionprops = {
        language,
        setLanguage,
        theme,
        setTheme,
        fontSize,
        setFontsize
    }
    let Navbarprops = {
        height: navbarHeight
    }
    const runCode = () => {
        const dataToRunCode = {
            language,
            code,
            input
        }
        fetch("/runcode",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(dataToRunCode)

        }).then(res=>res.json()).then(data=>{
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    }
    let editorTabsprops = {
        runCode
    }

    useEffect(() => {
        var drag = false
        var leftwidth = leftcontainerref.current.getBoundingClientRect().width
        middelbarref.current.addEventListener("mousedown",
            (e) => {
                console.log(e.x)
                drag = true
            }
        )
        containerref.current.addEventListener("mousemove",
            (e) => {

                if (drag) {
                    console.log(e.x)
                    setWidth(e.x)
                    leftcontainerref.current.style.width = leftwidth + 100 + e.x + "px"

                }
            }
        )
        containerref.current.addEventListener("mouseup",
            () => {
                drag = false
            }
        )

        maincontainerref.current.addEventListener("mousemove", handlemousemoveonscreen)
        return () => {
            try {
                maincontainerref.current.removeEventListener("mousemove", handlemousemoveonscreen)
                // containerref.current.removeEventListener("mouseup")
                // containerref.current.removeEventListener("mousemove")
                // middelbarref.current.removeEventListener("mousedown")  
            } catch (error) {

            }

        }
    }, [])
    const handlemousemoveonscreen = (e) => {
        let y = e.screenY
        if (y < 150) {
            setNavbarHeight(50)
        }
        if (y > 300) {
            setNavbarHeight(0)
        }
    }
    const handleediorchange = (newValue, e) => {
        setCode(newValue)
    }
    return (
        <div ref={maincontainerref} className="main-container" >
            <Navbar {...Navbarprops} />

            <div className='editor-container' style={{ height: `calc(100vh-${navbarHeight}px)` }} ref={containerref} >
                <div className='left-container-editor' ref={leftcontainerref}>
                    <div>
                        <Collabcode code={code} setCode={setCode} />
                    </div>
                    <Leftcontainer />
                </div>
                <div className='middle-bar-editor' ref={middelbarref}>
                    <HiDotsVertical size={20} color="white" />
                </div>
                <div className='right-container-editor' ref={rightcontainerref}>
                    <EditorOptions {...EditorOptionprops} />
                    <Editor
                        height={config.height}
                        defaultValue={code}
                        theme={theme}
                        language={language}
                        options={{
                            scrollBeyondLastLine: false,
                            fontSize: fontSize
                        }}
                        onChange={handleediorchange}
                        value={code}

                    />
                    <div>
                        <EditorTabs {...editorTabsprops} />
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Editorcomponent
