import GlobalContext from "../../context/GlobalContext"
import { useContext, useEffect } from "react"
import axios from 'axios'
import HouseCard from "../HouseCard/HouseCard"
import { Link } from "react-router-dom"
import Loader from "../Loader/Loader"

export default function HouseList() {


    const { houses, setHouses, searchedCity, fetchHouses } = useContext(GlobalContext)







    useEffect(() => {
        fetchHouses()
    }, []);





    return (

        houses.length > 0 ?

            (<div className="container">
                <div className="row d-flex flex-wrap row-gap-5 ">
                    {houses.map((house, i) => (
                        <div key={i} className="col-lg-4 col-md-6 col-xs-12">
                            <Link className="text-decoration-none text-dark" to={`/${house.title.replace(/ /g, '-')}`} >
                                <HouseCard content={house} />
                            </Link>


                        </div>
                    ))}
                </div>
            </div>) :
            (<Loader />)



    )
}