import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // New loading state
    const [totalUsersInTenancy, setTotalUsersInTenancy] = useState(0);
    const backendURI = import.meta.env.VITE_BACKEND_URI;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${backendURI}/auth`, { withCredentials: true });
                setUser(response.data.user);
                setIsLoggedIn(true);
            } catch (error) {
                setUser(null);
                setIsLoggedIn(false);
                console.log(`User not logged in ${error}`);
            }finally {
                setLoading(false); // Set loading false once request completes
            }
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, loading, totalUsersInTenancy, setTotalUsersInTenancy }}>
            {children}
        </UserContext.Provider>
    );
};
