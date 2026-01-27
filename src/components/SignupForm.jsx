import { auth, googleProvider, appleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { googleLogo } from '../assets/google-png-logo.png'
import { appleLogo } from '../assets/Apple_logo_white.svg.png'

function SignupForm({setUser, toggleForm}){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async (e) =>{
        e.preventDefault();
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name
            });
            
            setUser(userCredential.user);
        }
        catch(err){
            setError(err.message);
        }
    };


    const handleGoogleSignup = async() =>{
        try{
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
        }
        catch(err){
            setError(err.message);
        }
    };


    const handleAppleSignup = async() =>{
        try{
            const result = await signInWithPopup(auth, appleProvider);
            setUser(result.user);
        }
        catch (err){
            setError(err.message)
        }
    };




    return(
        <div className="auth-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSignUp}>
                <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
                {error && <p>{error}</p>}
                <button type="submit">Sign Up</button>
            </form>

            <div className="social-login">
                <button className="google-button" onClick={handleGoogleSignup}>Google
                    <img className="logos" src={googleLogo} />
                </button>

                <button className="apple-button" onClick={handleAppleSignup}>Apple
                    <img className="logos" src={appleLogo} />
                </button>
            </div>

            <p>Already have an account? <button onClick={toggleForm}>Login</button></p>
        </div>
    );
}
export default SignupForm;
