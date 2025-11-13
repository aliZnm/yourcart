import { useEffect, useState } from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ShoppingList from "./components/ShoppingList";
import './App.css';

const devMode = true;

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
   
useEffect(() =>{
  if(devMode){
    setUser({displayName: "Developer"});
  }
}, []);
  return(
    <div className="app-container">
      {user ? (
        <ShoppingList user={user} /> 
      ) : showLogin ? (
        <LoginForm setUser={setUser} toggleForm={() => setShowLogin(false)} />
      ) : (
        <SignupForm setUser={setUser} toggleForm={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default App
