import { useEffect, useState, useRef } from "react";

function NewProductForm({barcode, scannedImage, onSubmit, onCancel, initialData}){
    const [name, setName] = useState(initialData?.name || "");
    const [price, setPrice] = useState(initialData?.price || "$0.00");
    const [store, setStore] = useState(initialData?.store || "");
    const [image, setImage] = useState("");
    const nameInputRef = useRef(null);

    useEffect(() =>{
        nameInputRef.current?.focus();
    }, []);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (!name) return;
        onSubmit({
            barcode, 
            name, 
            price, 
            store, 
            image: image || scannedImage || "",
        });
    };

    const handlePriceChange = (e) =>{
        let val = e.target.value;

        val = val.replace(/\D/g, "");
        val = (parseInt(val || "0", 10)/100).toFixed(2);
        setPrice(`$${val}`);
    };


    return (
        <>
            <div className="modal-overlay"
                onClick={onCancel}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.55)",
                    zIndex: 100, 
         }}>

         </div>

            <div  className="modal-box"
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#5254d8",
                        border: "2px solid black",
                        padding: "20px 30px",
                        borderRadius: "12px",
                        zIndex: 101, // above overlay
                        minWidth: "300px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                    }}>
                <button className="modal-close" onClick={onCancel}
                        style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            background: "none",
                            border: "none",
                            fontSize: "22px",
                            cursor: "pointer",
                }}>×</button>

                <h3 className="modal-title" style={{ textAlign: "center", marginBottom: "15px" }}>Add Item</h3>

                <form onSubmit={handleSubmit} className="modal-form" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    
                    {(image || scannedImage) && (
                        <img 
                        src={image || scannedImage}
                        alt="Product Preview"
                        style={{
                            width: "100%",
                            maxHeight: "180px",
                            objectFit: "contain",
                            borderRadius: "8px",
                            background: "#fff",
                            padding: "6px",
                        }}
                        />
                    )}
                    
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="$0.00"
                        value={price}
                        onChange={handlePriceChange}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Store Name"
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                        required
                    />

                    <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if(file){
                            const reader = new FileReader();
                            reader.onloadend = () => setImage(reader.result);
                            reader.readAsDataURL(file);
                        }
                    }} />

                    <button type="submit" className="submit-btn" style={{ padding: "10px", borderRadius: "8px", backgroundColor: "#6b6df0", color: "#fff", fontWeight: "bold" }}>Add</button>
                </form>
            </div>
        </>
    );
}

export default NewProductForm;