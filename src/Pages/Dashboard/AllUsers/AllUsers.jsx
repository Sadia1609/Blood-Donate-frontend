import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';

const AllUsers = () => {

    //because of verifyToken in backend
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([])
    

    useEffect(()=>{
       
        axiosSecure.get('/users')
        .then(res=>{
            setUsers(res.data)
        })
        
    },[axiosSecure])
    console.log(users);
    

    return (
        <div>
            All Users
        </div>
    );
};

export default AllUsers;