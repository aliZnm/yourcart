import { useEffect, useState } from "react";
import LoginForm from "./components/LoginPage"
import SignupForm from "./components/SignupForm";
import ShoppingList from "./components/ShoppingList";
import './App.css';
import Navbar from "./components/Navbar";
import SettingsPage from "./components/SettingsPage";
import AccountInfoPage from "./components/AccountInfoPage";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";

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
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);

  return(
    <>

        <div className="app-container">
          {user && (
            <Navbar user={user} onLogout={async () => {await signOut(auth);}} setPage={setPage} />
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
