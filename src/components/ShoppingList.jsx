import AddButton from "./AddButton";
import { useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import ProductCard from "./productCard";
import NewProductForm from "./NewProductForm";
//NewsProductForm
function ShoppingList({user, onLogout}){
    const [products, setProducts] = useState([]);
    const [scanning, setScanning] = useState(false);
    const [newProductBarcode, setNewProductBarcode] = useState(null);
    const [showAddOptions, setAddOptions] = useState(false);

    const fetchProduct = async (barcode) =>{
        try{
            const res = await fetch(
                `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`
            );
            const data = await res.json();
            if(data.items && data.items.length >0){
                return {name: data.items[0].title, price: "", store: ""};
            }
            return null;
        }
        catch {
            return null;
        }
    };

    const handleScan = async (barcode) => {
        setScanning(false);
        const existing = products.find((p) => p.barcode === barcode);
        if(existing){
            alert(
                `Item already scanned!\nName: ${existing.name}\nPrice: ${existing.price}\nStore: ${existing.store}`
            );
            return;
        }

        const product = await fetchProduct(barcode);
        if(!product){
            setNewProductBarcode(barcode);
        }
        else{
            setProducts((prev) => [...prev, {barcode, ...product}]);
        }
    };

    const handleAddProduct = (product)=> {
        setProducts((prev) => [...prev, product]);
        setNewProductBarcode(null);
    };

    const handleCancel = () =>{
        setNewProductBarcode(null);
    };

   



    return(

        <div className="page-container">

            <h2 className="page-title">Shopping List</h2>

            {newProductBarcode && (
                <NewProductForm 
                barcode={newProductBarcode !== "manual" ? newProductBarcode : ""}
                onSubmit={handleAddProduct}
                onCancel={handleCancel}/>
            )}




            {scanning && (
                <div style={{marginTop: "10px"}}>
                    <BarcodeScanner
                    onUpdate={(err, result)=>{
                        if(result) handleScan(result.text);
                    }}
                    width={400}
                    />
                    </div>
            )}

            <div className="items-container">
                {products.map((product, i) =>(
                    <ProductCard 
                    key={i} 
                    name={product.name}
                    price={product.price}
                    store={product.store}
                    image={product.image}
                     />
                ))}
            </div>

            <AddButton onScan={() => setScanning(true)} onManual={() => setNewProductBarcode("manual")}/>
        </div>
    );
}

export default ShoppingList;
