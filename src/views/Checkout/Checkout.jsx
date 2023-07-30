import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import styles from "./Checkout.module.css";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Wallet } from '@mercadopago/sdk-react';
import { PlaylistContext } from '../../contexts/playlistContext';

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

const dummyProducts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2,  3, 4];

const Checkout = () => {

  const navigate = useNavigate();

  const [information, setInformation] = useState(true);
  const [shippment, setShippment] = useState(false);
  const [payment, setPayment] = useState(false);

  // Los steps (breadcrumb) los controlo con los states de arriba.


  //Cuando el usuario escribe en el form de Information, los datos se ponen en infoForm.
  const [infoForm, setInfoForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
    email: ""
  });

  // SHIPPING METHOD USER SELECTS
  const [shipSelected, setShipSelected] = useState("Standard");
  // Esto es el metodo de envio que elige el usuario, Standard, Express, o Premium.

  const [shippingFee, setshippingFee] = useState('7.50');

  useEffect(() => {
    if(shipSelected === "Standard"){
      setshippingFee('7.50');
    };
    if(shipSelected === "Express"){
      setshippingFee('12.00');
    };
    if(shipSelected === "Premium"){
      setshippingFee('16.75');
    };
  }, [shipSelected]);

  // BILLING ADDRESS
  const [sameBillingAddress, setsameBillingAddress] = useState(true);
  const [newBillingAddress, setNewBillingAddress] = useState(false);
  // Esto es para controlar si el usuario quiere poner una direccion de facturacion nueva, o  usar la misma que la del envio 


  // NEW BILLING ADDRESS FORM
  const [newBillAdd, setNewBillAdd] = useState({
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
    email: ""
  });



  const handleNewBill = (e) =>{
    setNewBillAdd({
      ...newBillAdd,
      [e.target.name]: e.target.value
    })
  };


  const handleInfoForm = (e) =>{
    setInfoForm({
      ...infoForm,
      [e.target.name]: e.target.value
    })
  };
  // Esta funcion, va en el onChange de los inputs de la seccion Information.


  const handleShip = (e) =>{
    setShipSelected(e.target.dataset.name);
  };
  // Esta funcion setea el shipSelected


  const handleBilling = (e) =>{
    if(e.target.name === "same"){
      setsameBillingAddress(true);
      setNewBillingAddress(false);
      setNewBillAdd({
        firstName: "",
        lastName: "",
        address: "",
        zipCode: "",
        city: "",
        state: "",
        email: ""
      });
    };
    if(e.target.name === "new"){
      setsameBillingAddress(false);
      setNewBillingAddress(true);
    }
  };
  // Esto maneja los states de BILLING ADDRESS


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
  // Boton para pasar a la siguiente seccion


  const handlePrevSection = () =>{
    if(shippment){
      setInformation(true);
      setShippment(false);
      setPayment(false);
    };
    if(payment){
      setInformation(false);
      setShippment(true);
      setPayment(false);
    }
  };
  // Boton para pasar a la seccion previa



  useEffect(() => {
    setInformation(true);
    setShippment(false);
    setPayment(false);
  }, []);
  // Esto es para que siempre aparezca la seccion Information primero
  
  
  
  // MERCADO PAGO FETCH
  const [preferenceId, setPreferenceId] = useState(null);
  
  const getPreferenceId = () => {
    fetch("https://mp-get-preference-id.up.railway.app/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({items: [{
        title:"Justin Bieber",
        unit_price: 55,
        quantity: 1,
        picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
        currency_id: "ARS"
      }]}),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((preference) => {
        setPreferenceId(preference.id);
      })
      .catch((error) => {
        console.error(error);
      })
  };

  // en el body le pasamos los itemms
  const handleMp = () => {
    fetch("https://mp-get-preference-id.up.railway.app/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({items: [{
        title:"Justin Bieber",
        unit_price: 55,
        quantity: 1,
        picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
        currency_id: "ARS"
      }]}),
    })
      .then((response) => {
        return response.json();
      })
      .then((preference) => {
        setPreferenceId(preference.id);
        // este es el id que nos trae el back te acordas?
        // y listo
      })
      .catch((error) => {
        console.error(error);
      })
  };



  return ( 
    <div className={styles.wrapper}>
      <div className={styles.left}>
        {/* GO BACK BUTTON */}
        <div className={styles.goBack} onClick={()=> navigate("/home")}>
          <i className="fa-solid fa-caret-left fa-2xl"></i>
        </div>

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
                        <span className={styles.shipOpSmallSpan} style={{color: shipSelected === "Standard" ? "#A3C503" : "lightgrey"}}>5 - 7 Days</span>
                        <i className="fa-brands fa-usps" data-name="Standard" onClick={handleShip} style={{color: shipSelected === "Standard" ? "#A3C503" : "whitesmoke"}}></i>
                      </div>
                      <div className={styles.shipOp}>
                        <span>Express</span>
                        <span className={styles.shipOpSmallSpan} style={{color: shipSelected === "Express" ? "#A3C503" : "lightgrey"}}>3 - 5 Days</span>
                        <i className="fa-solid fa-truck-fast" data-name="Express" onClick={handleShip} style={{color: shipSelected === "Express" ? "#A3C503" : "whitesmoke"}}></i>
                      </div>
                      <div className={styles.shipOp}>
                        <span>Premium</span>
                        <span className={styles.shipOpSmallSpan} style={{color: shipSelected === "Premium" ? "#A3C503" : "lightgrey"}}>Next Day</span>
                        <i className="fa-solid fa-plane-departure" data-name="Premium" onClick={handleShip} style={{color: shipSelected === "Premium" ? "#A3C503" : "whitesmoke"}}></i>
                      </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-5 pt-5 w-100'>
                      <div className={styles.prevButton}>
                        <button onClick={handlePrevSection}>Information</button>
                      </div>
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
                <span className={styles.paymentSub}><i className="fa-solid fa-file-invoice-dollar me-2" style={{color:"whitesmoke"}}></i>Please choose a billing address</span>
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
                          <div className={styles.newBillingFormLabel}>
                            <label htmlFor="info">First Name</label>
                            <span>Required</span>
                          </div>
                          <input type="text" id='info' name='firstName' onChange={handleNewBill} value={newBillAdd.firstName}  />
                        </div>

                        <div className='d-flex flex-column flex-grow-1'>
                          <div className={styles.newBillingFormLabel}>
                            <label htmlFor="info">Last Name</label>
                            <span>Required</span>
                          </div>
                          <input type="text" id='info' name='lastName' onChange={handleNewBill} value={newBillAdd.lastName}  />
                        </div>

                        <div className='d-flex flex-column w-100'>
                          <div className={styles.newBillingFormLabel}>
                            <label htmlFor="info">Street Address</label>
                            <span>Required</span>
                          </div>
                          <input type="text" id='info' name='address' onChange={handleNewBill} value={newBillAdd.address}  />
                        </div>

                        <div className='d-flex flex-column flex-grow-1'>
                          <div className={styles.newBillingFormLabel}>
                            <label htmlFor="info">Postal Code</label>
                            <span>Required</span>
                          </div>
                          <input type="text" id='info' name='zipCode' onChange={handleNewBill} value={newBillAdd.zipCode}  />
                        </div>

                        <div className='d-flex flex-column flex-grow-1'>
                          <div className={styles.newBillingFormLabel}>
                            <label htmlFor="info">City</label>
                            <span>Required</span>
                          </div>
                          <input type="text" id='info' name='city' onChange={handleNewBill} value={newBillAdd.city}  />
                        </div>
                        
                        <div className='d-flex flex-column w-100'>
                          <div className={styles.newBillingFormLabel}>
                            <label htmlFor="info">State</label>
                            <span>Required</span>
                          </div>
                          <select className='form-control form-select' name='state' onChange={handleNewBill} value={newBillAdd.state}>
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
                          <div className={styles.newBillingFormLabel}>
                            <label htmlFor="info">Email</label>
                            <span>Required</span>
                          </div>
                          <input type="text" id='info' name='email' onChange={handleNewBill} value={newBillAdd.email} />
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
                {/* DUMMY SANDBOX ACCOUNTS */}
                <div className={styles.dummyAccounts}>
                  <div className={styles.dummyAccountTitle}>
                    <span><b>You are not in the mood to create an account? Don't worry, you can use these accounts in stead!</b></span>
                    
                      <div className={styles.accountCont}>
                        <div className='d-flex align-items-center mb-2'>
                          <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-mark-color.svg" alt="abc" width={20} />
                          <span style={{color:"#013088"}}><b>Pay<span style={{color:"#3084E3"}}>Pal</span></b></span>
                        </div>
                        <div className='d-flex align-items-center mt-1'>
                          <i className="fa-solid fa-user-secret me-1" style={{color:"#A3C503"}}></i>
                          <span>soul-life@gmail.com</span>
                        </div>
                        <div className='d-flex align-items-center mb-4'>
                          <i className="fa-solid fa-key me-1" style={{color:"#A3C503"}}></i>
                          <span>12345678</span>
                        </div>
                        <div className='d-flex align-items-center mb-2'>
                          <img src="/images/mp2.svg" alt="abc" width={20} style={{borderRadius:"50px"}} className='me-1' />
                          <span><b>Mercado <span style={{color:"white"}}>Pago</span></b></span>
                        </div>
                        <div className='d-flex flex-column align-items-start mt-1'>
                          <span>• APPROVED - <span className={styles.mpDummyA}>Name</span></span>
                          <span>• 12345678 - <span className={styles.mpDummyA}>DNI/ID</span></span>
                          <span>• Mastercard - <span className={styles.mpDummyA}>Card Type</span></span>
                          <span>• 5031 7557 3453 0604 - <span className={styles.mpDummyA}>Card Number</span></span>
                          <span>• 11/25 - <span className={styles.mpDummyA}>Card Expire</span></span>
                          <span>• 123 - <span className={styles.mpDummyA}>Security Code</span></span>
                        </div>
                    </div>
                    
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
                          // Once the payment is approved
                          // Redirect to Home for example

                          
                        }}

                        showSpinner={true}
                      />
                </div>
                {
                  !preferenceId &&
                  <div className='d-flex justify-content-center align-items-center mt-4'>
                    <div className={styles.mp}>
                      <img src="/images/mp2.svg" alt="abc" width={50} />
                      <button onClick={getPreferenceId}>Mercado Pago</button>
                    </div>
                  </div>
                }
                {/* PAY WITH MERCADO PAGO BUTTON */}
                {/* Wallet tiene que estar dentro de una div con el id 'wallet_container', que es la div donde mp va a renderizar el button */}
                {
                  preferenceId &&
                  <div id='wallet_container' onClick={handleMp}>
                    <Wallet initialization={{ preferenceId: preferenceId && preferenceId, redirectMode: "blank"}} />
                  </div>
                }
                {/* PREV BUTTON */}
                <div className='mt-5'>
                  <div className={styles.prevButton}>
                    <button onClick={handlePrevSection}>Shippment</button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
      <div className={styles.right}>
        <div className={styles.products}>
          {dummyProducts.map((el, index) => {
            return(
              <div className={styles.productCard}>
                <div className={styles.productCardLeft}>
                  <div className={styles.productCardImg}>
                    <img src="/images/ari.jpeg" alt="abc" />
                    <div className={styles.quantityIcon}>
                      <span>3</span>
                    </div>
                  </div>
                  <div className={styles.productCardDetails}>
                    <span>Sweetener</span>
                    <span>Ariana Grande</span>
                  </div>
                </div>
                <div className={styles.productCardRight}>
                  <span>$55.76</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.details}>
          <div className={styles.sumContainer}>
            <div className={styles.sumDiv}>
              <span>Subtotal</span>
              <span>$1300</span>
            </div>
            <div className={styles.sumDiv}>
              <span>Taxes</span>
              <span> - </span>
            </div>
            <div className={styles.sumDiv}>
              <span>Shipping Fee</span>
              <span>${shippingFee.split(".")[1].length === 1 ? shippingFee + "0" : shippingFee}</span>
            </div>
          </div>
          <div className={styles.subTotal}>
            <span>Total</span>
            <span>${1300 + Number(shippingFee)}</span>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Checkout;