import React from 'react'
import "../assets/review.css";

function Review( { selectedTheme, selectedLayout ,layoutOptions,dummyProducts ,primaryColor,secondaryColor,uploadedLogos,headingFont,bodyFont} ) {
  return (
    <div>
      <form>
        <div className='step7-heading'>
          <div className='step7-title'>
            <h2 >Step 7 - Review</h2>
            <p >Please review the steps to ensure they are correct.</p>
          </div>
        </div>
        <div className='form-content'>
          <div className='step7-button'>
            <div className='review_steps'>
              <div className='review_step1' >
                <div className='step1_heading'>
                  <div><h3>Step 1 - Select Theme</h3></div>
                  <div className='edit'><a  href="./theme.jsx">Edit</a></div>
                </div>
                <hr ></hr>
                <div className='step1_content' >
                  <h2 >Selected Theme</h2>
                  <p>{ selectedTheme }</p>
                </div>
                <hr ></hr>
              </div>
              <div className='review_step2' >
                <div className='step2_heading' >
                  <div><h3 >Step 2 - Select Layout</h3></div>
                  <div className='edit' ><a  href="./theme.jsx">Edit</a></div>
                </div>
                <hr></hr>
                <div className='step2_content' >
                  <h2 >Selected Layout</h2>
                  <div className='layoutwithoptions'>
                    <p>{selectedLayout}</p>
                    <ul>
                      {layoutOptions.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <hr></hr>
              </div>
              <div className='review_step3' >
                <div className='step4_heading' >
                  <div><h3 >Step 3 - Logo </h3></div>
                  <div className='edit' ><a  href="./theme.jsx">Edit</a></div>
                </div>
                <hr></hr>
                <div className='step4_content' >
                  <div className='image1'>
                    <h2 >Primary Logo </h2>
                    <div className='imgval'>
                      {uploadedLogos.primaryLogo && <img src={URL.createObjectURL(uploadedLogos.primaryLogo)} alt='Primary Logo' />}
                    </div>
                  </div>
                  <div className='image2'>
                    <h2>Favicon</h2>
                    <div className='imgval'>
                      {uploadedLogos.secondaryLogo && <img src={URL.createObjectURL(uploadedLogos.secondaryLogo)} alt='Secondary Logo' />}
                    </div>
                  </div>
                </div>
                <hr></hr>
              </div>
              <div className='review_step4' >
                <div className='step3_heading' >
                  <div><h3 >Step 4 - Brand Color </h3></div>
                  <div className='edit' ><a  href="./theme.jsx">Edit</a></div>
                </div>
                <hr></hr>
                <div className='step3_content' >
                  <div className='step3color'>
                    <h2 >PrimaryColor </h2>
                    <h2>secondaryColor</h2>
                  </div>
                  <div className='step3colorval'>
                    <div className='step3_primary'>
                      <span class="dot" style={{backgroundColor:primaryColor}}></span>
                      <p>{primaryColor}</p>
                    </div>
                    <div className='step3_sec'>
                      <span class="dot" style={{backgroundColor:secondaryColor}}></span>
                      <p>{secondaryColor}</p>
                    </div>
                  </div>
                </div>
                <hr></hr>
              </div>
              <div className='review_step5' >
                <div className='step5_heading' >
                  <div><h3 >Step 5 - Fonts </h3></div>
                  <div className='edit' ><a  href="./theme.jsx">Edit</a></div>
                </div>
                <hr></hr>
                <div className='step5_content' >
                  <div className='headingfonts'>
                    <h2 >Heading Fonts  </h2>
                    <p>{headingFont}</p>
                  </div>
                  <div className='bodyfonts'>
                    <h2>Body Fonts</h2>
                    <p>{bodyFont}</p>
                  </div>
                </div>
                <hr></hr>
              </div>
              <div className='review_step6' >
                <div className='step1_heading' >
                  <div><h3 >Step 6 -create product</h3></div>
                  <div className='edit' ><a  href="./theme.jsx">Edit</a></div>
                </div>
                <hr></hr>
                <div className='step6_content' >
                  <h2 >want dummy Products on your store? </h2>
                  <p>{dummyProducts}</p>
                </div>
                <hr></hr>
              </div>
              <div className='end'>
                <div className='end_title' >
                  <h2 >Next step</h2>
                  <div className='end_info'>
                    <p>If all of the information above is correct, click Submit to send in the details for production. If You have any query contact our support</p>
                    <p >Please refer to the Support page if you have any questions and/or need assistance.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='btn' >
              <button >Previous</button>
              <button >Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Review
