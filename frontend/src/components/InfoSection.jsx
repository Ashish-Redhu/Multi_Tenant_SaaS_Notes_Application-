import React from 'react';
import Card from './Card';

const infoData = [
    {
        title: "Data Persistance",
        description: "Ensure all your notes are securely saved and instantly available for your team across devices."
    },
    {
        title: "Secure",
        description: "Isolated Access to each teanant, enabling seamless collaboration within their organization."
    },
    {
        title: "Role Based Access",
        description: "Only admins are allowed to invite new users. Normal users can only from CRUD operations."
    }
];

const InfoSection = () => {
    return (
        <div className="p-10 bg-gray-900 text-center">
            <h2 className="text-3xl font-bold mb-6">What NoteSphere Offers</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {infoData.map((info, index) => (
                    <Card key={index} title={info.title} description={info.description} />
                ))}
            </div>
        </div>
    );
};

export default InfoSection;
