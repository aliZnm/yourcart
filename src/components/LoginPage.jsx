import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { useState } from "react";
import googleLogo from '../assets/google-png-logo.png'
import { sendPasswordResetEmail } from "firebase/auth";

export default function LoginForm({setUser, toggleForm}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        }
        catch(err){
            setError(err.message);
        }
    };

       const handleGoogleLogin = async() =>{
           try{
               const isMobile = /iPhone|iPad|Ipod|Android/i.test(navigator.userAgent);
   
               if(isMobile){
                   await signInWithRedirect(auth, googleProvider);
               } else{
                   const result = await signInWithPopup(auth, googleProvider);
                   setUser(result.user);
               }
           } catch (err){
               setError(err.message);
           }
       };

       const handelForgotPassword = async () => {
        if (!email){
            setError("Please enter your email first");
            return;
        }

        try{
            const actionCodeSettings = {
                url: "https://price-tracker-jgtg-dt6lo8e3c-aliznms-projects.vercel.app",
                handleCodeInApp: false,
            };
            
            await sendPasswordResetEmail(auth, email, actionCodeSettings);
            setSuccessMessage("Password reset email sent. Check spam folder.");
            setError("");
            setTimeout(() => setSuccessMessage(""), 4000);
        } catch(err){
            setError(err.message);
            setSuccessMessage("");
        }
       };


    return(
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                {error && <p>{error}</p>}
                {successMessage && <p style={{color: "green", backgroundColor: "#d4fcd4", padding: "5px", borderRadius: "6px"}}>{successMessage}</p>}
                <button type="submit">Login</button>
            </form>
            <p>
                <button
                type="button"
                onClick={handelForgotPassword}
                style={{fontSize: " 13px"}}>
                    Forgot password?
                </button>
            </p>
            <p style={{color: " #98b0e9"}}>
                ----------- OR -----------
            </p>

            <div className="social-login">
                <button className="google-button" onClick={handleGoogleLogin}>Google
                    <img className="logos" src={googleLogo} />
                </button>

               
            </div>
            <p>Don't have an account? <button onClick={toggleForm}>Sign Up</button></p>
        </div>
    );
}

