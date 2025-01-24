import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import style from "./HeartButton.module.css"

export default function HeartButton({ liked, handleLikeToggle }) {
    
    return (
        <button
            onClick={handleLikeToggle}
            className={`btn btn-light position-absolute top-0 end-0 m-2 p-2 rounded-circle  ${style.customButton}`}
            
        >

            {liked ? (
                <SolidHeartIcon className="text-danger" style={{ height: "1.5rem" }} />
            ) : (
                <OutlineHeartIcon className="text-dark" style={{ height: "1.5rem" }} />
            )}
        </button>
    )
}