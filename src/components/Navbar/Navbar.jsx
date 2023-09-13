import React, { useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import styles from './Navbar.module.css'
import { useGroupOrder } from "../../GroupOrderContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { grouping, setGrouping, ordering, setOrdering } = useGroupOrder();
   
  const handleGroup = (e) => {
    // Update the grouping value
    setGrouping(e.target.value);
    const t = {grouping: e.target.value, ordering: ordering}
    localStorage.setItem('state', JSON.stringify(t));
    openDisplay();
  };

  const handleOrder = (e) => {
    // Update the ordering value
    setOrdering(e.target.value);
     const t = { grouping: grouping, ordering: e.target.value };
     localStorage.setItem("state", JSON.stringify(t));
    openDisplay();
  };
  const openDisplay = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.nav_btn} txt`} onClick={openDisplay}>
        <VscSettings className={styles.setting} />
        Display
        {isOpen ? <AiOutlineDown /> : <AiOutlineRight />}
      </div>
      {isOpen && (
        <div className={styles.dropdown_content}>
          {/* Pending  */}
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
