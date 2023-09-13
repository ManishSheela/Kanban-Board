import React from "react";
import styles from "./card.module.css";
import { BsFillExclamationSquareFill } from "react-icons/bs";
const Card = (props) => {
  const { id, title } = props.ticket;
  return (
    <div className={styles.card_wrapper}>
      <div className={styles.card_header}>
        <h3 className="sec_txt">{id}</h3>
        <img
          src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
          alt="user"
        />
      </div>

      <p className="txt">{title}</p>

      <div className={styles.card_footer}>
        <button className={`${styles.btn} ${styles.exclemation}`}>
          <BsFillExclamationSquareFill />
        </button>
        <button className={`${styles.btn} sec_txt`}>
          <span className="circle_box"></span>
          Feature Request
        </button>
      </div>
    </div>
  );
};

export default Card;
