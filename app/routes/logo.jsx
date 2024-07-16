import React, { useState } from 'react';
import '../assets/logo.css';

function Logo({ onNext, onPrev, onLogoUpload }) {
  const [primaryLogo, setPrimaryLogo] = useState(null);
  const [secondaryLogo, setSecondaryLogo] = useState(null);

  const handleFileChange = (event, setLogo) => {
    const file = event.target.files[0];
    if (file) {
      setLogo(file);
      onLogoUpload({ primaryLogo: event.target.id === 'primaryLogo' ? file : primaryLogo, secondaryLogo: event.target.id === 'secondaryLogo' ? file : secondaryLogo });
    }
  };

  const handleDelete = (setLogo, logoType) => {
    setLogo(null);
    onLogoUpload({ primaryLogo: logoType === 'primaryLogo' ? null : primaryLogo, secondaryLogo: logoType === 'secondaryLogo' ? null : secondaryLogo });
  };

  return (
    <div>
      <form>
        <div className='step3-heading'>
          <div className='step3-title'>
            <h2>Step 3 - Asset Upload</h2>
            <p>Upload your core assets so that we can design your shop. Please upload high resolution raster files (JPG or PNG) or vector files (SVG or AI).</p>
          </div>
          <div className='step3-button header'>
            <div className='btn'>
              <button type="button" className='prev' onClick={onPrev}>Previous</button>
              <button type="button" className='prev' onClick={onNext}>Next</button>
            </div>
          </div>
        </div>
        <div className='step-3-form-content '>
          <div className='primary_logo'>
            <div className='logo'>
              <div className='logo_heading'>
                <h2>Primary Logo</h2>
                <p>This will be your site’s core/primary logo.</p>
              </div>
              <div className='logo_image' style={{ display: primaryLogo ? "none" : "block" }}>
                <label className='image_label' htmlFor="primaryLogo">
                  <input type='file' id='primaryLogo' onChange={(event) => handleFileChange(event, setPrimaryLogo)} />
                  <span>Upload</span>
                </label>
              </div>
              {primaryLogo && (
                <div className='logo_view'>
                  <div className='logo_image_preview'>
                    <img src={URL.createObjectURL(primaryLogo)} alt='' />
                  </div>
                  <span className='image_name'>{primaryLogo.name}</span>
                  <button type="button" onClick={() => handleDelete(setPrimaryLogo, 'primaryLogo')}>Delete</button>
                </div>
              )}
            </div>
          </div>
          <div className='secondary_logo'>
            <div className='logo'>
              <div className='logo_heading'>
                <h2>Favicon</h2>
                <p>This will be your site’s favicon.</p>
              </div>
              <div className='logo_image' style={{ display: secondaryLogo ? "none" : "block" }}>
                <label className='image_label' htmlFor="secondaryLogo">
                  <input type='file' id='secondaryLogo' onChange={(event) => handleFileChange(event, setSecondaryLogo)} />
                  <span>Upload</span>
                </label>
              </div>
              {secondaryLogo && (
                <div className='logo_view'>
                  <div className='logo_image_preview'>
                    <img src={URL.createObjectURL(secondaryLogo)} alt='' />
                  </div>
                  <span className='image_name'>{secondaryLogo.name}</span>
                  <button type="button" onClick={() => handleDelete(setSecondaryLogo, 'secondaryLogo')}>Delete</button>
                </div>
              )}
            </div>
          </div>
          <div className='step3-button'>
            <div className='btn'>
              <button type="button" onClick={onPrev}>Previous</button>
              <button type="button" onClick={onNext}>Next</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Logo;
