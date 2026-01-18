import { useState, useRef, useEffect } from "react";

function ProductCard({
    id, 
    name, 
    price, 
    store, 
    image, 
    highlighted, 
    dimmed,
    onEdit,
    onDelete
}) {

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() =>{
        const handleClickOutside = (e) =>{
            if(menuRef.current && !menuRef.current.contains(e.target)){
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    return(
        <div 
        id={`product-${id}`}
        className={`product-card
            ${highlighted ? "highlighted" : ""}
            ${dimmed ? "dimmed" : ""}
            `}
            style={{position: "relative"}}>

                <button
                onClick={() => setMenuOpen((prev) => !prev)}
                style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    background: "none",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    zIndex: 5,
                }}>
                    ⋮
                </button>

                <div 
                ref={menuRef}
                className={`product-menu ${menuOpen ? "open" : ""}`}>
                    <button
                    className="menu-btn edit"
                        onClick={() =>{
                            setMenuOpen(false);
                            onEdit?.(id);
                        }}
                        style={menuItemStyle}>
                            Edit
                        </button>
                        <button
                        className="menu-btn delete"
                        onClick={() =>{
                            setMenuOpen(false);
                            onDelete?.(id);
                        }}>
                            Delete
                        </button>
                </div>
            <h4 className="product-name">{name}</h4>
            <p className="product-store">{store || "Store N/A"}</p>

            <div
            style={{
            width: "120px",
            height: "120px",
            margin: "0 auto",   
            backgroundColor: "#e0e0ff",
            borderRadius: "8px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}>
                {image ? (
                    <img src={image} alt={name}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}/>
                ) : (
                    <span style={{ color: "#999", fontSize: "14px" }}>No Image</span>
                )}
            </div>
            
            <p className="product-price" >{price ? `${price}` : "Price N/A"}</p>

        </div>
    );
}

const menuItemStyle = {
     padding: "10px 14px",
    width: "100%",
    border: "none",
    textAlign: "center",   
    cursor: "pointer",
    display: "flex",       
    alignItems: "center",
    justifyContent: "center"
}

export default ProductCard;