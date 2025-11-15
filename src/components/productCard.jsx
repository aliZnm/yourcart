function ProductCard({name, price, store, image}){
    return(
        <div className="product-card"
>
            <h4 className="product-name">{name}</h4>
            <p className="product-store">{store || "Store N/A"}</p>

            <div
            style={{
            width: "120px",
            height: "120px",
            margin: "0 auto",   // centers the image
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
            
            <p className="product-price" >{price ? `$${price}` : "Price N/A"}</p>

        </div>
    );
}

export default ProductCard;