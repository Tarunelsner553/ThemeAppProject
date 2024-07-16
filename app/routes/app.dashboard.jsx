// Dashboard.js
import React, { useState } from 'react';
import Theme from './theme';
import Layout from './layout';
import Color from './color';
import Logo from './logo';
import Fonts from './Fonts';
import Review from './review';
import Productcreate from './productcreate';
import { Card } from "@shopify/polaris";

export default function Dashboard() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [layoutOptions, setLayoutOptions] = useState([]);
  const [uploadedLogos, setUploadedLogos] = useState({ primaryLogo: null, secondaryLogo: null });
  const [primaryColor, setPrimaryColor] = useState('#00FF00');
  const [secondaryColor, setSecondaryColor] = useState('#0000FF');
  const [currentStep, setCurrentStep] = useState(1);
  const [headingFont, setHeadingFont] = useState('');
  const [bodyFont, setBodyFont] = useState('');
  const [dummyProducts, setDummyProducts] = useState('yes');

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  const handleLayoutSelect = (layout, options) => {
    setSelectedLayout(layout);
    setLayoutOptions(options);
  };

  const handleLogoUpload = (logos) => {
    setUploadedLogos(logos);
  };

  const handleColorChange = (colorType, color) => {
    if (colorType === 'primary') {
      setPrimaryColor(color);
    } else if (colorType === 'secondary') {
      setSecondaryColor(color);
    }
  };

  const handleNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  return (
    <div className='shopify_div' style={{ margin: "20px" }}>
      <div className='heading' style={{ textAlign: "center", fontSize: "xx-large", marginBottom: "30px" }}>
        <h2 style={{ fontWeight: "bold" }}>Theme Builder</h2>
      </div>
      <div className='main-div' style={{ display: "flex", gap: "20px" }}>
        <div className='sidebar-section' style={{ width: "27%" }}>
          <Card>
            <div className='section'>
              <div className='sidebar'>
                <div className='progress-bar'>
                  <div className='main'>
                    <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "large", fontFamily: "inherit", marginBottom: "30px" }}>Progress Overview</h2>
                    <div className='step1' style={{ cursor: "pointer", display: "flex", alignItems: "center", fontSize: "large", marginBottom: "50px" }} >
                      <input type='radio' style={{ width: "50px", transform: "scale(2.1)" }} checked={currentStep === 1} readOnly />
                      <span>1. Select Theme</span>
                    </div>
                    <div className='step2' style={{ cursor: "pointer", display: "flex", alignItems: "center", fontSize: "large", marginBottom: "50px" }} >
                      <input type='radio' style={{ width: "50px", transform: "scale(2.1)" }} checked={currentStep === 2} readOnly />
                      <span>2. Select Layout</span>
                    </div>
                    <div className='step3' style={{ cursor: "pointer", display: "flex", alignItems: "center", fontSize: "large", marginBottom: "50px" }} >
                      <input type='radio' style={{ width: "50px", transform: "scale(2.1)" }} checked={currentStep === 3} readOnly />
                      <span>3. Select Logo</span>
                    </div>
                    <div className='step4' style={{ cursor: "pointer", display: "flex", alignItems: "center", fontSize: "large", marginBottom: "50px" }} >
                      <input type='radio' style={{ width: "50px", transform: "scale(2.1)" }} checked={currentStep === 4} readOnly />
                      <span>4. Select Color</span>
                    </div>
                    <div className='step5' style={{ cursor: "pointer", display: "flex", alignItems: "center", fontSize: "large", marginBottom: "50px" }} >
                      <input type='radio' style={{ width: "50px", transform: "scale(2.1)" }} checked={currentStep === 5} readOnly />
                      <span>5. Select Fonts</span>
                    </div>
                    <div className='step6' style={{ cursor: "pointer", display: "flex", alignItems: "center", fontSize: "large", marginBottom: "50px" }} >
                      <input type='radio' style={{ width: "50px", transform: "scale(2.1)" }} checked={currentStep === 6} readOnly />
                      <span>6. Create Product</span>
                    </div>
                    <div className='step7' style={{ cursor: "pointer", display: "flex", alignItems: "center", fontSize: "large" }} >
                      <input type='radio' style={{ width: "50px", transform: "scale(2.1)" }} checked={currentStep === 7} readOnly />
                      <span>7. Review</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className='theme-form' style={{ width: "70%" }}>
          <Card>
            {currentStep === 1 && <Theme onThemeSelect={handleThemeSelect} onNext={handleNextStep} />}
            {currentStep === 2 && <Layout onLayoutSelect={handleLayoutSelect} onNext={handleNextStep} onPrev={handlePrevStep} />}
            {currentStep === 3 && <Logo onLogoUpload={handleLogoUpload} onNext={handleNextStep} onPrev={handlePrevStep} />}
            {currentStep === 4 && <Color onColorChange={handleColorChange} onNext={handleNextStep} onPrev={handlePrevStep} />}
            {currentStep === 5 && <Fonts onNext={handleNextStep} onPrev={handlePrevStep} setHeadingFont={setHeadingFont} setBodyFont={setBodyFont} />}
            {currentStep === 6 && <Productcreate onNext={handleNextStep} onPrev={handlePrevStep} setDummyProducts={setDummyProducts} />}
            {selectedTheme && selectedLayout && currentStep === 7 && <Review selectedTheme={selectedTheme} selectedLayout={selectedLayout} layoutOptions={layoutOptions} uploadedLogos={uploadedLogos} primaryColor={primaryColor} secondaryColor={secondaryColor} headingFont={headingFont} bodyFont={bodyFont} dummyProducts={dummyProducts} />}
          </Card>
        </div>
      </div>
    </div>
  );
}
