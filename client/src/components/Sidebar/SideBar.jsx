import Filters from "../Filters/Filters";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import style from './SideBar.module.css';

export default function SideBar() {

    return (
        <div className={`${style.sidebar} col-2`} >
            <Logo />
            <Nav />
            <Filters />


        </div>
    )
}