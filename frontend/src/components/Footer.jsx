import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center p-4">
            <div className="flex justify-center space-x-6 mb-2">
                <a href="https://github.com/Ashish-Redhu/" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                <a href="https://www.linkedin.com/in/ashish-redhu/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                <a href="https://leetcode.com/u/AshishRedhu/" target="_blank" rel="noopener noreferrer" className="hover:underline">LeetCode</a>
            </div>
            <p>© 2025 NoteSphere. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
