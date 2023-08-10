import React, { useContext, useEffect, useRef, useState } from "react";

import style from "./beMember.module.css";
import test from "../../components/assets/signup8.svg";
import test1 from "../../components/assets/signup4.svg";
import test2 from "../../components/assets/signup7.svg";
import test3 from "../../components/assets/signup12.svg";
import { useDispatch, useSelector } from "react-redux";
import { getMemberships } from "../../redux/Actions/MembershipsActions";
import MembershipModal from "./buyMembership";
import { PlaylistContext } from "../../contexts/playlistContext";
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";    
import RateUsModal from "../../modals/userReviews";
import { getReviews } from "../../redux/Actions/ReviewsActions";
import "font-awesome/css/font-awesome.min.css";

const compare = (a, b)=>{
  return a.price.localeCompare(b.price);
}

const BeMember = () => {

  const refToast = useRef();
  const dispatch = useDispatch();
  const dataContext = useContext(PlaylistContext);
  const { setLoginOpen } = dataContext;
  const state = useSelector(state => state);
  const { memberships, usersId, reviews } = state;

  const [membershipModal, setMembershipModal] = useState(false);
  const [sortedMemberships, setSortedMemberships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usersReviews, setUsersReviews] = useState([]);

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fa fa-star" aria-hidden="true"></i>);
      } else {
        stars.push(<i key={i} className="fa fa-star-o" aria-hidden="true"></i>);
      }
    }
    return stars;
  };

  
  const handleOpenModal = (membership) =>{
    if(!usersId.id){
      // User not logged in
      return setLoginOpen(true);
    }else if(usersId.member){
      // User already is member
      return refToast.current.show({sticky: true, severity: 'info', summary: `Hey ${usersId.userName}!`, detail: "It looks like you are already a member"});

    }else if(usersId.id){
      // Activate payment modal
      setMembershipModal(membership);
    }
  };

  const handleGiveReview = () =>{
    let userGaveReview = reviews.filter(el => el.UserId === usersId.id);
    if(userGaveReview.length > 0){
      return refToast.current.show({sticky: true, severity: 'info', summary: `We're sorry ${usersId.userName}!`, detail: "Only one review per User is allowed"});
    }else{
      setShowModal(true);
    }
  };

  useEffect(() => {
    if(reviews.length > 0){
      setUsersReviews(reviews);
    }
  }, [reviews]);

  useEffect(() => {
    dispatch(getMemberships());
    dispatch(getReviews())
  }, []);

  useEffect(() => {
    if(memberships.length > 0){
        let sortedArray = memberships.sort(compare);
        setSortedMemberships(sortedArray);
    }
  }, [memberships]);

  return (
    <div className={style.container}>
      <div style={{zIndex:"999"}}>
        <Toast ref={refToast} position="top-left"></Toast>
      </div>

      {membershipModal && (
        <MembershipModal
          membershipModal={membershipModal}
          setMembershipModal={setMembershipModal}
        />
      )}
      {
        showModal &&
        <RateUsModal
          user={usersId}
          setShowModal={setShowModal}
          refToast={refToast}
        />
      }  
        <div className="tittleBeMember">
          <h1 className="beMembertit">Welcome, Be a member!</h1>  
      </div>
      <div className="containerPlan">
      <h4 className="info">
        Select the plan you want and enjoy unlimited music!
     </h4>
    
      </div>
      <div className="boxMember">
        {sortedMemberships.map((membership) => (
          <div className="cardMembership" key={membership.id}>
            <span></span>
            <div className="content">
              <div className="type">
                <h2 className="typeh2">{membership.name}</h2>
              </div>
              <div className="databoxMembership">
                <h4 className="description">{membership.description}</h4>
                <p className="date">{membership.duration}</p>
                {membership.name === "Soul FREE" ? (
                  <p className="price">$0</p>
                ) : (
                  <p className="price">${membership.price}</p>
                )}
              </div>
              <button
                className="buttonMember"
                onClick={() => handleOpenModal(membership)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                  <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
                </svg>
                Add membership
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="revi">        
      <div className="reviewsContent">
      <div className="contentRevi">
      <div class="pyramid-loader">
          <div class="wrapper">
            <span class="side side1"></span>
            <span class="side side2"></span>
            <span class="side side3"></span>
            <span class="side side4"></span>
            <span class="shadow"></span>
          </div>
        </div>
        <h4>Thanks for joining us!</h4>          
          </div>
          <p className="opinionReview">Your feedback is essential in helping us improve and continue to offer top-notch service. We invite you to share your thoughts by leaving a review!</p>
          <div className="btnReviewsContainer">
            <button className="btnReviews" onClick={handleGiveReview}>
              Click Here!
            </button>
          </div>
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
      </div>
      <div className="testimonials">
        {usersReviews.length > 0 && usersReviews.map((review, index) => (
          <div key={index} className="reviewItem">
            <div className="containerDataReview">
              <img
                className="avatarReview"
                src={review.User?.avatar}
                alt="img"
              />{" "}
              <h4>
                {review.User?.firstName} {review.User?.lastName}
              </h4>
            </div>
            <div className="dataReview">
              <p className='ratingText'>{renderStars(review.rating)}</p>
              <p>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeMember;