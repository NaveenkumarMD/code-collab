import React from 'react'
import '../Styles/Navbar.css'
function Navbar(props) {
    return (
        <div className='navbar' style={{height:`${props.height}px`}}>
            Navbar
        </div>
    )
}

export default Navbar
