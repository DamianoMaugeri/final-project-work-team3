import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import style from './HeaderOwners.module.css';

export default function HeaderOwners({ ownerId, onLogout, firstName, lastName }) {
    const [showPopover, setShowPopover] = useState(false);
    const menuButtonRef = useRef(null); // Riferimento al bottone "Menu"
    const navigate = useNavigate();

    // Funzione per gestire le opzioni del menu
    const handleOption = (option) => {
        setShowPopover(false); // Nascondi il popover dopo aver scelto un'opzione
        if (option === "properties") {
            navigate(`/owner/${ownerId}/properties`);
        } else if (option === "messages") {
            navigate(`/owner/${ownerId}/messages`);
        } else if (option === "addProperty") {
            navigate(`/owner/${ownerId}/add-property`);
        } else if (option === "profile") {
            navigate(`/owner/${ownerId}/profile`);
        } else if (option === "logout") {
            localStorage.removeItem("token");
            onLogout()
        }
    };

    // Popover contenente le opzioni del menu
    const popover = (
        <Popover id="popover-basic" className={style.customPopover}>
            <Popover.Body>
                <ul className="list-group">
                    <li className={`list-group-item ${style.menuItem}`} onClick={() => handleOption("properties")}>
                        Le mie proprietà
                    </li>
                    <li className={`list-group-item ${style.menuItem}`} onClick={() => handleOption("messages")}>
                        I miei messaggi
                    </li>
                    <li className={`list-group-item ${style.menuItem}`} onClick={() => handleOption("addProperty")}>
                        Aggiungi immobile
                    </li>
                    <li className={`list-group-item ${style.menuItem}`} onClick={() => handleOption("profile")}>
                        Dati personali
                    </li>
                    <li className={`list-group-item text-danger ${style.menuItem}`} onClick={() => handleOption("logout")}>
                        Esci
                    </li>
                </ul>
            </Popover.Body>
        </Popover>
    );

    return (
        <header className={`d-flex justify-content-around align-items-center rounded-0 ${style.header}`}>
            <h3 className={style.custom_margin_left}>Benvenuto, {firstName} {lastName}</h3>

            {/* OverlayTrigger con Popover */}
            <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popover}
                show={showPopover}
                onToggle={() => setShowPopover(!showPopover)} // Mostra o nascondi il popover
            >
                <Button ref={menuButtonRef} variant="primary" className={style.customMenuButton} >Menu</Button>
            </OverlayTrigger>
        </header>
    );
}
