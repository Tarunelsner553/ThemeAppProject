import React, { useState } from 'react';
import { ColorPicker } from '@shopify/polaris';
import '../assets/color.css';

function Color({ onColorChange, onNext, onPrev }) {
  const [color, setColor] = useState({ hue: 120, brightness: 1, saturation: 1 });
  const [color2, setColor2] = useState({ hue: 240, brightness: 1, saturation: 1 });
  const [hexColor, setHexColor] = useState("#00FF00");
  const [hexColor2, setHexColor2] = useState("#0000FF");

  const handleColorChange = (color) => {
    setColor(color);
    const hex = hsvToHex(color.hue, color.saturation, color.brightness);
    setHexColor(hex);
    onColorChange('primary', hex);
  };

  const handleColorChange2 = (color) => {
    setColor2(color);
    const hex = hsvToHex(color.hue, color.saturation, color.brightness);
    setHexColor2(hex);
    onColorChange('secondary', hex);
  };

  const handleHexChange = (event) => {
    const hex = event.target.value;
    setHexColor(hex);
    const { hue, saturation, brightness } = hexToHsv(hex);
    setColor({ hue, saturation, brightness });
    onColorChange('primary', hex);
  };

  const handleHexChange2 = (event) => {
    const hex = event.target.value;
    setHexColor2(hex);
    const { hue, saturation, brightness } = hexToHsv(hex);
    setColor2({ hue, saturation, brightness });
    onColorChange('secondary', hex);
  };

  const hsvToHex = (hue, saturation, brightness) => {
    const rgb = HSVtoRGB(hue, saturation, brightness);
    return RGBtoHex(rgb.r, rgb.g, rgb.b);
  };

  const hexToHsv = (hex) => {
    const rgb = hexToRGB(hex);
    return RGBtoHSV(rgb.r, rgb.g, rgb.b);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      primaryColor: hexColor,
      secondaryColor: hexColor2
    };

    fetch('https://auditor-plates-hk-vital.trycloudflare.com/api/color', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='step4-heading'>
          <div className='step4-title'>
            <h2>Step 4 - Brand Colors</h2>
            <p>These will be the core colors used on your store for fonts, headers, and backgrounds.</p>
          </div>
          <div className='step2-button'>
            <div className='btn'>
              <button className='prev' onClick={onPrev}>Previous</button>
              <button className='prev' onClick={onNext}>Next</button>
            </div>
          </div>
        </div>
        <div className='step4-form-content'>
          <div className='color'>
            <div className='color_title'>
              <h2>Primary color</h2>
              <p>This is the primary color of your brand.</p>
            </div>
            <div className='color_value'>
              <ColorPicker onChange={handleColorChange} color={color} />
              <input type="text" value={hexColor} onChange={handleHexChange} />
            </div>
          </div>
          <div className='color'>
            <div className='color_title'>
              <h2>Secondary color</h2>
              <p>This is the secondary color of your brand.</p>
            </div>
            <div className='color_value'>
              <ColorPicker onChange={handleColorChange2} color={color2} />
              <input type="text" value={hexColor2} onChange={handleHexChange2} />
            </div>
          </div>
        </div>
        <div className='step2-button'>
          <div className='btn'>
            <button className="sub">Previous</button>
            <button className="sub">Next</button>
          </div>
        </div>
      </form>
    </div>
  );
}

const HSVtoRGB = (h, s, v) => {
  let r, g, b;
  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
    default: r = 0, g = 0, b = 0; break;
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

const RGBtoHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const hexToRGB = (hex) => {
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const RGBtoHSV = (r, g, b) => {
  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;
  let d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0; break;
    }
    h /= 6;
  }
  return { hue: h, saturation: s, brightness: v };
};
export default Color;

