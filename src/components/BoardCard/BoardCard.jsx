import React from "react";
import styles from "../BoardCard/BoardCard.module.css";
import { BsThreeDots, BsPlusLg } from "react-icons/bs";
import Card from "../Card/Card";
import { useGroupOrder } from "../../GroupOrderContext";
const BoardCard = (props) => {
  const { ticketArray, priorityOrder, userMapping } = props;
  const { grouping } = useGroupOrder();
  return (
    <>
      <div className={styles.board_wrapper}>
        {/* Header of the main board card  */}
        <div className={styles.board_header}>
          <div className={styles.left_header}>
            <img
              src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
              alt=""
            />
            <span className="txt">
              {grouping === "priority"
                ? priorityOrder[ticketArray[0].priority]
                : grouping === "status"
                ? ticketArray[0].status
                : userMapping.get(`${ticketArray[0].userId}`)}
            </span>

            <span className="sec_txt">{ticketArray.length}</span>
          </div>

          <div className={styles.right_header}>
            <span className="icons sec_txt">
              {" "}
              <BsPlusLg />
            </span>
            <span className="icons sec_txt">
              <BsThreeDots />
            </span>
          </div>
        </div>

        {/* card content goes here  */}
        <div className={styles.cardBody}>
          {ticketArray.map((ticket, idx) => (
            <Card key={idx} ticket={ticket} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BoardCard;
