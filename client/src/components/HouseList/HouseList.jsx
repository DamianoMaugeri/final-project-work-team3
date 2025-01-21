import GlobalContext from "../../context/GlobalContext"
import { useContext, useEffect } from "react"
import axios from 'axios'
import HouseCard from "../HouseCard/HouseCard"
import { Link } from "react-router-dom"

export default function HouseList() {


    const { houses, setHouses, searchedCity } = useContext(GlobalContext)



    function fetchHouses() {

        axios.get('http://localhost:3000/api/boolbnb', {
            params: {
                city: searchedCity
            }
        })
            .then(res => {
                setHouses(res.data)
                console.log(res.data)
            }).catch(err => console.error(err))
            .finally(() => {
                console.log('finally')
            })

    }

    useEffect(() => {
        fetchHouses()
    }, []);





    return (

        houses.length > 0 ?

            (<div className="container">
                <div className="row">
                    {houses.map((house, i) => (
                        <div key={i} className="col">
                            <Link to={`/${house.id}`} >
                                <HouseCard content={house} />
                            </Link>


                        </div>
                    ))}
                </div>
            </div>) :
            (<div>nessun risultato</div>)



    )
}