import React, { useRef, useState, useEffect } from "react";
import "../Styles/Editortabs.css";
import { FaInfoCircle } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
function EditorTabs(props) {
  const tab1ref = useRef(null);
  const tab2ref = useRef(null);
  const tab3ref = useRef(null);
  const tab1contentref = useRef(null);
  const tab2contentref = useRef(null);
  const tab3contentref = useRef(null);

  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput>{props.TerminalOutput}</TerminalOutput>,
  ]);
  useEffect(() => {
    setTerminalLineData([
      <TerminalOutput>{props.TerminalOutput}</TerminalOutput>,
    ]);
  }, [props.TerminalOutput]);
  const cleanstyles = () => {
    tab1contentref.current.classList.remove("content-selected");
    // tab2contentref.current.classList.remove("content-selected")
    tab3contentref.current.classList.remove("content-selected");
    tab1ref.current.classList.remove("tab-selected");
    // tab2ref.current.classList.remove("tab-selected")
    tab3ref.current.classList.remove("tab-selected");
  };

  const handletabclick = (e) => {
    var tabid = e.target.getAttribute("name");
    cleanstyles();
    switch (tabid) {
      case "tab1":
        tab1contentref.current.classList.add("content-selected");
        tab1ref.current.classList.add("tab-selected");
        break;
      case "tab2":
        tab2contentref.current.classList.add("content-selected");
        tab2ref.current.classList.add("tab-selected");
        break;
      case "tab3":
        tab3contentref.current.classList.add("content-selected");
        tab3ref.current.classList.add("tab-selected");
        break;
      default:
        break;
    }
  };

  return (
    <div className="editor-tabs">
      <div className="tabs-header">
        <div className="tabs-sub-header1">
          <div
            className="tab-selected"
            ref={tab1ref}
            name="tab1"
            onClick={handletabclick}
          >
            Test cases
          </div>
          {/* <div className="" ref={tab2ref} name="tab2" onClick={handletabclick}>Results</div> */}
          <div className="" ref={tab3ref} name="tab3" onClick={handletabclick}>
            Terminal
          </div>
        </div>
        <div className="flex">
          <div className="btn-run" onClick={props.runCode}>
            Run
          </div>
          <div className="btn-run" onClick={props.runAllTestCases}>
            Submit
          </div>
          <div className="btn-run" onClick={props.saveCode}>
            Save
          </div>
        </div>
      </div>
      <div className="tabs-content content-selected" ref={tab1contentref}>
        <div className="testresults-container">
          <div>Results</div>
          <div className="container-ss">
            <div className="test-res">
              <FaInfoCircle color="#718c0" /> <TiTick color="green" />{" "}
              <MdClose color="red" /> Test case 1
            </div>
          </div>
        </div>
      </div>
      {/* <div className='tabs-content' ref={tab2contentref}>
                content2
            </div> */}
      <div className="tabs-content tab-2" ref={tab3contentref}>
        <Terminal
          prompt=" "
          colorMode={ColorMode.Dark}
          onInput={(terminalInput) =>
            console.log(`New terminal input received: '${terminalInput}'`)
          }
        >
          {terminalLineData}
        </Terminal>
      </div>
    </div>
  );
}

export default EditorTabs;
