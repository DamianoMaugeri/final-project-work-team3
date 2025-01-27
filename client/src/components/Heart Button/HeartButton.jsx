import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import style from "./HeartButton.module.css";

export default function HeartButton() {

    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0);
    const [tempLiked, setTempLiked] = useState(false);


    const handleLikeToggle = (event) => {
        event.stopPropagation();
        event.preventDefault();


        setCount((prevCount) => prevCount + 1);
        setTempLiked(true);


        setTimeout(() => {
            setTempLiked(false);
        }, 2000);
    };

    return (
        <button
            onClick={handleLikeToggle}
            className={`btn btn-light position-absolute end-0 m-2 p-2 rounded-circle ${style.customButton}`}
            title={`Like: ${count}`} // nuvoletta con il numero di like
        >
            {tempLiked || liked ? (
                <SolidHeartIcon className="text-danger" style={{ height: "1.5rem" }} />
            ) : (
                <OutlineHeartIcon className="text-dark" style={{ height: "1.5rem" }} />
            )}
        </button>
    );
}