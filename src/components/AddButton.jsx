import { Bold, Weight } from "lucide-react";
import { useEffect, useState, useRef } from "react";


function AddButton({onScan, onManual}){
    
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(()=>{
        function handleClickOutside(event){
            if(wrapperRef.current && !wrapperRef.current.contains(event.target)){
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () =>{
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.55)", // dimming effect
            zIndex: 10,
          }}
        />
      )}

      <div
        className="add-button-wrapper"
        ref={wrapperRef}
        style={{
          position: "fixed",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 100, 
        }}
      >
        <button
          className="add-button"
          onClick={() => setOpen(!open)}
          style={{ fontSize: "45px" }}
        >
          +
        </button>

        {open && (
          <div
            className="add-options"
            style={{
              marginBottom: "160px",
              display: "flex",
              gap: "40px",
              justifyContent: "center",
            }}
          >
            <button
              className="add-option-button"
              onClick={() => {
                onScan();
                setOpen(false);
              }}
            >
              <img
                style={{ width: "30px" }}
                src="/src/assets/scan-logo.png"
              />
            </button>

            <button
              className="add-option-button"
              onClick={() => {
                onManual();
                setOpen(false);
              }}
            >
              <img
                style={{ width: "25px", marginLeft: "6px" }}
                src="/src/assets/manual-logo.png"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );

}

export default AddButton;