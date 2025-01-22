import Filters from "../Filters/Filters";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import style from './SideBar.module.css';

export default function SideBar() {

    return (
        <div className={`${style.sidebar} col-2 d-flex flex-column align-center justify-content-beetween`} >
            <Logo />
            <Nav />
            <Filters />


        </div>
    )
}