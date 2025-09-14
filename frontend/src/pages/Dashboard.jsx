import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageCard from '../components/dashboardComponents/PageCard';
import HeaderDashboard from '../components/dashboardComponents/HeaderDashboard';
import UserInfo from '../components/dashboardComponents/UserInfo';
import Form from '../components/dashboardComponents/Form';

const Dashboard = () => {
  const backendURI = import.meta.env.VITE_BACKEND_URI;
  const { user, isLoggedIn, setTotalUsersInTenancy } = useContext(UserContext);
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${backendURI}/notes`, { withCredentials: true });
      setNotes(response.data.notes);
      setTotalUsersInTenancy(response.data.usersCount);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  // To make CRUD operations on Notes.
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState('create'); // 'create' or 'update'
  const [selectedNoteId, setSelectedNoteId] = useState(null);

    // Delete handler
    const handleDelete = async (noteId) => {
        try {
            await axios.delete(`${backendURI}/notes/${noteId}`, { withCredentials: true });
            setNotes(prev => prev.filter(note => note._id !== noteId));
        } catch (err) {
            console.error("Error deleting note:", err);
        }
    };

    const handleEditButtonClick = (note) => {
        setHeading(note.heading);
        setDescription(note.description);
        setSelectedNoteId(note._id);
        setMode('update');
    }
  
    
    // Cancel handler: reset form
    const handleCancel = () => {
        setHeading('');
        setDescription('');
        setMode('create');
        setSelectedNoteId(null);
    };
  
  // Submit handler: For Create and Update. 
  const handleSubmit = async () => {
    if(mode==="create"){
        const response = await axios.post(`${backendURI}/notes`, {heading, description}, {withCredentials: true});
        setNotes((prev)=> {
            const newList = [...prev]; newList.push(response);
            setNotes(newList);
            handleCancel(); // To clear the form. 
        })
    }
    else if(mode=="update" && selectedNoteId){
        try {
            const response = await axios.put(`${backendURI}/notes/${selectedNoteId}`, { heading, description }, { withCredentials: true });
            setNotes(prev => prev.map(note => note._id === selectedNoteId ? response : note));
            handleCancel(); // reset form and mode
        } catch (err) {
            console.error("Error updating note:", err);
        }
    }
  };


  const handleMoreDetails = (noteId) => {
    navigate(`/notes/${noteId}`);
  }


   if (!isLoggedIn) {
        return <div>Please log in to view the dashboard.</div>;
    }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
        <div>
            <HeaderDashboard tenancyName={user.tenancy.tenancyName} tenancyPlan={user.tenancy.plan}/>
            <UserInfo user={user}/>
        </div>
        <div className='w-full max-w-2xl mx-auto mt-24'>
            <Form mode={mode} handleSubmit={handleSubmit} handleCancel={handleCancel} heading={heading} setHeading={setHeading} description={description} setDescription={setDescription}/>
        </div>
       

        <p className='font-bold text-2xl w-full md:w-3/4 p-4 bg-gray-800 rounded-2xl text-white m-3'>Total Notes = {notes.length}</p>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            {
                notes.map((note)=>
                    
                    <div key={note._id} className="p-4">
                        <PageCard mode={mode} heading={note.heading} description={note.description} onEdit={()=> handleEditButtonClick(note)} onDelete={()=> handleDelete(note._id)} onMoreDetails={()=>handleMoreDetails(note._id)}/>
                    </div>
                )
            }
        </div>
    </div>
  );
}

export default Dashboard;
