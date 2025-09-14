import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currNote, setcurrNote] = useState(null);

  const backendURI = import.meta.env.VITE_BACKEND_URI;

  useEffect(() => {

    const fetchNote = async ()=>{
        try{
            const res = await axios.get(`${backendURI}/notes/${id}`, { withCredentials: true });
            setcurrNote(res.data);
        }
        catch(err){
            console.log("Error fetch note: ", err);
        }
    }
    fetchNote();
  }, [id]);

  if (!currNote) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col">
    {/* Top bar */}
    <div className="flex justify-between items-center mb-10">
        <button
        onClick={() => navigate(-1)}
        className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-gray-500/25 active:scale-[0.98]"
        >
        Back
        </button>
        <div className="text-gray-400">Author: {currNote.author.username}</div>
    </div>

    {/* Main content */}
    <div className="flex flex-col items-center text-center px-4">
        <h1 className="text-4xl font-extrabold mb-4 text-gradient bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        {currNote.heading}
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
        {currNote.description}
        </p>
    </div>
    </div>

  );
}
