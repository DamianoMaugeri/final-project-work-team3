import React, { useState } from "react";
import HeartButton from "../Heart Button/HeartButton";
import style from './HouseCard.module.css'



export default function HouseCard({ content }) {

    const { title, full_adress, city, image } = content

    // stato per i cambiamenti del  cuoricino
    const [liked, setLiked] = useState(false);


    // funzione toogle per il cuoricino
    const handleLikeToggle = (event) => {
        event.stopPropagation();
        event.preventDefault()
        setLiked(!liked); //se liked è true diventa false e viceversa
    };

    return (

        <div className="card h-100" >
            {/* immagine */}
            <div className="position-relative">
                <img
                    src={image}
                    className={`card-img-top ${style.card_img}`}
                    alt="Placeholder"
                />
                {/* Cuoricino */}
                <HeartButton liked={liked} handleLikeToggle={handleLikeToggle} />
            </div>

            {/* contenuto della card */}
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                    {full_adress}
                </p>
                <p className="card-text">{city}</p>
            </div>
        </div>

    )
}