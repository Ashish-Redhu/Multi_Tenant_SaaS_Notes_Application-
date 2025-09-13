import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InfoSection from '../components/InfoSection';
import homeBg from "../assets/homeBg.png";

const Home = ({setShowLogin}) => {
    const handleClick = ()=>{
        setShowLogin((prev)=> !prev);
    }
    return (
        <div className="font-sans ">
            <Header setShowLogin={setShowLogin}/>
            <div 
                className="flex flex-col justify-center items-center bg-cover bg-center w-full" 
                style={{ 
                    backgroundImage: `url(${homeBg})`, 
                    height: '80vh', // 80% of viewport height
                    opacity: 1,
                }}
            >
                {/* <h1 className="text-9xl text-white font-bold mb-4">NoteSphere</h1> */}
                <p className="text-2xl text-whitetext-center px-4 m-6">
                    A Multi-Tenant SaaS Notes Application that allows multiple companies to securely manage and organize their notes. Each tenant has isolated access, enabling seamless collaboration within their organization. The application features role-based access, intuitive UI, and real-time note management to enhance productivity across teams
                </p>
                <h2 className='text-3xl font-bold'>Multi Tenant SaaS Notes Application</h2>
            </div>
            <InfoSection />
            <div className="flex justify-center my-10 w-1/2 mx-auto">
                <button className="w-full  text-white !bg-gray-800 !text-2xl"
                    onClick={handleClick}
                >
                    Login <span className='text-sm text-gray-500'>  with the ID provided by your company</span>
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
