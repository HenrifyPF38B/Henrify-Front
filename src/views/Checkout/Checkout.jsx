import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import styles from "./Checkout.module.css";
import { PayPalButtons } from "@paypal/react-paypal-js";

const usStates = [ "AK - Alaska", 
"AL - Alabama", 
"AR - Arkansas", 
"AS - American Samoa", 
"AZ - Arizona", 
"CA - California", 
"CO - Colorado", 
"CT - Connecticut", 
"DC - District of Columbia", 
"DE - Delaware", 
"FL - Florida", 
"GA - Georgia", 
"GU - Guam", 
"HI - Hawaii", 
"IA - Iowa", 
"ID - Idaho", 
"IL - Illinois", 
"IN - Indiana", 
"KS - Kansas", 
"KY - Kentucky", 
"LA - Louisiana", 
"MA - Massachusetts", 
"MD - Maryland", 
"ME - Maine", 
"MI - Michigan", 
"MN - Minnesota", 
"MO - Missouri", 
"MS - Mississippi", 
"MT - Montana", 
"NC - North Carolina", 
"ND - North Dakota", 
"NE - Nebraska", 
"NH - New Hampshire", 
"NJ - New Jersey", 
"NM - New Mexico", 
"NV - Nevada", 
"NY - New York", 
"OH - Ohio", 
"OK - Oklahoma", 
"OR - Oregon", 
"PA - Pennsylvania", 
"PR - Puerto Rico", 
"RI - Rhode Island", 
"SC - South Carolina", 
"SD - South Dakota", 
"TN - Tennessee", 
"TX - Texas", 
"UT - Utah", 
"VA - Virginia", 
"VI - Virgin Islands", 
"VT - Vermont", 
"WA - Washington", 
"WI - Wisconsin", 
"WV - West Virginia", 
"WY - Wyoming"];


