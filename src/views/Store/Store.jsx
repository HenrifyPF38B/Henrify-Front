import React from 'react'
import DropdownMenu from '../../components/dropdownMenu/dropdownMenu';
import styles from "./Store.module.css"

const Store = () => {
  return ( 
    <div>
      <aside className={styles.sideBar}>
        <DropdownMenu />
      </aside>
    </div>
   );
}
 
export default Store;