import React from 'react'

const Navbar = () => {
    return (
        <nav className=' bg-slate-800 text-white'>
            {/* <div className="my-container flex justify-between items-center py-5 h-14"> */}
            <div className="my-container flex justify-between items-center py-5 px-8 md:px-40 h-14">
                <div className="logo">
                    <h2 className='text-2xl font-bold '>
                        <span className='text-purple-600'>&lt;</span>
                        <span>Pass</span>
                        <span className='text-purple-600'>Key/&gt;</span>
                    </h2>
                </div>
                <button className='flex items-center justify-center gap-2 cursor-pointer ring-white ring-1 px-2 py-1 rounded-full bg-purple-600'>
                    <img className='w-7' src="/icons/github.png" alt="Github" />
                    <span className='font-bold'>Github</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar