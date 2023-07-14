import React, { useEffect, useRef, useState } from 'react'
import LandingContact from '../components/Landing/Contact';
import LandingPanel from '../components/Landing/Panel';


const LandingPage = () => {

    const [contactUp, setContactUp] = useState(false);
    const [panelUp, setPanelUp] = useState(false);

    const refContact = useRef();
    const refPanel = useRef();

    const [contactIsVisible, setContactIsVisible] = useState(false);
    const [panelIsVisible, setPanelIsVisible] = useState(false);
    
    const cbContact = (entries) =>{
        const [ entry ] = entries;
        if(entry.isIntersecting){
            setContactIsVisible(true);
        }else{
            setContactIsVisible(false);
        }
    };


    const cbPanel = (entries) =>{
        const [ entry ] = entries;
        if(entry.isIntersecting){
            setPanelIsVisible(true);
        }else{
            setPanelIsVisible(false);
        }
    };

    const options = {
        threshold: 1
    };


  useEffect(() => {
    
    const observerContact = new IntersectionObserver(cbContact, options);
      if(refContact.current) observerContact.observe(refContact.current);
      
      if(!refContact.current) observerContact.unobserve(refContact.current);
      
      contactIsVisible ? setContactUp(true) : setContactUp(false);

  }, [refContact, contactIsVisible]);

  useEffect(() => {
    
    const observerPanel = new IntersectionObserver(cbPanel, options);
      if(refPanel.current) observerPanel.observe(refPanel.current);
      
      if(!refPanel.current) observerPanel.unobserve(refPanel.current);
      
      panelIsVisible ? setPanelUp(true) : setPanelUp(false);

  }, [refPanel, panelIsVisible]);
  return ( 
    <div>
      <LandingPanel panelUp={panelUp} refPanel={refPanel}/>
      <LandingContact contactUp={contactUp} refContact={refContact}/>
    </div>
   );
}
 
export default LandingPage;