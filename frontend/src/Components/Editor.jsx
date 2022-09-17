import React,{useRef,useState} from 'react'
import Editor from "@monaco-editor/react";

const defaultEditorConfig={
    theme:"vs-dark",
    value:"//Type something",
    fontSize:"20px",
    language:"Python",
    height:"90vh",
}

function Editorcomponent() {
    const [code,setCode]=useState("")
    const [config,setConfig]=useState(defaultEditorConfig)
    const handleEditorchange=(value,event)=>{
        setCode(code)
        console.log(value)
    }
    return (
        <div>
            <Editor 
            height={config.height}
            defaultValue={config.value}
            theme={config.theme}
            language={config.language}
            onChange={handleEditorchange}
            options={{
                scrollBeyondLastLine:false,
                fontSize:"30px"
            }}
            />
        </div>
    )
}

export default Editorcomponent
