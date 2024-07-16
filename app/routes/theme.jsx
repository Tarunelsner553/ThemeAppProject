import React, { useState } from 'react';
import image from '../assets/dawn.jpg';
import craft from '../assets/craft.jpg';
import '../assets/theme.css';

function Theme({ onThemeSelect, onNext }) {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    onThemeSelect(theme);
  };

  return (
    <div>
      <form>
        <div className="step1-heading">
          <div className="step1-title">
            <h2>Step 1 - Shopify Theme</h2>
            <p>Choose the core theme for your shop.</p>
          </div>
          <div className="step1-button">
            <div className="btn">
              <button type="button" onClick={onNext} disabled={!selectedTheme}>
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="form-content">
          <div className="fields">
            <input
              type="radio"
              name="theme"
              value="Dawn"
              required
              checked={selectedTheme === 'Dawn'}
              onChange={() => handleThemeSelect('Dawn')}
            />
            <label>
              <div className="theme-image">
                <img src={image} alt="Dawn theme" />
              </div>
              <div className="theme-title">
                <h2>Dawn</h2>
                <p>A minimalist theme that lets product images take center stage.</p>
              </div>
              <div className="theme-btn">
                <button type="button" onClick={() => handleThemeSelect('Dawn')}>
                  Select
                </button>
              </div>
            </label>
          </div>
          <div className="fields">
            <input
              type="radio"
              name="theme"
              value="Craft"
              required
              checked={selectedTheme === 'Craft'}
              onChange={() => handleThemeSelect('Craft')}
            />
            <label>
              <div className="theme-image">
                <img src={craft} alt="Craft theme" />
              </div>
              <div className="theme-title">
                <h2>Craft</h2>
                <p>A refined theme that celebrates craftsmanship.</p>
              </div>
              <div className="theme-btn">
                <button type="button" onClick={() => handleThemeSelect('Craft')}>
                  Craft
                </button>
              </div>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Theme;
