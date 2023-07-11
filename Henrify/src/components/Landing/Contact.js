import React from 'react'


const LandingContact = ({contactUp, refContact}) => {
  return ( 
    <div ref={refContact} className='landing-contact-wrapper' id='landing-contact'>
      <div className={`go-up-contact fa-bounce ${contactUp ? "" : "hide"}`} onClick={()=> document.getElementById("landing-panel").scrollIntoView()}>
        <i className="fa-solid fa-arrow-up" style={{color:"white"}}></i>
      </div>
      <div className="landing-contact-title">
        <h2>Contact Us</h2>
      </div>
      <ul className='landing-contact-social-icons-ul'>
        <li>
          <a href="#">
            <i className="fa-brands fa-github-alt"></i>
            <span>- GitHub</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa-brands fa-twitter"></i>
            <span>- Twitter</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
            <span>- Instagram</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa-brands fa-facebook-f"></i>
            <span>- Facebook</span>
          </a>
        </li>
      </ul>
    </div>
   );
}
 
export default LandingContact;

