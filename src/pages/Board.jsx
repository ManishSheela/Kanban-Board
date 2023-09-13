import React, { useState, useEffect } from "react";
import BoardCard from "../components/BoardCard/BoardCard";
import { useGroupOrder } from "../GroupOrderContext";
const Board = () => {
  const { grouping, ordering } = useGroupOrder();

  const [data, setData] = useState({ tickets: [], users: [] });
  const { tickets, users } = data;

  const apiUrl = "https://api.quicksell.co/v1/internal/frontend-assignment";

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
    <div className="board">
      {sortedTickets.map((ticketArray, index) => (
        <BoardCard
          key={index}
          ticketArray={ticketArray}
          priorityOrder={priorityOrder}
          userMapping={userMapping}
        />
      ))}
    </div>
  );
};

export default Board;
