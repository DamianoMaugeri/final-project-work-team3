import LogoBoolBnb from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import style from "./Logo.module.css";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

export default function Logo() {
    const { setSearchedCity } = useContext(GlobalContext)
    return (
        <div className="d-flex justify-content-center mt-5 mb-4">
            <Link to="/" onClick={() => {
                setSearchedCity("")
                fetchHouses()
            }}>
                <img style={{ width: "200px" }} src={LogoBoolBnb} alt="Logo Boolbnb" />
            </Link>
        </div>
    )
}