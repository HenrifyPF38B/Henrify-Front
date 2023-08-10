import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

  const navigate = useNavigate();

  const state = useSelector(state => state);
  const { usersId } = state;
  

  const handleNavigate = (e) =>{
    if(!usersId.id){
      // Toast
    }else{
      navigate(e.target.dataset.id);
    }
  };


  

  return ( 
    <footer className='footer'>
      <div>
        <p>Contact Us</p>
        <div className='d-flex align-items-start flex-column'>
          <span>Soul Life 38B Street, PF</span>
          <span>World</span>
          <span>Zip 35845</span>
        </div>
        <div style={{fontSize:"13px", marginTop:"2rem"}}>
          <i className="fa-solid fa-phone me-2" style={{color:"white"}}></i>
          <a href="tel:+17866578903" style={{textDecoration:"none", color:"white"}}>+17866578903</a>
        </div>
        <div style={{fontSize:"13px", marginTop:"2rem"}}>
          <i className="fa-solid fa-envelope me-2"></i>
          <a href="mailto:henrifyb@gmail.com" style={{textDecoration:"none", color:"white"}}>henrifyb@gmail.com</a>
        </div>
        <div className='mt-4 d-flex align-items-center gap-10'>
          <i className="fa-brands fa-github"></i>
          <i className="fa-brands fa-instagram"></i>
        </div>
      </div>
      <div className='d-flex align-items-start flex-column gap-10'>
        <p>Information</p>
        <span onClick={()=> navigate("/information/privacy-policy")}>Privacy Policy</span>
        <span onClick={()=> navigate("/information/refund-policy")}>Refund Policy</span>
        <span onClick={()=> navigate("/information/shipping-policy")}>Shipping Policy</span>
        <span onClick={()=> navigate("/information/terms")}>Terms Of Service</span>
      </div>
      <div className='d-flex align-items-start flex-column gap-10'>
        <p>FAQ</p>
        <span onClick={()=> navigate("/information/faq-1")}>How do I create an account?</span>
        <span onClick={()=> navigate("/information/faq-2")}>How do I make a purchase?</span>
        <span onClick={()=> navigate("/information/faq-3")}>Can I reset my password?</span>
        <span onClick={()=> navigate("/information/faq-4")}>Can I delete my account?</span>
        <span onClick={()=> navigate("/information/faq-5")}>How do I see my orders?</span>
      </div>
      <div className='d-flex align-items-start flex-column gap-10'>
        <p>Quick Links</p>
        <span onClick={handleNavigate} data-id="favorites">Your Favorites</span>
        <span onClick={handleNavigate} data-id="create">Create Playlist</span>
        <span onClick={handleNavigate} data-id="account">Your Account</span>
        <span onClick={handleNavigate} data-id="seeAll/playlists">Popular Playlists</span>
        <span onClick={handleNavigate} data-id="seeAll/albums">Popular Albums</span>
      </div>
    </footer>
   );
}
 
export default Footer;