import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true);
    const [roleLoading, setRoleLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');
    const [userStatus, setUserStatus] = useState('')


    const registerWithEmailPassword = (email, pass)=>{
         setLoading(true)
        return createUserWithEmailAndPassword(auth,email,pass)
    }


    const handleGoogleSignin=()=>{
         setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

// console.log(user);


    

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            
                setUser(currentUser)
                setLoading(false)

        })

      
              return ()=>{
           unsubscribe()
        }
    },[])


    //set role from backend to frontend
    useEffect(()=>{
        if(!user) return;
        axios.get(`https://backend11-nine.vercel.app/users/role/${user.email}`)
               .then(res=>{
               setRole(res.data.role)
               setUserStatus(res.data.status)
               setRoleLoading(false)
               setLoading(false)
               })
    },[user])

    
    



    const authData = {
        registerWithEmailPassword,
        setUser,
        user,
        handleGoogleSignin,
        loading,
        role,
        roleLoading,
        userStatus
        
        

    }

    return <AuthContext.Provider value={authData}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;