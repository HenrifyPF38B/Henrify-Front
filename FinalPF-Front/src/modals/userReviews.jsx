import React, { useEffect, useState } from "react";
import styles from "./userReviews.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { postReviews } from "../redux/Actions/ReviewsActions";
//import { postReviews } from "../redux/Actions/ReviewsActions";

const RateUsModal = ({ refToast, setShowModal, user }) => {
 
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const state = useSelector(state => state);
  const { message } = state;

  
  const handleSubmitReview = () =>{
    if(rating === 0){
      return refToast.current.show({sticky: true, severity: 'warn', summary: `Wait ${user.userName}!`, detail: "You must provide a valid rating"});
    }else if(comment.length < 20){
      return refToast.current.show({sticky: true, severity: 'warn', summary: `Wait ${user.userName}!`, detail: "You must write a comment with at least 20 characters"});
    }else if(comment.length > 250){
      return refToast.current.show({sticky: true, severity: 'warn', summary: `Wait ${user.userName}!`, detail: "Your comment can't exceed 250 characters"})
    }else{
      dispatch(postReviews({
        rating,
        comment,
        UserId: user.id,
        User: {
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar
        }
      }));
    }
  };
    
  useEffect(() => {
    if(message === "Review created"){
      refToast.current.show({life: 3000, severity: 'success', summary: `Thank you ${user.userName}!`, detail: "We received your review and it's being processed"});
      setShowModal(false);
    };
  }, [message]);

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="containerbntReviews">
          <div className="infReview">
            <h2 className="valoranos">Rate us!</h2>
          </div>
          <button className="buttonModalReviews" onClick={()=> setShowModal(false)}>
            X
          </button>
        </div>
        <div className="datUserReview">
          <div className="dataUserModal">
            <img className="avatarReviewModal" src={user.avatar} alt="" />

            <h3 className="nameh2">
              {user.firstName + " "} {user.lastName}
            </h3>
          </div>
          <div className={styles.rating}>
            <div className={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= rating ? styles.starfilled : "star"}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <textarea
            className="containerTextTarea"
            placeholder="Enter your comment..."
            value={comment}
            rows="5"
            onChange={(e)=> setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="btnreview">
          <button
            className="submit_btn"
            onClick= {handleSubmitReview}
          >
            Submit review
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateUsModal;