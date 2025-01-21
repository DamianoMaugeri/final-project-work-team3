import HouseList from "../../components/HouseList/HouseList";
import SearchBar from "../../components/SearchBar/SearchBar";
import style from "./MainPage.module.css";

export default function MainPage() {

    return (
        <div>
            <SearchBar className={style.searchBar} />
            <HouseList className={style.houseList} />
        </div>
    )
}