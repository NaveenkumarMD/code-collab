import React from 'react'
import '../Styles/Leftcontainer.css'
function Leftcontainer() {
    return (
        <div>
            <div className='left-container-tabs'>
                <div className='selected'>Problem</div>
                <div>Submissions</div>
                <div>Solution</div>
            </div>
            <div className='main-container-question'>
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
                        The amount you need to pay to the milkman in rupees, accurate upto exactly 2 decimal places.
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
