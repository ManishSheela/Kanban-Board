import React, { useState, useEffect } from "react";
import styles from "../BoardCard/BoardCard.module.css";
import { BsThreeDots, BsPlusLg } from "react-icons/bs";
import Card from "../Card/Card";
import { useGroupOrder } from "../../GroupOrderContext";
const BoardCard = () => {
  const { grouping, ordering } = useGroupOrder();

  const [data, setData] = useState({ tickets: [], users: [] });
  const { tickets, users } = data;

  const apiUrl = "https://api.quicksell.co/v1/internal/frontend-assignment";
  // const apiUrl = `https://api.quicksell.co/v1/internal/frontend-assignment?group=${grouping}&order=${ordering}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Fetch data when grouping or ordering changes
  }, [grouping, ordering]);

  // filter card on the bases of status
  let sortedTickets = [];
  let groupKey = grouping;
  const uniqueKeys = [];
  for (const ticket of tickets) {
    const ticketSort =
      groupKey === "status"
        ? ticket.status
        : groupKey === "userId"
        ? ticket.userId
        : ticket.priority;
    if (!uniqueKeys.includes(ticketSort)) {
      uniqueKeys.push(ticketSort);
    }
  }

  for (const key of uniqueKeys) {
    let tempTickets = getTicketsByKey(tickets, key);
    if (ordering === "priority")
      tempTickets.sort((a, b) => b.priority - a.priority);
    else if (ordering === "title")
      tempTickets.sort((a, b) => a.title.localeCompare(b.title));
    sortedTickets.push(tempTickets);
  }
  function getTicketsByKey(tickets, key) {
    // Filter the tickets array based on the provided status
    const filteredTickets = tickets.filter((ticket) => {
      if (groupKey === "status") return ticket.status === key;
      else if (groupKey === "userId") return ticket.userId === key;
      else if (groupKey === "priority") return ticket.priority === key;
    });
    return filteredTickets;
  }

  // console.log(sortedTickets);

  const priorityOrder = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority",
  };

  let userMapping = new Map([]);
  for (let user of users) {
    userMapping.set(user.id, user.name);
  }

  return (
    <>
      {sortedTickets.map((ticketArray, index) => (
        <div className={styles.board_wrapper} key={index}>
          {/* Header of the main board card  */}
          <div className={styles.board_header}>
            <div className={styles.left_header}>
              <img src="./user.png" alt="user_image" />

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
      ))}
    </>
  );
};

export default BoardCard;
