import { NavLink } from "react-router-dom";
import style from './Nav.module.css'
export default function Nav() {
    return (
        <nav className={`${style.nav}`} >
            <ul className={`p-0 ${style.navlink}`}>
                <li className={style.customList} >
                    <NavLink className= {({ isActive }) => `${isActive ? style.active : ""}  ${style.link} text-decoration-none text-white fw-bold`} 
                        to='/owners'>Area Proprietari</NavLink> </li>

                <li className={style.customList}>
                    <NavLink  className= {({ isActive }) => `${style.link} ${isActive ? style.active : ""} text-decoration-none text-white fw-bold`}  
                            to='/'>Tutte le case</NavLink></li>
            </ul>
        </ nav>

    )
}