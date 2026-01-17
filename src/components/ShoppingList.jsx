import AddButton from "./AddButton";
import { useState, useEffect } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import ProductCard from "./productCard";
import NewProductForm from "./NewProductForm";
import { db } from "../firebase"; 
import { collection, addDoc, onSnapshot } from "firebase/firestore";

function ShoppingList({ user }) {
  const [products, setProducts] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [newProductBarcode, setNewProductBarcode] = useState(null);
  const [scannedImage, setScannedImage] = useState("");
  useEffect(() => {
    if (!user) return;

    const productsRef = collection(db, "users", user.uid, "items");

    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const loadedProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(loadedProducts);
    });

    return () => unsubscribe();
  }, [user]);

  const fetchProduct = async (barcode) => {
    try {
      const res = await fetch(
        `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`
      );
      const data = await res.json();

      if (data.items && data.items.length > 0) {
        const item = data.items[0];
        return{
          barcode,
          name: item.title || "",
          price: "",
          store: "",
          image: item.images?.[0] || "",
        };
            }
      return null;
    } catch {
      return null;
    }
  };

  const saveProductToFirebase = async (product) => {
    try {
      await addDoc(collection(db, "users", user.uid, "items"), product);
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleScan = async (barcode) => {
    setScanning(false);
    const existing = products.find((p) => p.barcode === barcode);
    if (existing) {
      alert(
        `Item already scanned!\nName: ${existing.name}\nPrice: ${existing.price}\nStore: ${existing.store}`
      );
      return;
    }

    const product = await fetchProduct(barcode);
    if (!product) {
      setScannedImage("");
      setNewProductBarcode(barcode);
    } else if(!product.name) {
      setScannedImage(product.image || "");
      setNewProductBarcode(barcode);
    } else{
      saveProductToFirebase(product);
    }
  };

  const handleAddProduct = (product) => {
    saveProductToFirebase(product);
    setNewProductBarcode(null);
  };

  const handleCancel = () => {
    setNewProductBarcode(null);
  };

  return (
    <>
    <div className="page-container">
      <h2 className="page-title">Shopping List</h2>

      {newProductBarcode && (
        <NewProductForm
          barcode={newProductBarcode !== "manual" ? newProductBarcode : ""}
          scannedImage={scannedImage}
          onSubmit={handleAddProduct}
          onCancel={handleCancel}
        />
      )}

      {scanning && (
        <div style={{ marginTop: "10px" }}>
          <BarcodeScanner
            onUpdate={(err, result) => {
              if (result) handleScan(result.text);
            }}
            width={400}
          />
        </div>
      )}

      <div className="items-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            store={product.store}
            image={product.image}
          />
        ))}
      </div>
    </div>

    <AddButton
        onScan={() => setScanning(true)}
        onManual={() => setNewProductBarcode("manual")}
      />
    </>
  );
}

export default ShoppingList;
