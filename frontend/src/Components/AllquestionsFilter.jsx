import React from 'react'
import { BiSearch } from "react-icons/bi"
import { RiArrowDownFill, RiArrowDownLine, RiArrowDownSLine } from "react-icons/ri"
function AllquestionsFilter({topic,setTopic,difficulty,setDifficulty,type,setType,search,setSearch}) {
    return (
        <div className='search-bar'>
        <div className='flex input-search'>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder='Search for the problem with title or keyword' />
            <BiSearch size={20} color="var(--color-fg)" />
        </div>

        <div className='tag-select'>
            <div className="xdropdown">
                <button className="xdropbtn">
                    <div>Topic</div>
                    <RiArrowDownSLine color="white" size={20} />
                </button>
                <div className="xdropdown-content">
                    <div onClick={() => setTopic("All")}>All</div>
                    <div onClick={() => setTopic("Arrays")}>Arrays</div>
                    <div onClick={() => setTopic("Backtacking")}>Backtacking</div>
                    <div onClick={() => setTopic("Stacks")}>Stacks</div>
                    <div onClick={() => setTopic("Queues")}>Queues</div>
                </div>
            </div>
        </div>
        <div className='tag-select'>
            <div className="xdropdown">
                <button className="xdropbtn">
                    <div>Difficulty</div>
                    <RiArrowDownSLine color="white" size={20} />
                </button>
                <div className="xdropdown-content">
                    <div onClick={() => setDifficulty("All")}>All</div>
                    <div onClick={() => setDifficulty("Easy")}>Easy</div>
                    <div onClick={() => setDifficulty("Medium")}>Medium</div>
                    <div onClick={() => setDifficulty("Hard")}>Hard</div>
                </div>
            </div>
        </div>
        <div className='tag-select'>
            <div className="xdropdown">
                <button className="xdropbtn">
                    <div>Status</div>
                    <RiArrowDownSLine color="white" size={20} />
                </button>
                <div className="xdropdown-content">
                    <div onClick={() => setType("All")}>All</div>
                    <div onClick={() => setType("Solved")}>Solved</div>
                    <div onClick={() => setType("Unsolved")}>Unsolved</div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AllquestionsFilter
