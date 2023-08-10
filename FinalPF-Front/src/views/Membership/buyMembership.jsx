import React, { useState } from "react";
import style from "./buyMembership.module.css";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { makeMember } from "../../redux/Actions/UsersActions";
import { useDispatch, useSelector } from "react-redux";

const MembershipModal = ({ membershipModal, setMembershipModal }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { usersId } = state;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <article
      className={style.article}
      onClick={() => setMembershipModal(false)}
    >
      <div className={style.div} onClick={(e) => e.stopPropagation()}>
        <div className={style.div2}>
            <div className={style.imgen}>
          <img
            className={style.avatar}
            src={`/images${membershipModal.avatar}`}
            alt=""
          />
          </div>
          <span className={style.memberName}>{membershipModal.name}</span>
        </div>
        <div className={style.boxContainer}>
          <h4 className={style.memberDesc}>
            {membershipModal.description}
          </h4>
          <h4 className={style.memberDuration}>{membershipModal.duration}</h4>
          <h4 className={style.memberPrice}>$ {membershipModal.price}</h4>
        </div>
        <div className={`${style.paypalContainer} ${isMenuOpen ? style.open : ""}`}>
          <PayPalButtons
                style={{layout: "vertical", color:"silver", shape: "pill"}}
                createOrder={(data, actions) => {
                  return actions.order.create({
                      purchase_units: [
                          {
                              amount: {
                                  value: Number(membershipModal.price)
                              },
                          },
                      ],
                  });
                }}
                onApprove={(data, actions) => {
                // Cuando el pago se apruebe, hacemos un fetch al back poniendo la propiedad Member del usuario en true
                let date = new Date();
                dispatch(makeMember({
                  userId: usersId.id,
                  expire: membershipModal.duration === "Three months" ? date.setDate(date.getDate() + 90) : membershipModal.duration === "Six months" ? date.setDate(date.getDate() + 180) : membershipModal.duration === "One month" ? date.setDate(date.getDate() + 30) : date.setDate(date.getDate() + 365)
                }))
                navigate("/success");
                }}

                onError={(data, actions)=>{
                navigate("/error");
                }}

                onCancel={(data, actions)=> {
                  return;
                }}

                showSpinner={true}
          />
        </div>
      </div>
    </article>
  );
};

export default MembershipModal;




