import { auth, googleProvider, appleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { googleLogo } from '../assets/google-png-logo.png'
import { appleLogo } from '../assets/Apple_logo_white.svg.png'

export default function LoginForm({setUser, toggleForm}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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

    const handleGoogleLogin = async () =>{
        try{
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
        }
        catch (err){
            setError(err.message);
        }
    };

    const handleAppleLogin = async ()=>{
        try{
            const result = await signInWithPopup(auth, appleProvider);
            setUser(result.user);
        }
        catch(err){
            setError(err.message);
        }
    };


    return(
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                {error && <p>{error}</p>}
                <button type="submit">Login</button>
            </form>

            <div className="social-login">
                <button className="google-button" onClick={handleGoogleLogin}>Google
                    <img className="logos" src={googleLogo} />
                </button>

                <button className="apple-button" onClick={handleAppleLogin}>Apple
                    <img className="logos" src={appleLogo} />
                </button>
            </div>
            <p>Don't have an account? <button onClick={toggleForm}>Sign Up</button></p>
        </div>
    );
}