const Checkout = () => {

  const [information, setInformation] = useState(true);
  const [shippment, setShippment] = useState(false);
  const [payment, setPayment] = useState(false);

  const [infoForm, setInfoForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
    email: ""
  });

  const [shipSelected, setShipSelected] = useState("Standard");

  const [sameBillingAddress, setsameBillingAddress] = useState(true);
  const [newBillingAddress, setNewBillingAddress] = useState(false);


  const handleInfoForm = (e) =>{
    setInfoForm({
      ...infoForm,
      [e.target.name]: e.target.value
    })
  };

  const handleShip = (e) =>{
    setShipSelected(e.target.dataset.name);
  };

  const handleBilling = (e) =>{
    if(e.target.name === "same"){
      setsameBillingAddress(true);
      setNewBillingAddress(false);
    };
    if(e.target.name === "new"){
      setsameBillingAddress(false);
      setNewBillingAddress(true);
    }
  };

  const handleNextSection = () =>{
    if(information){
      setInformation(false);
      setShippment(true);
      setPayment(false);
    };
    if(shippment){
      setInformation(false);
      setShippment(false);
      setPayment(true);
    }
  };

  const handlePrevSection = () =>{

  };

  useEffect(() => {
    setInformation(true);
    setShippment(false);
    setPayment(false);
  }, []);

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.left}>
        {/* TITLE, SUBTITLE, STEPS */}
        <h2 className={styles.title}>Soul Life</h2>

        <div className={styles.subtitle}>
          <i className="fa-solid fa-lock fa-sm" style={{color:"whitesmoke"}}></i>         
          <span>Checkout</span>
        </div>

        <div className={styles.steps}>
          <span style={{color: (information || shippment || payment) ? "#A3C503" : "lightgrey"}}>Information</span>
          <i className="fa-solid fa-angle-right fa-xs"></i>
          <span style={{color: (shippment || payment) ? "#A3C503" : "lightgrey"}}>Shipping</span>
          <i className="fa-solid fa-angle-right fa-xs"></i>
          <span style={{color: (payment) ? "#A3C503" : "lightgrey"}}>Payment</span>
        </div>

        {/* SECTIONS */}
        {
          information && (
            <div className={styles.information}>
              {/* TITLE */}
              <div className={styles.infoTitle}>
                <p>Ship To</p>
              </div>

              {/* FORM */}
              <div className={styles.formContainer}>
                <form onSubmit={(e)=> e.preventDefault()}>
                  <div className='d-flex flex-column flex-grow-1'>
                    <div className={styles.label}>
                      <label htmlFor="info">First Name</label>
                      <span>Required</span>
                    </div>
                    <input type="text" id='info' name='firstName' onChange={handleInfoForm} value={infoForm.firstName}  />
                  </div>
                  <div className='d-flex flex-column flex-grow-1'>
                    <div className={styles.label}>
                      <label htmlFor="info">Last Name</label>
                      <span>Required</span>
                    </div>
                    <input type="text" id='info' name='lastName' onChange={handleInfoForm} value={infoForm.lastName} />
                  </div>
                  <div className='d-flex flex-column w-100'>
                    <div className={styles.label}>
                      <label htmlFor="info">Street Address</label>
                      <span>Required</span>
                    </div>
                    <input type="text" id='info' name='address' onChange={handleInfoForm} value={infoForm.address} />
                  </div>
                  <div className='d-flex flex-column flex-grow-1'>
                    <div className={styles.label}>
                      <label htmlFor="info">Postal Code</label>
                      <span>Required</span>
                    </div>
                    <input type="text" id='info' name='zipCode' onChange={handleInfoForm} value={infoForm.zipCode} />
                  </div>
                  <div className='d-flex flex-column flex-grow-1'>
                    <div className={styles.label}>
                      <label htmlFor="info">City</label>
                      <span>Required</span>
                    </div>
                    <input type="text" id='info' name='city' onChange={handleInfoForm} value={infoForm.city} />
                  </div>
                  <div className='d-flex flex-column w-100'>
                    <div className={styles.label}>
                      <label htmlFor="info">State</label>
                      <span>Required</span>
                    </div>
                    <select className='form-control form-select' name='state' onChange={handleInfoForm} value={infoForm.state}>
                      {
                        usStates.map((el, index) => {
                          // FL
                          let shortState = el.split("-")[0];

                          // FLORIDA
                          let completeState = el.split("-")[1];

                          return(
                            <option value={shortState} key={index}>
                              {completeState}
                            </option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className='d-flex flex-column flex-grow-1'>
                    <div className={styles.label}>
                      <label htmlFor="info">Email</label>
                      <span>Required</span>
                    </div>
                    <input type="text" id='info' name='email' onChange={handleInfoForm} value={infoForm.email} />
                  </div>
                </form>
              </div>

              {/* NEXT BUTTON */}
              <div className='d-flex justify-content-center'>
                <div className={styles.infoNextButton}>
                  <button onClick={handleNextSection}>Shippment</button>
                </div>
              </div>
            </div>
          )
        }
        {
          shippment && (
            <div className={styles.shipping}>
              
                <h2>Shippment Method</h2>
                <div className={styles.shipMethodContainer}>
                  <div className={styles.shipMethod}>
                    <div className={styles.ups}>
                      <img src="/images/ups.svg" alt="abc" />
                    </div>
                    <div className={styles.shipOptions}>
                      <div className={styles.shipOp}>
                        <span>Standard</span>
                        <i className="fa-brands fa-usps" data-name="Standard" onClick={handleShip} style={{color: shipSelected === "Standard" ? "#A3C503" : "whitesmoke"}}></i>
                      </div>
                      <div className={styles.shipOp}>
                        <span>Express</span>
                        <i className="fa-solid fa-truck-fast" data-name="Express" onClick={handleShip} style={{color: shipSelected === "Express" ? "#A3C503" : "whitesmoke"}}></i>
                      </div>
                      <div className={styles.shipOp}>
                        <span>Premium</span>
                        <i className="fa-solid fa-plane-departure" data-name="Premium" onClick={handleShip} style={{color: shipSelected === "Premium" ? "#A3C503" : "whitesmoke"}}></i>
                      </div>
                    </div>
                    <div className='d-flex justify-content-end mt-5 w-100'>
                      <div className={styles.shippingNextButton}>
                        <button onClick={handleNextSection}>Payment</button>
                      </div>
                    </div>
                  </div>
                  
                </div>
            </div>
          )
        }
        {
          payment && (
            <div className={styles.paymentContainer}>
              <div className={styles.payment}>
                <h2>You are so close...!<i className="fa-solid fa-bag-shopping ms-2"></i></h2>
                <span className={styles.paymentSub}><i className="fa-solid fa-file-invoice-dollar me-1" style={{color:"whitesmoke"}}></i>Please choose a billing address</span>
                {/* BILLING ADDRESS */}
                <div className={styles.billingContainer}>
                  <div className={styles.billing}>
                    <div className='d-flex align-items-center gap-10'>
                      <input type="radio" id='input' name='same' onClick={handleBilling} checked={sameBillingAddress ? true : false}/>
                      <label htmlFor="input">Use same as shipping address</label>
                    </div>
                    <div className='d-flex align-items-center gap-10'>
                      <input type="radio" id='input' name='new' onClick={handleBilling} checked={newBillingAddress ? true : false}/>
                      <label htmlFor="input">Add a new billing address</label>
                    </div>
                    
                  </div>
                </div>
                {/* New Billing Address Form */}
                <div className={styles.newBillingForm} style={{display: newBillingAddress ? "block" : "none"}}>
                      <form onSubmit={(e)=> e.preventDefault()}>
                        <div className='d-flex flex-column flex-grow-1'>
                          <div className={styles.label}>
                            <label htmlFor="info">First Name</label>
                            <span>Required</span>
                          </div>
                          <input type="text" id='info' name='firstName' onChange={handleInfoForm} value={infoForm.firstName}  />
                        </div>
                        <div className='d-flex flex-column flex-grow-1'>
                          <div className={styles.label}>
                            <label htmlFor="info">Last Name</label>
                            <span>Required</span>
                          </div>
                          <input type="text" id='info' name='lastName' onChange={handleInfoForm} value={infoForm.lastName} />
                        </div>
                        <div className='d-flex flex-column w-100'>
                          <div className={styles.label}>
                            <label htmlFor="info">Street Address</label>
                            <span>Required</span>
                          </div>
                          <input type="text" id='info' name='address' onChange={handleInfoForm} value={infoForm.address} />
                        </div>
                        <div className='d-flex flex-column flex-grow-1'>
                          <div className={styles.label}>
                            <label htmlFor="info">Postal Code</label>
                            <span>Required</span>
                          </div>
                          <input type="text" id='info' name='zipCode' onChange={handleInfoForm} value={infoForm.zipCode} />
                        </div>
                        <div className='d-flex flex-column flex-grow-1'>
                          <div className={styles.label}>
                            <label htmlFor="info">City</label>
                            <span>Required</span>
                          </div>
                          <input type="text" id='info' name='city' onChange={handleInfoForm} value={infoForm.city} />
                        </div>
                        <div className='d-flex flex-column w-100'>
                          <div className={styles.label}>
                            <label htmlFor="info">State</label>
                            <span>Required</span>
                          </div>
                          <select className='form-control form-select' name='state' onChange={handleInfoForm} value={infoForm.state}>
                            {
                              usStates.map((el, index) => {
                                // FL
                                let shortState = el.split("-")[0];

                                // FLORIDA
                                let completeState = el.split("-")[1];

                                return(
                                  <option value={shortState} key={index}>
                                    {completeState}
                                  </option>
                                )
                              })
                            }
                          </select>
                        </div>
                        <div className='d-flex flex-column flex-grow-1'>
                          <div className={styles.label}>
                            <label htmlFor="info">Email</label>
                            <span>Required</span>
                          </div>
                          <input type="text" id='info' name='email' onChange={handleInfoForm} value={infoForm.email} />
                        </div>
                      </form>
                    </div>
                {/* SANDBOX ACCOUNT NOTICE */}
                <div className={styles.notice}>
                  <p>Please notice these payments are not real, you will need to create a Sandbox Account in order to proceed with the dummy payment!</p>
                  <div className={styles.icon}>
                    <i className="fa-solid fa-circle-info"></i>
                  </div>
                </div>
                {/* PAYPAL */}
                <div className={styles.paypal}>
                <PayPalButtons 
                        style={{layout: "vertical", color:"silver", shape: "pill"}}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                              purchase_units: [
                                  {
                                      amount: {
                                          value: "100"
                                      },
                                  },
                              ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          
                        }}

                        showSpinner={true}
                      />
                </div>  
              </div>
            </div>
          )
        }
      </div>
      <div className={styles.right}>

      </div>
    </div>
   );
}
 
export default Checkout;