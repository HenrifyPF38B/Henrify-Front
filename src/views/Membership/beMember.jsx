import React, { useEffect } from "react";

import style from "./beMember.module.css";
import test from "../../components/assets/signup8.svg";
import test1 from "../../components/assets/signup4.svg";
import test2 from "../../components/assets/signup7.svg";
import test3 from "../../components/assets/signup12.svg";
import { useDispatch, useSelector } from "react-redux";
import { getMemberships } from "../../redux/Actions/MembershipsActions";


const BeMember = () => {
  const dispatch = useDispatch();
  const memberships = useSelector((state) => state.memberships.data);

  const membershipList = memberships || [];

  console.log(membershipList)
  useEffect(() => {
    dispatch(getMemberships());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <div className="content">        
        <div className="tittle">
          <h1>Welcome! Be a member!</h1>
        </div>       
        <div class="pyramid-loader">
          <div class="wrapper">
            <span class="side side1"></span>
            <span class="side side2"></span>
            <span class="side side3"></span>
            <span class="side side4"></span>
            <span class="shadow"></span>
          </div>
        </div>
      </div>
      <h4 className="info">
        Select the plan you want and enjoy unlimited music!
      </h4>
      <p className="dat">
        Play any song, download your favorites and listen offline. Listen to
        content on all your devices and enjoy high fidelity sound.
      </p>

      <div className={style.boxMember}>
        {membershipList.map((membership) => (
          <div className="card" key={membership.id}>
            <div className="type">
              <h2 className="typeh2">{membership.name}</h2>
              </div>
              <div className="databox">
                <h4 className="description">{membership.description}</h4>
                <p className="date">{membership.duration}</p>
                <p className="price">$ {membership.price}</p>
              </div>
              <button className="buttonMember">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
              <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
            </svg>
            Add membership
          </button>
          </div>
        ))}
        {/* <div className="card">
          <div className="type">
            <h2 className="typeh2">Soul Basic</h2>
          </div>
          <div className="databox">
            <p className="date">Three months</p>
            <p className="price">$15</p>
          </div>
          <button className="buttonMember">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
              <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
            </svg>
            Add membership
          </button>
        </div>
        <div className="card">
          <div className="type">
            <h2 className="typeh2">Soul Premium</h2>
          </div>
          <div className="databox">
            <p className="date">Six months</p>
            <p className="price">$25</p>
          </div>
          <button className="buttonMember">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
              <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
            </svg>
            Add membership
          </button>
        </div> */}

        {/* <div className="card">
          <div className="type">
            <h2 className="typeh2">Soul Vip</h2>
          </div>
          <div className="databox">
            <p className="date">One year</p>
            <p className="price">$45</p>
          </div>
          <button className="buttonMember">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
              <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
            </svg>
            Add membership
          </button>
        </div> */}
      </div>
      <div className="ourMember">
        <h3 className="aboutName">Why choose us?</h3>
        <ul className="aboutUs">
          <li>
            Elevate your music experience with our membership! Gain unlimited
            access to an extensive library of music from various genres,
            artists, and eras.
          </li>
          <li>
            Enjoy ad-free streaming, offline listening, and high-quality audio
            for a distraction-free and immersive experience.
          </li>
          <li>
            As a valued member, you'll get access to exclusive content,
            personalized playlists, and early releases.
          </li>
          <li>
            Explore handpicked themed playlists and continuously updated music
            collections.
          </li>
          <li>By joining, you support artists and the music industry.</li>
          <li>
            We offer flexible membership plans, 24/7 customer support, and the
            opportunity to unlock the full potential of your music journey.
          </li>
          <li>Join now and embrace a world of limitless music!</li>
        </ul>
      </div>
      <div class="testimonials">
        <div class="testimonial-card">
          <img src={test2} alt="Nombre del cliente" />

          <p class="testimonial-text">
            "I really like using this site, finding the most diverse songs, and
            very complete content"
          </p>
          <p class="client-name">LUCAS</p>
          <p class="client-role">Argentina</p>
        </div>
        <div class="testimonial-card">
          <img src={test1} alt="Nombre del cliente" />
          <p class="testimonial-text">
            "I love to take music everywhere, that's why this page is perfect
            for me"
          </p>
          <p class="client-name">ROSE</p>
          <p class="client-role">United States</p>
        </div>
        <div class="testimonial-card">
          <img src={test} alt="Nombre del cliente" />
          <p class="testimonial-text">
            "After learning about the site, I got the membership and I don't
            regret it, I can listen to all the songs without interruptions, and
            it is always updating with new content, thanks soul life!"
          </p>
          <p class="client-name">PABLO</p>
          <p class="client-role">México</p>
        </div>
        <div class="testimonial-card">
          <img src={test3} alt="Nombre del cliente" />
          <p class="testimonial-text">"The best!"</p>
          <p class="client-name">LUZ</p>
          <p class="client-role">Argentina</p>
        </div>
      </div>
    </div>
  );
};

export default BeMember;
