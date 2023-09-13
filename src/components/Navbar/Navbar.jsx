import React, { useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import styles from "./Navbar.module.css";
import { useGroupOrder } from "../../GroupOrderContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { grouping, setGrouping, ordering, setOrdering } = useGroupOrder();

  const handleGroup = (e) => {
    // Update the grouping value
    setGrouping(e.target.value);
    // localStorage for the persistent view of APP
    localStorage.setItem(
      "state",
      JSON.stringify({ grouping: e.target.value, ordering: ordering })
    );
    openDisplay();
  };

  const handleOrder = (e) => {
    // Update the ordering value
    setOrdering(e.target.value);
    // localStorage for the persistent view of APP
    localStorage.setItem(
      "state",
      JSON.stringify({ grouping: grouping, ordering: e.target.value })
    );
    openDisplay();
  };
  const openDisplay = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      {/*  Display button  */}
      <div className={`${styles.nav_btn} txt`} onClick={openDisplay}>
        {/* setting icon  */}
        <VscSettings className={styles.setting} />
        Display
        {/* right and down carsousal icon and isOpen then down otherwise down arrow */}
        {isOpen ? <AiOutlineDown /> : <AiOutlineRight />}
      </div>
      {/* checking if Display content is collapse or not using isOpen  */}
      {isOpen && (
        <div className={styles.dropdown_content}>
          {/* Grouping the tickets based on status , user and Priority  */}
          <div className={styles.grouping}>
            <span className="sec_txt">Grouping</span>
            <div className="status">
              <select
                name="group"
                id="group"
                value={grouping}
                onChange={handleGroup}
              >
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
          {/* Ordering the tickets based on status , user and Priority  */}
          <div className={styles.ordering}>
            <span className="sec_txt">Ordering</span>
            <div className={styles.priority}>
              <select
                name="priority"
                id="priority"
                value={ordering}
                onChange={handleOrder}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
