import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./Membership.module.css";
import video from "../../components/assets/member.mp4";

const MembershipOffer = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.videoWrapper}>
      <video playsInline autoPlay muted loop>
          <source src={video} type="video/mp4"/>
          Your browser does not support the video tag.
      </video>
      <div className={styles.welcome}>
        <span></span>
        <h2>Be a Member</h2>
        <p>Unlock exclusive features and benefits with our premium memberships!</p>
        <ul>
          <li>Unlimited streaming of over 10 million songs</li>
          <li>High-quality audio for the best listening experience</li>
          <li>Ad-free listening without any interruptions</li>
          <li>Create and customize your own playlists</li>
          <li>Download your favorite songs for offline listening</li>
          <li>Discover new music with personalized recommendations</li>
          <li>Access to exclusive live concerts and events</li>
        </ul>
        <div>
          <button onClick={()=> navigate("beMember")}>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default MembershipOffer;

