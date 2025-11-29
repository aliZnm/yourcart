import { useState } from "react";
import "./Navbar.css";
import { onLog } from "firebase/app";

export default function Navbar({user, onLogout}){
    const [menuOpen, setMenuOpen] = useState(false);

    return(
      <>
        <header className="main-navbar">
            <div className="navbar-title">YourCart</div>

            <button className="navbar-account-btn" onClick={()=> setMenuOpen(true)}>
                <div className="navbar-account-icon"/>
            </button>
        </header>

        {menuOpen && (
            <div className="navbar-slide-overlay"
            onClick={()=> setMenuOpen(false)}/>
        )}

        <div className={`navbar-slide-panel ${menuOpen ? "open" : ""}`}>
            <h2>Account</h2>

            <button className="slide-btn" onClick={onLogout}>
                Logout
            </button>

            <button className="slide-btn"
            onClick={()=> alert("Settings coming soon")}>
                Settings
            </button>
        </div>
      </>
    );
}