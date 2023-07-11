import React from 'react'

const MemberTemplate = ({indicator, name, description, linkGit, linkIg, linkLn, linkUrl }) => {
  return ( 
    <label htmlFor={`s${indicator}`} id={`slide${indicator}`}>
        <div className='slide-card'>
          <div className="slide-image">
            <img src="/images/avatarDummy.jpeg" alt="abc" />
          </div>
          <div className='slide-info'>
              <span className='slide-name'>{name}</span>
              <span className='slide-description'>{description}</span>
              <div className="slide-details">
                <span>Full Stack Developer</span>
              </div>
              {/* ACTIONS */}
              <div className="slide-links">
                <i className="fa-brands fa-github" onClick={()=> window.open(linkGit, "_blank")}></i>
                <i className="fa-brands fa-instagram  fa-xl" onClick={()=> window.open(linkIg, "_blank")}></i>
                <i className="fa-brands fa-linkedin-in" onClick={()=> window.open(linkLn, "_blank")}></i>
                <i className="fa-solid fa-link" onClick={()=> window.open(linkUrl, "_blank")}></i>
              </div>
          </div>
        </div>
      </label>
   );
}
 
export default MemberTemplate;