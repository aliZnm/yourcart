import AddButton from "./AddButton";
import { useState, useEffect } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import ProductCard from "./productCard";
import NewProductForm from "./NewProductForm";
import { db } from "../firebase"; 
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

function ShoppingList({ user }) {
  const [products, setProducts] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [newProductBarcode, setNewProductBarcode] = useState(null);
  const [scannedImage, setScannedImage] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notFound, setNotFound] = useState(false)
  const [searchMessage, setSearchMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const spotlightProduct = (id) =>{
    setHighlightedId(id);

    const el = document.getElementById(`product-${id}`);
    el?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setTimeout(() =>{
      setHighlightedId(null);
    }, 2000);
  };

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if(!query){
      setSearchMessage("");
      setNotFound(false);
      return;
    }

    const match = products.find(p => p.name.toLowerCase() === query);

    if(match){
      spotlightProduct(match.id);
      setSearchMessage("Product exists.");
      setNotFound(false);
    } else{
      setSearchMessage("");
      setNotFound(true);
    }
  };

  useEffect(() => {
  if (!searchQuery) {
    setNotFound(false);
    return;
  }

  const match = products.find(p =>
    p.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  if (match) {
    spotlightProduct(match.id);
    setNotFound(false);
  } else {
    setNotFound(true);
  }
}, [searchQuery, products]);


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
      const cardEl = document.getElementById(`product-${existing.id}`);
      if(cardEl){
        cardEl.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setHighlightedId(existing.id);
        setTimeout(() =>{
          setHighlightedId(null);
        }, 2000);
      }
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
    const exists = products.find(
      (p) => p.name.toLowerCase() === product.name.trim(). toLowerCase()
    );

    if(exists){
      spotlightProduct(exists.id);
      setSearchMessage("Product already exists.");
      setNewProductBarcode(null);
      return;
    }

    saveProductToFirebase(product);
    setNewProductBarcode(null);
    setSearchMessage("");
  };





  const handleCancel = () => {
    setNewProductBarcode(null);
  };


  const handleEditProduct = (id) =>{
    const product = products.find(p => p.id === id);
    setEditingProduct(product);
    setNewProductBarcode("manual");
  };

  const handleDeleteProduct =  (id) => {
    setDeleteTarget(id);
  };

  return (
    <>
    <div className="page-container">
      <h2 className="page-title">Shopping List</h2>
     
<form
  onSubmit={(e) => {
    e.preventDefault();
    handleSearch(); 
  }}
  style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
  <input
  className="search-bar"
    type="text"
    placeholder="Search product..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{
      flex: 1,
      padding: "6px 10px", 
      borderRadius: "6px",
      border: "none",
      fontSize: "14px",
      height: "25px",
      backgroundColor: "#c9c9df"
    }}
  />
  
</form>
{searchMessage && <p style={{color: "green", backgroundColor: "#d4fcd4", padding: "5px", borderRadius: "6px", width: "fit-content"}}>{searchMessage}</p>}
{notFound && <p style={{ color: "red", marginBottom: "10px" }}>Not found</p>}

      {(newProductBarcode || editingProduct) && (
        <NewProductForm
          barcode={editingProduct?.barcode || newProductBarcode || ""}
          scannedImage={editingProduct?.image || scannedImage}
          initialData={editingProduct}
          isEditing={!!editingProduct}
          onSubmit={(product) =>{
           const duplicate = products.find(
            (p) =>
              p.name.toLowerCase() === product.name.trim().toLowerCase() &&
            p.id !== editingProduct?.id
           );

           if(duplicate){
            spotlightProduct(duplicate.id);
            setSearchMessage("Product already exists.");
            return;
           }
           
            if(editingProduct){
            updateDoc(
              doc(db, "users", user.uid, "items", editingProduct.id),
              product
            );
            setEditingProduct(null);
          } else{
            saveProductToFirebase(product);
          }

          setNewProductBarcode(null);
          setSearchMessage("");
        }}
        onCancel={() =>{
          setEditingProduct(null);
          handleCancel();
        }}
        />
      )}

      {scanning && (
        <div style={{ marginTop: "10px" }}>
          <BarcodeScanner
            onUpdate={(err, result) => {
              if (result) handleScan(result.text);
            }}
           
          />
        </div>
      )}

      <div className="items-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            store={product.store}
            image={product.image}
            highlighted={highlightedId === product.id}
            dimmed={highlightedId && highlightedId !== product.id}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </div>

    <AddButton
        onScan={() => setScanning(true)}
        onManual={() => setNewProductBarcode("manual")}
      />

      {deleteTarget && (
        <>
          <div
          onClick={() => setDeleteTarget(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.55)",
            zIndex: 100,
          }}
          />

          <div
          className="modal-box"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            tramsform: "translate(-50%, -50%)",
            zIndex: 101,
          }}>
            <h3>Delete Product?</h3>
            <p>Are you sure you want to delete this product?</p>

            <div style={{display: "flex", gap: "30px", marginTop: "20px"}}>
              <button
              className="delete-option-btn"
              onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>

              <button
              className="delete-option-btn delete"
              onClick={async () => {
                const id = deleteTarget;
                setDeleteTarget(null);
                await deleteDoc(doc(db, "users", user.uid, "items", id)
                );
                setDeleteTarget(null);
              }}>
                Delete
              </button>
            </div>
          </div>
        </>
      )}
     
    </>

    
  );
}

export default ShoppingList;
