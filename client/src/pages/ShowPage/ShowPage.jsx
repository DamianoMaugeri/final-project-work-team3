import HouseShowCard from "../../components/House Show Card/HouseShowCard"
import ReviewCard from "../../components/Review Card/ReviewCard"
import ReviewForm from "../../components/ReviewForm/ReviewForm"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import style from "./ShowPage.module.css"
import Loader from "../../components/Loader/Loader"


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
            (
                <div className={`d-flex flex-column ${style.showPageContainer}`}>
                    {/* detagli casa */}
                    <HouseShowCard houseEl={house} />

                    {/* recensioni box */}
                    <ReviewCard reviews={house.reviews} />

                    {/* form recensioni */}
                    <ReviewForm />
                </div >



            ) :
            (<Loader />)

    )
} 