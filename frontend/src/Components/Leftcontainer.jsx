import React, { useRef } from 'react'
import '../Styles/Leftcontainer.css'
function Leftcontainer() {
    const questioncontainerRef = useRef(null)
    const connectcontainerref=useRef(null)
    const tab1ref=useRef(null)
    const tab2ref=useRef(null)

    const cleanStyles=()=>{
        questioncontainerRef.current.classList.remove("current-show")
        connectcontainerref.current.classList.remove("current-show")
        tab1ref.current.classList.remove("selected")
        tab2ref.current.classList.remove("selected")

    }
    const handletabclick = (e) => {
        const tabSelected = e.target.getAttribute("name")
        cleanStyles()
        switch (tabSelected) {
            case "problem":
                questioncontainerRef.current.classList.add("current-show")
                tab1ref.current.classList.add("selected")
                break;
            case "connect":
                connectcontainerref.current.classList.add("current-show")
                tab2ref.current.classList.add("selected")
                break;

            default:
                break;
        }
    }
    return (
        <div>
            <div className='left-container-tabs'>
                <div className='selected' onClick={handletabclick} name="problem" ref={tab1ref}>Problem</div>
                <div className='' onClick={handletabclick} name="connect" ref={tab2ref}>Connect</div>

            </div>
            <div className='connect-container' ref={connectcontainerref}>
                conect container
            </div>
            <div className='main-container-question current-show' ref={questioncontainerRef}>
                <div className='main-title'>
                    My First Code
                </div>
                <div className='tags'>
                    <div className='tag'>Easy</div>
                    <div className='tag'>Arrays</div>
                </div>
                <div className='main-description'>
                    Your mother has sent you to the milkman with a cylindrical bottle. You have to pay the milkman the price for the bottle full of milk at a rate of ₹40 per litre of milk. You are given the radius (r) and the height (h) of the bottle in centimetres. You can assume the value of π as 3.14.
                </div>
                <div className='sub-container'>
                    <div className='sub-title'>Input Format</div>
                    <div className='sub-content'>
                        1 line containing two space separated integers - the radius and the height of the bottle (in centimetres).
                    </div>
                </div>
                <div className='sub-container'>
                    <div className='sub-title'>Output Format</div>
                    <div className='sub-content'>
                    The first line contains 'T' denoting the no. of test cases.

T lines each contain a number 'n' denoting the number of elements, followed by n space-separated numbers denoting the array elements.
                    </div>
                </div>
                <div className='main-title green'>
                    Examples
                </div>
                <div className='sub-container'>
                    <div className='sub-title'>Sample input</div>
                    <div className='code-container'>
                        2 34
                    </div>
                </div>
                <div className='sub-container'>
                    <div className='sub-title'>Expected Output</div>
                    <div className='code-container'>
                        75.36
                    </div>
                </div>
                <div className='main-title green'>
                    Constraints
                </div>
                <div className='constraints'>
                    <div className='constraint'> 1 ≤ r ≤ 100</div>
                    <div className='constraint'> 1 ≤ r ≤ 100</div>
                </div>
            </div>
        </div>
    )
}

export default Leftcontainer
