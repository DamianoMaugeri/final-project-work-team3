import { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import axios from "axios";

export default function SearchBar() {
    const { searchedCity, setSearchedCity, fetchHouses } = useContext(GlobalContext);


    function handleSearch() {
        fetchHouses()
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Inserisci la città..."
                    value={searchedCity}
                    onChange={(e) => setSearchedCity(e.target.value)}
                />
                <button
                    className="btn btn-primary"
                    onClick={handleSearch}
                >
                    Cerca
                </button>
            </div>
        </div>
    );
}
