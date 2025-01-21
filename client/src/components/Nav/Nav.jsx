import { NavLink } from "react-router-dom";

export default function Nav() {
    return (<nav>
        <ul>
            <li><NavLink to='/owners'>Area Propietari</NavLink> </li>
            <li><NavLink to='/'>Tutte la case</NavLink></li>
        </ul>
    </nav>

    )
}