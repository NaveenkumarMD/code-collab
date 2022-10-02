import React, { useRef, useState } from 'react'
import Editor, { useMonaco } from "@monaco-editor/react";
import '../Styles/Editor.css'
import '../Styles/Utilities.css'
import { useEffect } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri'
import { HiDotsVertical } from "react-icons/hi"
import { IoMdMoon, IoMdSunny } from 'react-icons/io'
import { SiC, SiCachet, SiCplusplus, SiJava, SiJavascript, SiPython } from 'react-icons/si'
import EditorTabs from './EditorTabs';
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
    const leftcontainerref = useRef(null)
    const rightcontainerref = useRef(null)
    const [width, setWidth] = useState(0)
    const containerref = useRef(null)
    const [language, setLanguage] = useState("python")
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
                    leftcontainerref.current.style.width = leftwidth+100+e.x + "px"

                }
            }
        )
        containerref.current.addEventListener("mouseup",
            () => {
                drag = false
            }
        )



    }, [])
    useEffect(() => {

    }, [])
    return (
        <div className='editor-container' ref={containerref} >
            <div className='left-container-editor' ref={leftcontainerref}>
                <div>
                    this{width}
                </div>
            </div>
            <div className='middle-bar-editor' ref={middelbarref}>
                <HiDotsVertical size={20} color="white" />
            </div>
            <div className='right-container-editor' ref={rightcontainerref}>
                <div className='accessory-btns'>
                    <div class="dropdown">
                        <button class="dropbtn">
                            <div>
                              {
                                language.charAt(0).toUpperCase()+language.substring(1,language.length)
                              }  
                            </div>
                            <RiArrowDropDownLine size={30} color="white" />
                        </button>
                        <div class="dropdown-content">
                            <a onClick={() => setLanguage("python")}>
                                <SiPython size={16} />
                                Python</a>
                            <a onClick={() => setLanguage("java")}>
                                <SiJava size={16} />
                                Java</a>
                            <a onClick={() => setLanguage("c")}>
                                <SiC size={16} />
                                C</a>
                            <a onClick={() => setLanguage("cpp")}>
                                <SiCplusplus size={16} />
                                C++</a>
                            <a onClick={() => setLanguage("javascript")}>
                                <SiJavascript size={16} />
                                Javascript</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">
                            <div>
                                Theme
                            </div>
                            <RiArrowDropDownLine size={30} color="white" />
                        </button>
                        <div class="dropdown-content">
                            <a onClick={() => setTheme("vs-light")}>
                                <IoMdSunny size={16} />
                                Light</a>
                            <a onClick={() => setTheme("vs-dark")}>
                                <IoMdMoon size={16} />
                                Dark</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button className='dropbtn'>
                            <div>
                                Font Size
                            </div>
                            <RiArrowDropDownLine size={30} color="white" />
                        </button>
                        <div class="dropdown-content">
                            <a onClick={() => setFontsize("14px")}>14 px</a>
                            <a onClick={() => setFontsize("16px")}>16 px</a>
                            <a onClick={() => setFontsize("18px")}>18 px</a>
                            <a onClick={() => setFontsize("20px")}>20 px</a>
                            <a onClick={() => setFontsize("22px")}>22 px</a>
                            <a onClick={() => setFontsize("24px")}>24 px</a>
                        </div>
                    </div>

                </div>
                <Editor
                    height={config.height}
                    defaultValue={config.value}
                    theme={theme}
                    language={language}
                    options={{
                        scrollBeyondLastLine: false,
                        fontSize: fontSize
                    }}
                />
                <div>
                    <EditorTabs/>
                </div>
            </div>
        </div >
    )
}

export default Editorcomponent
