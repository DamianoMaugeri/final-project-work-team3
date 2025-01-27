import React, { useState } from 'react';
import Filters from "../Filters/Filters";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import style from './SideBar.module.css';

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(false); // Stato per controllare se la sidebar è aperta o chiusa

    const toggleSidebar = () => {
        setIsOpen(prevState => !prevState); // Cambia lo stato di apertura della sidebar
    };

    return (
        <div>
            {/* Bottone per aprire/chiudere la sidebar */}
            <button
                className={`${style.toggleButton} ${isOpen ? style.open : ''}`}
                onClick={toggleSidebar}
            >
                <i className="fa-solid fa-bars" style={{ color: '#ffffff', zIndex: '999', display: 'block' }}></i>
            </button>

            {/* Sidebar che si espande e si chiude */}
            <div className={`${style.sidebar} ${isOpen ? style.openSidebar : style.closedSidebar}`}>
                <Nav />
                <Filters />
            </div>
        </div>
    );
}
