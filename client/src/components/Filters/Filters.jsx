import style from './Filters.module.css'


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
        </div>
    )
}