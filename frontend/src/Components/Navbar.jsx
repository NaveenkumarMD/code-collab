import React from 'react'
import '../Styles/Navbar.css'
import { MdComputer } from "react-icons/md"
import { BiGitRepoForked } from 'react-icons/bi'
function Navbar(props) {
    //`${props.height}px`
    return (
        <div className='navbar' style={{ height:"50px"  }}>
            <div className='nav-logo'>
            <MdComputer className='logo' color='var(--color-fg)' size={30} />
            {/* <div>Code collab</div> */}
            </div>
            <div className='right-nav'>
                <BiGitRepoForked />
            </div>
        </div>
    )
}

export default Navbar
