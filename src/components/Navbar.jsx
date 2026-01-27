import { useState } from "react";
import "./Navbar.css";
import { arrowIcon } from '../assets/arrow-icon.png'
export default function Navbar({user, onLogout, setPage}){
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
            
            <div className="slide-close-btn"
            onClick={()=> setMenuOpen(false)}>
                <img src={arrowIcon} style={{width: "30px"}} />
            </div>
            
            <h2 className="navbar-title" style={{marginTop: "10px", marginBottom:"40px", fontSize: "30px"}}>
                Account
            </h2>

            <button className="slide-item"
            onClick={()=>{
                setPage("account");
                setMenuOpen(false);
            }}>
                Account Info
            </button>

            <button className="slide-item"
            onClick={()=>{
                setPage("settings");
                setMenuOpen(false);
            }}>
                Settings
            </button>

            <button className="slide-item logout-btn"
            onClick={()=>{
                onLogout();
                setPage("home");
                setMenuOpen(false);
            }}>
                Logout
            </button>
        </div>
      </>
    );
}