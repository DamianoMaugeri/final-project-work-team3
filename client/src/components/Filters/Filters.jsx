import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import style from './Filters.module.css';
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { useSearchParams, useLocation } from "react-router-dom";
import SlideFilter from '../Filters util/SlideFilter';
import DoubleRangeSlider from '../DoubleRange/DoubleRange';

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
    //     minPrice: searchParams.get('minPrice') || "",
    //     maxPrice: searchParams.get('maxPrice') || "",
    // });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        setSearchParams(newFilters); // Modifica l'URL senza ricaricare la pagina
        const newRoomNumber = newFilters.rooms
        setSelectedRoomNumbers(newRoomNumber); // Aggiorna il numero di stanze
        console.log('funzione per i filtri')
        // fetchHouses(newFilters)
    };




    //
    const toggleFilter = (filterName) => {
        setActiveFilters((prev) => {
            const newState = Object.keys(prev).reduce((acc, key) => {
                acc[key] = key === filterName ? !prev[key] : false; // Apre solo il filtro cliccato e chiude gli altri
                return acc;
            }, {});
            return newState;
        });
    };

    // useEffect(() => {

    //     const searchParams = new URLSearchParams(location.search);
    //     const queryParams = {};

    //     for (const [key, value] of searchParams.entries()) {
    //         if (value && value !== "null") { // Ignora i parametri vuoti o "null"
    //             queryParams[key] = isNaN(value) ? value : Number(value); // Converte numeri
    //         }
    //     }
    //     // console.log("Parametri della query:", queryParams);
    //     fetchHouses(queryParams)

    // }, [location.search]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const queryParams = {};

        for (const key of searchParams.keys()) {
            const values = searchParams.getAll(key); // Ottieni tutti i valori della chiave

            if (values.length > 1) {
                // Se ci sono più valori, salva come array
                queryParams[key] = values.map(value => (isNaN(value) ? value : Number(value)));
            } else {
                // Altrimenti, salva il singolo valore normalmente
                const value = values[0];
                if (value && value !== "null") {
                    queryParams[key] = isNaN(value) ? value : Number(value);
                }
            }
        }

        console.log("Parametri della query:", queryParams);
        fetchHouses(queryParams);

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
                    <button className={`d-flex px-2 justify-content-between align-items-baseline w-100 ${style.fil_btn}`} onClick={() => toggleFilter('rooms')}>
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
                    <button className={`d-flex px-2 justify-content-between align-items-baseline w-100 ${style.fil_btn}`} onClick={() => toggleFilter('beds')}>
                        Posti letto
                        <FontAwesomeIcon
                            icon={faSortDown}
                            rotation={activeFilters.beds ? 0 : 270}
                            style={{ color: "#ffffff" }}
                        />
                    </button>
                    {activeFilters.beds && (
                        <div className={`${style.filter_options}`}>
                            {['1', '2', '3', '4+'].map((option) => (
                                <button key={option} name='beds' value={option} className={`${style.filter_button}`} onClick={handleFilterChange}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Filtro: Bagni */}
                    <button className={`d-flex px-2 justify-content-between align-items-baseline w-100 ${style.fil_btn}`} onClick={() => toggleFilter('bathrooms')}>
                        Bagni
                        <FontAwesomeIcon
                            icon={faSortDown}
                            rotation={activeFilters.bathrooms ? 0 : 270}
                            style={{ color: "#ffffff" }}
                        />
                    </button>
                    {activeFilters.bathrooms && (
                        <div className={`${style.filter_options}`}>
                            {['1', '2', '3+'].map((option) => (
                                <button key={option} className={`${style.filter_button}`} name='bathrooms' value={option} onClick={handleFilterChange}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Filtro: Dimensioni */}
                    <button className={`d-flex px-2 justify-content-between align-items-baseline w-100 ${style.fil_btn}`} onClick={() => toggleFilter('size')}>
                        Dimensioni
                        <FontAwesomeIcon
                            icon={faSortDown}
                            rotation={activeFilters.size ? 0 : 270}
                            style={{ color: "#ffffff" }}
                        />
                    </button>
                    {activeFilters.size && <SlideFilter />}

                    {/* Filtro: Prezzo giornaliero */}
                    <button className={`d-flex px-2 justify-content-between align-items-baseline w-100 ${style.fil_btn}`} onClick={() => toggleFilter('price')}>
                        Prezzo giornaliero
                        <FontAwesomeIcon
                            icon={faSortDown}
                            rotation={activeFilters.price ? 0 : 270}
                            style={{ color: "#ffffff" }}
                        />
                    </button>
                    {activeFilters.price && <SlideFilter />}
                </div>
            )}
        </>
    );
}
