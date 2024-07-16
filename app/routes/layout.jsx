import React, { useState } from "react";
import "../assets/layout.css";

function Layout({ onNext, onPrev, onLayoutSelect }) {
  const [selectedLayout, setSelectedLayout] = useState(null);

  const layoutOptions = {
    "Layout 1": ["Hero Banner", "Featured Collection"],
    "Layout 2": ["Hero Banner", "Featured Categories", "Featured Collection"],
    "Layout 3": ["Featured Product", "Featured Collection"],
  };

  const handleLayoutSelect = (layout) => {
    setSelectedLayout(layout);
    onLayoutSelect(layout, layoutOptions[layout]);
  };

  return (
    <div>
      <form>
        <div className="step2-heading">
          <div className="step2-title">
            <h2>Step 2 - Shopify Layout</h2>
            <p>Choose the layout for your selected template.</p>
          </div>
          <div className="step2-button btns">
            <div className="btn">
              <button type="button" className="prev" onClick={onPrev}>
                Previous
              </button>
              <button type="button" className="next" onClick={onNext}>
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="form-content">
          <div className="layout">
            <div className="layout1_options">
              <div className="l1_heading">
                <input
                  type="checkbox"
                  name="layout"
                  value="Layout 1"
                  checked={selectedLayout === "Layout 1"}
                  onChange={() => handleLayoutSelect("Layout 1")}
                />
                <h2>Layout 1</h2>
              </div>
              <div className="l1_values">
                <label>Hero Banner</label>
              </div>
              <div className="l1_values">
                <label>Featured Collection</label>
              </div>
            </div>
            <div className="layout2_options">
              <div className="l2_heading">
                <input
                  type="checkbox"
                  name="layout"
                  value="Layout 2"
                  checked={selectedLayout === "Layout 2"}
                  onChange={() => handleLayoutSelect("Layout 2")}
                />
                <h2>Layout 2</h2>
              </div>
              <div className="l2_values">
                <label>Hero Banner</label>
              </div>
              <div className="l2_values">
                <label>Featured Categories</label>
              </div>
              <div className="l2_values">
                <label>Featured Collection</label>
              </div>
            </div>
            <div className="layout3_options">
              <div className="l3_heading">
                <input
                  type="checkbox"
                  name="layout"
                  value="Layout 3"
                  checked={selectedLayout === "Layout 3"}
                  onChange={() => handleLayoutSelect("Layout 3")}
                />
                <h2>Layout 3</h2>
              </div>
              <div className="l3_values">
                <label>Featured Product</label>
              </div>
              <div className="l3_values">
                <label>Featured Collection</label>
              </div>
            </div>
          </div>
        </div>
        <div className="end btn">
          <button type="button" className="endprev" onClick={onPrev}>
            Previous
          </button>
          <button type="button" className="endnext" onClick={onNext}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default Layout;
