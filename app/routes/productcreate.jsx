import React from 'react';

function Productcreate({ onNext, onPrev, setDummyProducts }) {
  const handleDummyProductChange = (e) => {
    setDummyProducts(e.target.value);
  };

  return (
    <div>
      <form className='from_no_6'>
        <div className='step-heading' style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "50px" }}>
          <div className='step5-title' style={{ width: "60%" }}>
            <h2 style={{ fontWeight: "bold", fontSize: "large", marginBottom: "10px" }}>Step 6 - Products</h2>
            <p style={{ fontSize: "larger" }}>Create Products for your store.</p>
          </div>
          <div className='step5-button' style={{ width: "30%" }}>
            <div className='btn' style={{ display: "flex", gap: "10px" }}>
              <button style={{ padding: "10px", cursor: "pointer", width: "50%" }} onClick={onPrev}>Previous</button>
              <button style={{ padding: "10px", cursor: "pointer", width: "50%" }} onClick={onNext}>Next</button>
            </div>
          </div>
        </div>
        <div className='step6-form-content'>
          <div className='product' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "60px" }}>
            <div className='product_heading'>
              <h2 style={{ fontSize: "large", fontWeight: "bold", marginBottom: "10px" }}>Do you want dummy products in your store?</h2>
              <p style={{ fontSize: "larger" }}>This will create 5 dummy products in your store.</p>
            </div>
            <div className='product_option' style={{ width: "29%" }}>
              <select style={{ padding: "10px", width: "100%", fontSize: "large", textAlign: "center" }} className="shopify_fonts_value" name="primary-font-select" onChange={handleDummyProductChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className='step5-button'>
            <div className='btn' style={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
              <button style={{ padding: "10px", cursor: "pointer", width: "20%" }} onClick={onPrev}>Previous</button>
              <button style={{ padding: "10px", cursor: "pointer", width: "20%" }} onClick={onNext}>Next</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Productcreate;
