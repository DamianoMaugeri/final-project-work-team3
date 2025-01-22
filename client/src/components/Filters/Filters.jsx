import style from './Filters.module.css'


export default function Filters() {
    return (
        <ul className={`${style.filters} p-0`} >
            <li>filtro1</li>
            <li>filtro2</li>
            <li>filtro3</li>
            <li>filtro4</li>
            <li>filtro5</li>
        </ul>
    )
}