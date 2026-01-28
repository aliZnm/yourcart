import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ShoppingList from "./components/ShoppingList";
import './App.css';
import Navbar from "./components/Navbar";
import SettingsPage from "./components/SettingsPage";
import AccountInfoPage from "./components/AccountInfoPage";
import { getRedirectResult } from "firebase/auth";
import { auth } from "./firebase";

const devMode = false;

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [page, setPage] = useState("home");
   
useEffect(() =>{
  if(devMode){
    setUser({
      uid: "dev",
      displayName: "Developer"
    });
  }
}, []);

useEffect(() => {
  getRedirectResult(auth)
    .then(result => {
      if (result?.user) {
        setUser(result.user);
      }
    })
    .catch(err => {
      console.error("Google redirect login error:", err);
    });
}, []);

  return(
    <>

        <div className="app-container">
          {user && (
            <Navbar user={user} onLogout={()=> setUser(null)} setPage={setPage} />
          )}

          {user ? (
            page === "home" ? (
              <ShoppingList user={user} />
            ) : page === "settings" ? (
              <SettingsPage />
            ) : page === "account" ? (
              <AccountInfoPage />
            ) : null
          ) : showLogin ? (
            <LoginForm setUser={setUser} toggleForm={() => setShowLogin(false)} />
          ) : (
            <SignupForm setUser={setUser} toggleForm={()=> setShowLogin(true)} />
          )}
        </div>
    </>
  );
}

export default App
