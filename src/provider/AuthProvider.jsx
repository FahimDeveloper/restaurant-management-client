import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import Swal from "sweetalert2";
import axios from "axios";

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        return signOut(auth)
    }
    const continueWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }
    const successLogin = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully login',
            showConfirmButton: false,
            timer: 1500
        })
    }
    const successRegister = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully create an account',
            showConfirmButton: false,
            timer: 1500
        })
    }
    const authError = (error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error}`,
        })
    }
    const authInfo = {
        user,
        loading,
        signUp,
        signIn,
        logOut,
        continueWithGoogle,
        successLogin,
        successRegister,
        authError
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                axios.post("https://restaurant-management-server-eight.vercel.app/jwt", user.email).then(data => {
                    localStorage.setItem('access-token', data.data);
                    setLoading(false);
                })
            } else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        })
        return () => {
            return unsubscribe();
        }
    }, [auth])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;