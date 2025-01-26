import style from "./HeaderMain.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from "react-router-dom";
export default function HeaderMain() {
    return (
        <div className={style.header}>
            <NavLink className={style.customMenuButton} to='/owners' ><FontAwesomeIcon icon={faCircleUser} style={{ color: "#ffffff" }} /> Area proprietari</NavLink>
        </div >
    )
}
