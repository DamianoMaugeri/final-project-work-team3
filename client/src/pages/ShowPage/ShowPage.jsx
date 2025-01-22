import HouseShowCard from "../../components/House Show Card/HouseShowCard"
import ReviewCard from "../../components/Review Card/ReviewCard"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"


export default function ShowPage() {

    // recuperare l'id del libro dal path della rotta
    const [house, setHouse] = useState(null)

    const { id } = useParams()


    function fetchHouse() {
        axios.get(`http://localhost:3000/api/boolbnb/${id}`)
            .then(res => {
                setHouse(res.data)
                console.log('data', res.data)
            })
            .catch(err => {
                console.error(err)
                // qui dovremmo fare un redirect alla pagina 404
            })

    }

    useEffect(() => {
        fetchHouse()
    }, [id])


    return (
        house ?
            <>

                {/* detagli casa */}
                <HouseShowCard houseEl={house} />

                {/* recensioni box */}
                <ReviewCard />


            </> :
            <div>nessun risultato</div>

    )
} 