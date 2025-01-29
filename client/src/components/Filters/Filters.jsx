import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import style from './Filters.module.css';
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { useSearchParams, useLocation } from "react-router-dom";

export default function Filters() {

    const location = useLocation();

    const { setSelectedRoomNumbers, selectedRoomNumbers, fetchHouses, filters, setFilters, setSearchParams } = useContext(GlobalContext)
    const [filterActive, setFilterActive] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        rooms: false,
        beds: false,
        bathrooms: false,
        size: false,
        price: false
    });

    //
    //const [searchParams, setSearchParams] = useSearchParams();
    // const [filters, setFilters] = useState({
    //     city: searchParams.get("city") || "",
    //     rooms: searchParams.get("rooms") || "",
    //     beds: searchParams.get("beds") || "",
    //     bathrooms: searchParams.get("bathrooms") || "",
    //     size: searchParams.get('size'),
    //     price: searchParams.get('price') || "",
    // });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        setSearchParams(newFilters); // Modifica l'URL senza ricaricare la pagina
        const newRoomNumber = newFilters.rooms
        setSelectedRoomNumbers(newRoomNumber); // Aggiorna il numero di stanze
        // fetchHouses(newFilters)
    };

    //
    const toggleFilter = (filterName) => {
        setActiveFilters((prev) => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
    };

    useEffect(() => {

        const searchParams = new URLSearchParams(location.search);
        const queryParams = {};

        for (const [key, value] of searchParams.entries()) {
            if (value && value !== "null") { // Ignora i parametri vuoti o "null"
                queryParams[key] = isNaN(value) ? value : Number(value); // Converte numeri
            }
        }
        console.log("Parametri della query:", queryParams);
        fetchHouses(queryParams)

    }, [location.search]);

    return (
        <>
            {/* Tasto per attivare/disattivare tutti i filtri */}
            <button className={style.fil} onClick={() => {
                setFilterActive(!filterActive);
                setActiveFilters({
                    rooms: false,
                    beds: false,
                    bathrooms: false,
                    size: false,
                    price: false
                });
            }}>
                Filtri avanzati
            </button>

            {/* Contenitore dei filtri */}
            {filterActive && (
                <div className={`${style.filters} p-3 text-white`}>


                    {/* Filtro: Numero di stanze  2*/}
                    <button className='d-flex justify-content-between align-items-baseline w-100' onClick={() => toggleFilter('rooms')}>
                        Numero di stanze
                        <FontAwesomeIcon
                            icon={faSortDown}
                            rotation={activeFilters.rooms ? 0 : 270}
                            style={{ color: "#ffffff" }}
                        />
                    </button>
                    {activeFilters.rooms && (
                        <div className={`${style.filter_options}`}>
                            {['1', '2', '3', '4', '5+'].map((option) => (
                                <button key={option} name='rooms' value={option} onClick={handleFilterChange} className={`${style.filter_button}`}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Filtro: Posti letto */}
                    <button className='d-flex justify-content-between align-items-baseline w-100' onClick={() => toggleFilter('beds')}>
                        Posti letto
                        <FontAwesomeIcon
                            icon={faSortDown}
                            rotation={activeFilters.beds ? 0 : 270}
                            style={{ color: "#ffffff" }}
                        />
                    </button>
                    {activeFilters.beds && (
                        <div className={`${style.filterOptions}`}>
                            {['2-3', '4-6'].map((option) => (
                                <button key={option} className={`${style.filterButton}`} onClick={() => {
                                    // Aggiungi la logica per Posti letto
                                }}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Filtro: Bagni */}
                    <button className='d-flex justify-content-between align-items-baseline w-100' onClick={() => toggleFilter('bathrooms')}>
                        Bagni
                        <FontAwesomeIcon
                            icon={faSortDown}
                            rotation={activeFilters.bathrooms ? 0 : 270}
                            style={{ color: "#ffffff" }}
                        />
                    </button>
                    {activeFilters.bathrooms && (
                        <div className={`${style.filterOptions}`}>
                            {['1', '2', '3+'].map((option) => (
                                <button key={option} className={`${style.filterButton}`} onClick={() => {
                                    // Aggiungi la logica per Bagni
                                }}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Filtro: Dimensioni */}
                    <button className='d-flex justify-content-between align-items-baseline w-100' onClick={() => toggleFilter('size')}>
                        Dimensioni
                        <FontAwesomeIcon
                            icon={faSortDown}
                            rotation={activeFilters.size ? 0 : 270}
                            style={{ color: "#ffffff" }}
                        />
                    </button>
                    {activeFilters.size && (
                        <div className={`${style.filterOptions}`}>
                            {['<50', '50', '100', '150', '200', '>200'].map((option) => (
                                <button key={option} className={`${style.filterButton}`} onClick={() => {
                                    // Aggiungi la logica per Dimensioni
                                }}>
                                    {option}
                                </button>
                            ))}
                            <div className="mt-2">
                                <input type="range" min="0" max="200" className={`${style.filterRange}`} />
                            </div>
                        </div>
                    )}

                    {/* Filtro: Prezzo giornaliero */}
                    <button className='d-flex justify-content-between align-items-baseline w-100' onClick={() => toggleFilter('price')}>
                        Prezzo giornaliero
                        <FontAwesomeIcon
                            icon={faSortDown}
                            rotation={activeFilters.price ? 0 : 270}
                            style={{ color: "#ffffff" }}
                        />
                    </button>
                    {activeFilters.price && (
                        <div className={`${style.filterOptions}`}>
                            {['<50', '50', '100', '150', '200', '>200'].map((option) => (
                                <button key={option} className={`${style.filterButton}`} onClick={() => {
                                    // Aggiungi la logica per Prezzo
                                }}>
                                    {option}
                                </button>
                            ))}
                            <div className="mt-2">
                                <input type="range" min="0" max="200" className={`${style.filterRange}`} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
