import { useEffect, useState } from "react";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/SignupForm";
import ShoppingList from "./components/ShoppingList";
import './App.css';
import Navbar from "./components/Navbar";
import SettingsPage from "./components/SettingsPage";
import AccountInfoPage from "./components/AccountInfoPage";
const devMode = true;

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
