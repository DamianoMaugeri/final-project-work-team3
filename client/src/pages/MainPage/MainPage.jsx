import HouseList from "../../components/HouseList/Houselist";
import SearchBar from "../../components/SearchBar/SearchBar";
import style from './MainPage.module.css'


export default function MainPage() {

    return (
        <div className={style.mainpage} >
            <SearchBar />
            <HouseList />
        </div>
    )
}