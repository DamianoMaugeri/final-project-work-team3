import style from './Filters.module.css'

// i filtri sono questi ma non va bene l'idea di utilizzare i radio button meglio cambiare con <FontAwesomeIcon icon="fa-solid fa-circle-chevron-down" rotation={270} /> quando il filtro è chiuso e <FontAwesomeIcon icon="fa-solid fa-circle-chevron-down" />
export default function Filters() {
    return (
        <div className={`${style.filters} p-0`} >
            <button>Filtri avanzati</button>
            <div className='d-flex justify-content-start'>
                <input type="radio" id='roomsNumber' name='filters' />
                <label htmlFor="roomsNumber">Numero di stanze</label>

            </div>
            <div className='d-flex flex-start'>
                <input type="radio" id='roomsNumber' name='filters' />
                <label htmlFor="roomsNumber">Posti letto</label>

            </div>
            <div className='d-flex'>
                <input type="radio" id='roomsNumber' name='filters' />
                <label htmlFor="roomsNumber">Bagni</label>

            </div>
            <div className='d-flex'>
                <input type="radio" id='roomsNumber' name='filters' />
                <label htmlFor="roomsNumber">Dimensioni</label>

            </div>
            <div className='d-flex'>
                <input type="radio" id='roomsNumber' name='filters' />
                <label htmlFor="roomsNumber">Prezzo giornaliero</label>

            </div>
        </div>
    )
}