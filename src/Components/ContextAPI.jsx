import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Context = createContext();

export default function ContextAPI({ children }) {

    const firebaseUser = localStorage.getItem('firebase_user');
    const [isLogin, setIsLogin] = useState(firebaseUser ? true : false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);
    const provider = new GoogleAuthProvider();

    const googleLogin = () => {
        setIsGoogleLogin(true);

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                localStorage.setItem('firebase_user', user.uid);
                setIsLogin(true); 
                setIsGoogleLogin(false);
                toast.success("Login Successfully");

                navigate('/');

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                setIsGoogleLogin(false);
                toast.error(errorMessage);
            });
        setIsGoogleLogin(false);
    }

    useEffect(() => {
        const user = localStorage.getItem('firebase_user');
        if (user) {
            setIsLogin(true);
        }
    }, [])

    const register = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
            .then((userCredential) => {
                const user = userCredential.user;

                localStorage.setItem('firebase_user', user.uid);
                setIsLogin(true); // Update login state
                setIsLoading(false);
                toast.success("Registered Successfully");

                navigate('/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                setIsLoading(false);
                toast.error(errorMessage);
            });
    }

    const login = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const auth = getAuth();
        signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
            .then((userCredential) => {
                const user = userCredential.user;

                localStorage.setItem('firebase_user', user.uid);
                setIsLogin(true); // Update login state
                setIsLoading(false);
                toast.success("Login Successfully");

                navigate('/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                setIsLoading(false);
                toast.error(errorMessage);
            });
    }

    const logout = () => {
        localStorage.removeItem('firebase_user');
        setIsLogin(false);
        toast.success('Logout Successfully');
        navigate('/');
    }

    const data = { 
        register, 
        login, 
        logout, 
        isLogin, 
        setIsLogin,
        isLoading,
        isGoogleLogin,
        googleLogin 
    };

    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}

export { Context };