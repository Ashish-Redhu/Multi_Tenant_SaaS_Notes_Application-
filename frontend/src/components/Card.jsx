import React from 'react';

const Card = ({ title, description }) => {
    return (
        <div className="bg-gray-500 p-6 rounded-lg shadow-md max-w-sm hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Card;
