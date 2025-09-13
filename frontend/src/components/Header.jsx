import React from 'react';

const Header = ({setShowLogin}) => {
    const handleClick = ()=>{
        setShowLogin((prev)=> !prev);
    }
    return (
        <header className="flex justify-between items-center p-4 bg-gradient-to-bl from-gray-900 to-purple-700 text-white shadow-md fixed top-0 left-0 w-full z-10">
            <div className="text-2xl font-bold text-white">NoteSphere</div>
            <button className="!bg-white text-black px-4 py-2 rounded hover:!bg-gray-900 hover:text-gray-200"
                onClick={handleClick}
            >Login</button>
        </header>
    );
};

export default Header;