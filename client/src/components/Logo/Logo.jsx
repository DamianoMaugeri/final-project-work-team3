import LogoBoolBnb from "../../assets/logo.jpg";
import style from "./Logo.module.css";

export default function Logo() {
    return (
        <div className="d-flex justify-content-center mt-5 mb-4">
            <img  src={LogoBoolBnb} alt="Logo Boolbnb" />
        </div>
    )
}