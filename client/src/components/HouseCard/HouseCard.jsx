import React, { useState } from "react";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import style from './HouseCard.module.css'



export default function HouseCard({ content }) {

    const { title, full_adress, city, image } = content

    // stato per i cambiamenti del  cuoricino
    const [liked, setLiked] = useState(false);


    // funzione toogle per il cuoricino
    const handleLikeToggle = () => {
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
                <button
                    onClick={handleLikeToggle}
                    className="btn btn-light position-absolute top-0 end-0 m-2 p-2 rounded-circle"
                    style={{ boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
                >

                    {liked ? (
                        <SolidHeartIcon className="text-danger" style={{ height: "1.5rem" }} />
                    ) : (
                        <OutlineHeartIcon className="text-dark" style={{ height: "1.5rem" }} />
                    )}
                </button>
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