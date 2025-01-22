import { NavLink } from "react-router-dom";
import style from './Nav.module.css'
export default function Nav() {
    return (
        <nav className={`${style.nav}`} >
            <ul className={`p-0 ${style.navlink}`}>
                <li><NavLink to='/owners'>Area Propietari</NavLink> </li>
                <li><NavLink to='/'>Tutte la case</NavLink></li>
            </ul>
        </ nav>

    )
}