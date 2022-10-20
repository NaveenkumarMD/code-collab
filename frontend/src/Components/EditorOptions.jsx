import React from 'react'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'
import { SiC, SiCachet, SiCplusplus, SiJava, SiJavascript, SiPython } from 'react-icons/si'
import { RiArrowDropDownLine } from 'react-icons/ri'
function EditorOptions(props) {
    return (
        <div className='accessory-btns'>
            <div class="dropdown">
                <button class="dropbtn">
                    <div>
                        {
                            props.language.charAt(0).toUpperCase() + props.language.substring(1, props.language.length)
                        }
                    </div>
                    <RiArrowDropDownLine size={30} color="white" />
                </button>
                <div class="dropdown-content">
                    <a onClick={() => props.setLanguage("python")}>
                        <SiPython size={16} />
                        Python</a>
                    <a onClick={() => props.setLanguage("java")}>
                        <SiJava size={16} />
                        Java</a>
                    <a onClick={() => props.setLanguage("c")}>
                        <SiC size={16} />
                        C</a>
                    <a onClick={() => props.setLanguage("cpp")}>
                        <SiCplusplus size={16} />
                        C++</a>
                    <a onClick={() => props.setLanguage("javascript")}>
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
                    <a onClick={() => props.setTheme("vs-light")}>
                        <IoMdSunny size={16} />
                        Light</a>
                    <a onClick={() => props.setTheme("vs-dark")}>
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
                    <a onClick={() => props.setFontsize("14px")}>14 px</a>
                    <a onClick={() => props.setFontsize("16px")}>16 px</a>
                    <a onClick={() => props.setFontsize("18px")}>18 px</a>
                    <a onClick={() => props.setFontsize("20px")}>20 px</a>
                    <a onClick={() => props.setFontsize("22px")}>22 px</a>
                    <a onClick={() => props.setFontsize("24px")}>24 px</a>
                </div>
            </div>

        </div>
    )
}

export default EditorOptions
