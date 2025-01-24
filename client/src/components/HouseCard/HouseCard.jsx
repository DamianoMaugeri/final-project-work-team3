import React, { useState } from "react";
import HeartButton from "../Heart Button/HeartButton";
import style from './HouseCard.module.css'
import placeHolder from '../../assets/placeholder.png'



export default function HouseCard({ content }) {

    const { title, full_adress, city, image } = content



    return (

        <div className="card h-100" >
            {/* immagine */}
            <div className="position-relative">
                <img
                    src={image}
                    onError={(e) => {
                        e.target.onerror = null; // se la immagine e innacesibile 
                        e.target.src = placeHolder; // metti il placeholder
                    }}
                    className={`card-img-top ${style.card_img}`}
                    alt="House"
                />
                {/* Cuoricino */}
                <HeartButton />
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