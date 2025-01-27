import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import style from './Filters.module.css';

export default function Filters() {
    const [filterActive, setFilterActive] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        rooms: false,
        beds: false,
        bathrooms: false,
        size: false,
        price: false
    });

    const toggleFilter = (filterName) => {
        setActiveFilters((prev) => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
    };

    return (
        <>
            {/* Tasto per attivare/disattivare tutti i filtri */}
            <button className={style.fil} onClick={() => {
                setFilterActive(!filterActive)
                setActiveFilters({
                    rooms: false,
                    beds: false,
                    bathrooms: false,
                    size: false,
                    price: false
                })
            }}>
                Filtri avanzati
            </button>

            {/* Contenitore dei filtri */}
            {filterActive && (
                <div className={`${style.filters} p-3 text-white`}>
                    {/* Filtro: Numero di stanze */}
                    <button className='d-flex justify-content-between align-items-baseline w-100' onClick={() => toggleFilter('rooms')}>
                        Numero di stanze
                        <FontAwesomeIcon
                            icon={faSortDown}
                            rotation={activeFilters.rooms ? 0 : 270}
                            style={{ color: "#ffffff" }}
                        />
                    </button>
                    {activeFilters.rooms && (
                        <div className={`${style.filterOptions}`}>
                            {['1', '2', '3', '4', '5+'].map((option) => (
                                <button key={option} className={`${style.filterButton}`}>
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
                                <button key={option} className={`${style.filterButton}`}>
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
                                <button key={option} className={`${style.filterButton}`}>
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
                                <button key={option} className={`${style.filterButton}`}>
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
                                <button key={option} className={`${style.filterButton}`}>
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
