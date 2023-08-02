import React, { useEffect, useRef, useState } from 'react'
import video from "../../components/assets/login.mp4"
import styles from "./SignUp.module.css";
import { useNavigate } from 'react-router-dom';
import confetti from "canvas-confetti";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from '../../redux/Actions/UsersActions';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { resetMessageState } from '../../redux/Actions/StateActions';


const SignUp = () => {

  const refToast = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state);
  const { message } = state;

  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [imageSelected, setImageSelected] = useState("/images/signup1.svg");
  const [username, setUsername] = useState(null);
  const [form1, setForm1] = useState({
    firstName:"",
    lastName:"",
    email:"",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [form2, setForm2] = useState({
    password1:"",
    password2:""
  });


  const handleNext = () =>{
    if(first){
      if(imageSelected && username){
        setFirst(false);
        setSecond(true);
        setThird(false);
      }else{
        refToast.current.show({sticky: true, severity: "warn", summary: "Wait!", detail: "Please complete all fields"});
      }
    };
    if(second){
      if(form1.firstName && form1.lastName && form1.email){
        setFirst(false);
        setSecond(false);
        setThird(true);
      }else{
        refToast.current.show({sticky: true, severity: "warn", summary: "Wait!", detail: "Please complete all fields"});
      }
    };

  };

  const handlePrev = () =>{
    if(first){
      navigate("/login");
    };
    if(second){
      setFirst(true);
      setSecond(false);
      setThird(false);
    };
    if(third){
      setFirst(false);
      setSecond(true);
      setThird(false);
    }
  };


  const handleForm1 = (e) =>{
    setForm1({
      ...form1,
      [e.target.name]: e.target.value
    })
  };

  const handleForm2 = (e) =>{
    setForm2({
      ...form2,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = () =>{
    if(!form2.password1.length || !form2.password2.length){
      return refToast.current.show({sticky: true, severity: "warn", summary: "Wait!", detail: "Please complete all fields"});
    };
    
    if(form2.password1 !== form2.password2){
      // No match
      return refToast.current.show({sticky: true, severity: "warn", summary: "Ups!", detail: "Passwords must match"});
    };


    let newUser = {
      ...form1, password: form2.password1, avatar: imageSelected, userName: username, googleUser: false
    };
    console.log(newUser);
    
    dispatch(createUser(newUser));
  
  };

  // Controlamos message para emitir las alertas segun el caso
  useEffect(() => {
    if(message){
      if(message === "User created"){
        confetti();
        setTimeout(()=>{
          navigate("/login");
          dispatch(resetMessageState());
        },2000)
      }else if(message === "Email Error"){
        refToast.current.show({sticky: true, severity: 'error', summary: "Ups!", detail: "That email is already in use!"});
        setTimeout(()=>{
          dispatch(resetMessageState());
        },1000);
      }else if(message === "UserName Error"){
        refToast.current.show({sticky: true, severity: 'error', summary: "Ups!", detail: "That username is already in use!"});
        setTimeout(()=>{
          dispatch(resetMessageState());
        },1000);
      }
    }
  }, [message]);

  return ( 
    <div className={styles.wrapper}>
      <Toast ref={refToast} position='top-left'></Toast>
      <div className={styles.videoWapper}>
        <video autoPlay muted loop playsInline>
            <source src={video} type='video/mp4'/>
        </video>
      </div>
      <div className={styles.container}>
        {
          second &&
          <div className={styles.next} onClick={handleNext}>
            <i className="fa-solid fa-caret-right fa-2xl" style={{color:"whitesmoke"}}></i>
          </div>
        }
        {
          third &&
          <div className={styles.finish}>
            <button onClick={handleSubmit}>Done!</button>
          </div>
        }
  

          {
            (second || third) &&
            <div className={styles.back} onClick={handlePrev}>
              <i className="fa-solid fa-caret-left fa-2xl" style={{color:"whitesmoke"}}></i>
            </div>
          }      
        {
          first &&
          <div className='w-100'>
            <div className={styles.firstSection}>
              <h2>Photo & Username</h2>
                <div className={styles.subContainer}>
                <div className={styles.smallPic}>
                  <div className='d-flex align-items-start w-100 pb-4'>
                    <span className={styles.step1Div}>
                      <div className={styles.step1}>
                        <i className="fa-solid fa-1 fa-xs"></i>
                      </div>
                      Choose an avatar
                    </span>
                  </div>
                  <div className={styles.smallPicsContainer}>
                    <div className={`${imageSelected === "/images/signup1.svg" && "signUpImgActive"}`} onClick={()=> setImageSelected("/images/signup1.svg")}>
                      <img src="/images/signup1.svg" alt="abc" />
                    </div>
                    <div className={`${imageSelected === "/images/signup2.svg" && "signUpImgActive"}`} onClick={()=> setImageSelected("/images/signup2.svg")}>
                      <img src="/images/signup2.svg" alt="abc" />
                    </div>
                    <div className={`${imageSelected === "/images/signup3.svg" && "signUpImgActive"}`} onClick={()=> setImageSelected("/images/signup3.svg")}>
                      <img src="/images/signup3.svg" alt="abc" />
                    </div>
                    <div className={`${imageSelected === "/images/signup4.svg" && "signUpImgActive"}`} onClick={()=> setImageSelected("/images/signup4.svg")}>
                      <img src="/images/signup4.svg" alt="abc" />
                    </div>
                    <div className={`${imageSelected === "/images/signup5.svg" && "signUpImgActive"}`} onClick={()=> setImageSelected("/images/signup5.svg")}>
                      <img src="/images/signup5.svg" alt="abc" />
                    </div>
                    <div className={`${imageSelected === "/images/signup6.svg" && "signUpImgActive"}`} onClick={()=> setImageSelected("/images/signup6.svg")}>
                      <img src="/images/signup6.svg" alt="abc" />
                    </div>
                    <div className={`${imageSelected === "/images/signup7.svg" && "signUpImgActive"}`} onClick={()=> setImageSelected("/images/signup7.svg")}>
                      <img src="/images/signup7.svg" alt="abc" />
                    </div>
                    <div className={`${imageSelected === "/images/signup8.svg" && "signUpImgActive"}`} onClick={()=> setImageSelected("/images/signup8.svg")}>
                      <img src="/images/signup8.svg" alt="abc" />
                    </div>
                    <div className={`${imageSelected === "/images/signup9.svg" && "signUpImgActive"}`} onClick={()=> setImageSelected("/images/signup9.svg")}>
                      <img src="/images/signup9.svg" alt="abc" />
                    </div>
                    <div className={`${imageSelected === "/images/signup10.svg" && "signUpImgActive"}`} onClick={()=> setImageSelected("/images/signup10.svg")}>
                      <img src="/images/signup10.svg" alt="abc" />
                    </div>
                    <div className={`${imageSelected === "/images/signup11.svg" && "signUpImgActive"}`} onClick={()=> setImageSelected("/images/signup11.svg")}>
                      <img src="/images/signup11.svg" alt="abc" />
                    </div>
                    <div className={`${imageSelected === "/images/signup12.svg" && "signUpImgActive"}`} onClick={()=> setImageSelected("/images/signup12.svg")}>
                      <img src="/images/signup12.svg" alt="abc" />
                    </div>
                    <div className={`${imageSelected === "/images/signup13.svg" && "signUpImgActive"}`} onClick={()=> setImageSelected("/images/signup13.svg")}>
                      <img src="/images/signup13.svg" alt="abc" />
                    </div>
                    <div className={`${imageSelected === "/images/signup14.svg" && "signUpImgActive"}`} onClick={()=> setImageSelected("/images/signup14.svg")}>
                      <img src="/images/signup14.svg" alt="abc" />
                    </div>
                    <div className={`${imageSelected === "/images/signup15.svg" && "signUpImgActive"}`} onClick={()=> setImageSelected("/images/signup15.svg")}>
                      <img src="/images/signup15.svg" alt="abc" />
                    </div>
                    
                  </div>
                  <div className='w-100 mt-5 pt-3'>
                    <div className='d-flex align-items-start w-100'>
                      <span className={styles.step1Div}>
                        <div className={styles.step1}>
                          <i className="fa-solid fa-2 fa-xs"></i>
                        </div>
                        Choose an username
                      </span>
                    </div>
                    {/* username */}
                    <div className={styles.username}>
                      <input type="text" placeholder="@Username" onChange={(e)=> setUsername(e.target.value)} value={username}/>
                      <span></span>
                    </div>
                  </div>
                </div>
              <div className={styles.bigPic}>
                {/* big pic */}
                <h2>{username || "@Username"}</h2>
                <div className='d-flex align-items-center justify-content-center w-100'>
                  <img src={imageSelected} alt="abc" />
                </div>
              </div>
            </div>
            <div className='d-flex align-items-center w-100 justify-content-between mt-3 pt-5'>
              <div onClick={handlePrev}>
                <i className="fa-solid fa-caret-left fa-2xl" style={{color:"whitesmoke"}}></i>
              </div>   
              <div onClick={handleNext}>
                {/* next button */}
                <i className="fa-solid fa-caret-right fa-2xl" style={{color:"whitesmoke"}}></i>
              </div>
            </div>
            </div>
          </div>
        }
        {
          second &&
          <div>
            <div className={styles.secondPart}>
              <h2>Information</h2>
              <form onSubmit={(e)=> e.preventDefault()}>
              <div class={styles.inputDiv}>
                <input type="text" placeholder="First Name" name='firstName' onChange={handleForm1} value={form1.firstName}/>
                <span>First name:</span>
              </div>
              <div class={styles.inputDiv}>
                <input type="text" placeholder="Last Name" name='lastName' onChange={handleForm1} value={form1.lastName}/>
                <span>Last name:</span>
              </div>
              <div class={styles.inputDiv}>
                <input type="email" placeholder="Email" name='email' onChange={handleForm1} value={form1.email}/>
                <span>Email:</span>
              </div>
              
              </form>
              
            </div>
          </div>
        }
        {
          third && 
          <div>
            <div className={styles.password}>
              <h2>Password</h2>
              <form action="">
                <div class={styles.inputDiv}>
                  <input type={`${showPassword ? "text" : "password"}`} placeholder="Password" name='password1' onChange={handleForm2} value={form2.password1}/>
                  <span>Password:</span>
                  <div className={styles.showPassword}>
                    {
                        showPassword ? (
                          <i className="fa-solid fa-eye-slash" onClick={()=> setShowPassword(false)}></i>
                        ):(
                          <i className="fa-solid fa-eye" onClick={()=> setShowPassword(true)}></i>
                        )
                    }
                  </div>
                </div>
                <div class={styles.inputDiv}>
                  <input type={`${showPassword2 ? "text" : "password"}`} placeholder="Confirm Password" name='password2' onChange={handleForm2} value={form2.password2}/>
                  <span>Confirm Password:</span>
                  <div className={styles.showPassword}>
                    {
                        showPassword2 ? (
                          <i className="fa-solid fa-eye-slash" onClick={()=> setShowPassword2(false)}></i>
                        ):(
                          <i className="fa-solid fa-eye" onClick={()=> setShowPassword2(true)}></i>
                        )
                    }
                  </div>
                </div>
                <div className={styles.alert}>
                  <span><b>We strongly recommend your password to fill the following requirements:</b></span>
                  <span>• It includes a combination of uppercase and lowercase letters.</span>
                  <span>• It contains numbers: For Example "0" and "4" are used.</span>
                  <span>• It incorporates special characters: For Example "!" and "@" and "#" are used.</span>
                  <span>• It has a sufficient length of 14 characters.</span>
                </div>
              </form>
            </div>
          </div>
        }
        <div>
          {/* next button */}
        </div>
      </div>
    </div>
   );
}
 
export default SignUp;