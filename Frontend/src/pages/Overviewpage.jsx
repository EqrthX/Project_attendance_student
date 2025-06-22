import { useEffect } from 'react';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../contexts/AuthContext';
const Overviewpage = () => {
    const {setUser} = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get("http://localhost:3001/protected");
                setUser(response.data.user);
            } catch (error) {
                console.log("fetching users error: ", error);
            }
        }

        fetchUsers();
    },[]);
    
    return (

        <div>
            <h1 className='text-center'>overview</h1>
        </div>
    )
}

export default Overviewpage
