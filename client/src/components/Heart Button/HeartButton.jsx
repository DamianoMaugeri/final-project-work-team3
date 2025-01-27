import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import style from "./HeartButton.module.css"

export default function HeartButton() {

    // stato per cambiare il colore del cuoricino
    const [liked, setLiked] = useState(false);

    // stato per il contatore
    const [count, setCount] = useState(0);


    // funzione toogle per il cuoricino
    const handleLikeToggle = (event) => {
        event.stopPropagation();
        event.preventDefault()

        if (!liked) {
            setLiked(true);
        }
    };


    return (
        <button
            onClick={handleLikeToggle}
            className={`btn btn-light position-absolute  end-0 m-2 p-2 rounded-circle  ${style.customButton}`}
        >

            {liked ? (
                <SolidHeartIcon className="text-danger" style={{ height: "1.5rem" }} />
            ) : (
                <OutlineHeartIcon className="text-dark" style={{ height: "1.5rem" }} />
            )}
        </button>
    )
}