import React, {CSSProperties, useRef, useState} from 'react'
import MemberTemplate from '../../templates/membersT';



const LandingPanel = ({refPanel, panelUp}) => {

  const refNacho = useRef();

  const members = [
    {
      name: "Barbara",
      description:"Barbara, from Argentina. 28 Years Old, Full Stack Developer",
      linkGit: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkIg:"https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn:"https://linkedin.com/in/bárbara-lucía-senra",
      linkUrl:"https://github.com/HenrifyPF38B/Henrify-Front"
    },
    {
      name: "Diego",
      description:"Diego, from Colombia. 38 Years Old, Full Stack Developer",
      linkGit: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkIg:"https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn:"https://www.linkedin.com/in/diegohurtado-sales-saas",
      linkUrl:"https://github.com/HenrifyPF38B/Henrify-Front"
    },
    {
      name: "Fauter",
      description:"Fauter, from Argentina. 22 Years Old, Full Stack Developer",
      linkGit: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkIg:"https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn:"https://github.com/HenrifyPF38B/Henrify-Front",
      linkUrl:"https://github.com/HenrifyPF38B/Henrify-Front"
    },
    {
      name: "Gabriela",
      description:"Gabriela, from Venezuela. 22 Years Old, Full Stack Developer",
      linkGit: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkIg:"https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn:"https://github.com/HenrifyPF38B/Henrify-Front",
      linkUrl:"https://github.com/HenrifyPF38B/Henrify-Front"
    },
    {
      name: "Ignacio",
      description:"Ignacio, from Argentina. 22 Years Old, Full Stack Developer",
      linkGit: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkIg:"https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn:"https://github.com/HenrifyPF38B/Henrify-Front",
      linkUrl:"https://github.com/HenrifyPF38B/Henrify-Front"
    },
    {
      name: "Jaider",
      description:"Jaider, from Argentina. 22 Years Old, Full Stack Developer",
      linkGit: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkIg:"https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn:"https://github.com/HenrifyPF38B/Henrify-Front",
      linkUrl:"https://github.com/HenrifyPF38B/Henrify-Front"
    },
    {
      name: "Rocio",
      description:"Rocio, from Argentina. 22 Years Old, Full Stack Developer",
      linkGit: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkIg:"https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn:"https://github.com/HenrifyPF38B/Henrify-Front",
      linkUrl:"https://github.com/HenrifyPF38B/Henrify-Front"
    },
    {
      name: "Sofia",
      description:"Sofia, from Argentina. 22 Years Old, Full Stack Developer",
      linkGit: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkIg:"https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn:"https://github.com/HenrifyPF38B/Henrify-Front",
      linkUrl:"https://github.com/HenrifyPF38B/Henrify-Front"
    },
  ];

  const [isActive, setIsActive] = useState("");
  const [blockByAudio, setBlockByAudio] = useState(false);

  const handleActive = (e) =>{
    if(isActive === e.target.name && !blockByAudio){
      setIsActive("");
    }
    if(!blockByAudio && isActive !== e.target.name){
      setBlockByAudio(true);
      setIsActive(e.target.name);
      refNacho.current.play();
      refNacho.current.addEventListener("ended", e=>{
        setBlockByAudio(false);
      })
    }
  };

  return ( 
    <div ref={refPanel} className='landing-panel-wrapper' id='landing-panel'>
      <audio ref={refNacho} src="/audio/nacho.wav"></audio>
      <div className={`go-up-panel fa-bounce ${panelUp ? "" : "hide"}`} onClick={()=> document.getElementById("landing-contact").scrollIntoView()}>
        <i className="fa-solid fa-arrow-down"></i>
      </div>
      <div className='landing-panel-members w-40'>
        <ul>
          <li style={{zIndex: 8}} className={isActive === "Barbara" ? "active" : ""}><a href="#" onClick={handleActive} name="Barbara">Barbara</a></li>
          <li style={{zIndex: 7}} className={isActive === "Diego" ? "active" : ""}><a href="#" onClick={handleActive} name="Diego">Diego</a></li>
          <li style={{zIndex: 6}} className={isActive === "Fauter" ? "active" : ""}><a href="#" onClick={handleActive} name="Fauter">Fauter</a></li>
          <li style={{zIndex: 5}} className={isActive === "Gabriela" ? "active" : ""}><a href="#" onClick={handleActive} name="Gabriela">Gabriela</a></li>
          <li style={{zIndex: 4}} className={isActive === "Ignacio" ? "active" : ""}><a href="#" onClick={handleActive} name="Ignacio">Ignacio</a></li>
          <li style={{zIndex: 3}} className={isActive === "Jaider" ? "active" : ""}><a href="#" onClick={handleActive} name="Jaider">Jaider</a></li>
          <li style={{zIndex: 2}} className={isActive === "Rocio" ? "active" : ""}><a href="#" onClick={handleActive} name="Rocio">Rocio</a></li>
          <li style={{zIndex: 1}} className={isActive === "Sofia" ? "active" : ""}><a href="#" onClick={handleActive} name="Sofia">Sofia</a></li>
        </ul>
      </div>
      <div className="landing-members w-60 px-5">
        <div className="slider-container">
          {/* 1 JAIDER, 2 FAUTER, 3 GABRIELA, 5 ROCIO, 6 SOFIA */}
          <input onClick={(e)=> e.preventDefault()} type="radio" name='slider' id='s1' checked={isActive === "Barbara" ? true : false}/>
          <input onClick={(e)=> e.preventDefault()} type="radio" name='slider' id='s2' checked={isActive === "Diego" ? true : false}/>
          <input onClick={(e)=> e.preventDefault()} type="radio" name='slider' id='s3' checked={isActive === "Fauter" ? true : false}/>
          <input onClick={(e)=> e.preventDefault()} type="radio" name='slider' id='s4' checked={isActive === "Gabriela" ? true : false}/>
          <input onClick={(e)=> e.preventDefault()} type="radio" name='slider' id='s5' checked={isActive === "Ignacio" ? true : false}/>
          <input onClick={(e)=> e.preventDefault()} type="radio" name='slider' id='s6' checked={isActive === "Jaider" ? true : false}/>
          <input onClick={(e)=> e.preventDefault()} type="radio" name='slider' id='s7' checked={isActive === "Rocio" ? true : false}/>
          <input onClick={(e)=> e.preventDefault()} type="radio" name='slider' id='s8' checked={isActive === "Sofia" ? true : false}/>
          <div className="slider-cards">
              
            {
              members.map((el, index)=>{
                return(
                  <MemberTemplate 
                    key={index} 
                    indicator={index + 1} 
                    name={el.name} 
                    description={el.description} 
                    linkGit={el.linkGit} 
                    linkIg={el.linkIg} 
                    linkLn={el.linkLn} 
                    linkUrl={el.linkUrl}/>
                )
              })
            }

          </div>
        </div>
      </div>
    </div>
   );
}
 
export default LandingPanel;