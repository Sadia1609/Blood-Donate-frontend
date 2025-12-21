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


    const registerWithEmailPassword = (email, pass)=>{
        // console.log(email,pass)
        return createUserWithEmailAndPassword(auth,email,pass)
    }


    const handleGoogleSignin=()=>{
        return signInWithPopup(auth,googleProvider)
    }

console.log(user);


    

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
        axios.get(`http://localhost:5000/users/role/${user.email}`)
               .then(res=>{
               setRole(res.data.role)
               setRoleLoading(false)
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
        
        

    }

    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;