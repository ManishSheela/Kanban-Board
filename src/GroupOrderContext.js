// GroupOrderContext.js
import React, { createContext, useContext, useState } from "react";

const GroupOrderContext = createContext();

export function GroupOrderProvider({ children }) {
  const state = JSON.parse(localStorage.getItem('state')) || "";
  const [grouping, setGrouping] = useState(state.grouping || "status");
  console.log(state.grouping);
  const [ordering, setOrdering] = useState(
    state.ordering || "priority"
  );
  
  return (
    <GroupOrderContext.Provider
      value={{ grouping, setGrouping, ordering, setOrdering }}
    >
      {children}
    </GroupOrderContext.Provider>
  );
}

export function useGroupOrder() {
  return useContext(GroupOrderContext);
}





// import React, { useState, useEffect } from "react";
// import styles from "../BoardCard/BoardCard.module.css";
// import { BsThreeDots, BsPlusLg } from "react-icons/bs";
// import Card from "../Card/Card";
// import { useGroupOrder } from "../../GroupOrderContext";
// const BoardCard = () => {
//   const { grouping, ordering } = useGroupOrder();

//   const [data, setData] = useState({ tickets: [], users: [] });
//   const { tickets, users } = data;

//   const apiUrl = "https://api.quicksell.co/v1/internal/frontend-assignment";
//   // const apiUrl = `https://api.quicksell.co/v1/internal/frontend-assignment?group=${grouping}&order=${ordering}`;
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData(); // Fetch data when grouping or ordering changes
//   }, [grouping, ordering]);

//   // filter card on the bases of status
//   let sortedTickets = [];
//   let groupKey = grouping || ordering;
//   const uniqueKeys = [];
//   for (const ticket of tickets) {
//     const ticketSort =
//       groupKey === "status"
//         ? ticket.status
//         : groupKey === "userId"
//         ? ticket.userId
//         : ticket.priority;
//     if (!uniqueKeys.includes(ticketSort)) {
//       uniqueKeys.push(ticketSort);
//     }
//   }

//   for (const status of uniqueKeys) {
//     sortedTickets.push(getTicketsByKey(tickets, status));
//   }
//   function getTicketsByKey(tickets, key) {
//     // Filter the tickets array based on the provided status
//     const filteredTickets = data.tickets.filter((ticket) => {
//       if (groupKey === "status") return ticket.status === key;
//       else if (groupKey === "userId") return ticket.userId === key;
//       else if (groupKey === "priority") return ticket.priority === key;
//     });
//     return filteredTickets;
//   }
//   console.log(sortedTickets);

//   return (
//     <>
//       {sortedTickets.map((ticketArray, index) => (
//         <div className={styles.board_wrapper} key={index}>
//           {/* Header of the main board card  */}
//           <div className={styles.board_header}>
//             <div className={styles.left_header}>
//               <img src="./user.png" alt="user_image" />

//               <span className="txt">{uniqueKeys[index]}</span>

//               <span className="sec_txt">{ticketArray.length}</span>
//             </div>

//             <div className={styles.right_header}>
//               <span className="icons sec_txt">
//                 {" "}
//                 <BsPlusLg />
//               </span>
//               <span className="icons sec_txt">
//                 <BsThreeDots />
//               </span>
//             </div>
//           </div>

//           {/* card content goes here  */}
//           <div className={styles.cardBody}>
//             {ticketArray.map((ticket, idx) => (
//               <Card key={idx} ticket={ticket} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default BoardCard;
