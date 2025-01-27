import HouseShowCard from "../../components/House Show Card/HouseShowCard"
import ReviewCard from "../../components/Review Card/ReviewCard"
import ReviewForm from "../../components/ReviewForm/ReviewForm"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import style from "./ShowPage.module.css"
import Loader from "../../components/Loader/Loader"
import EmailForm from "../../components/emailForm/emailForm"
import HeaderMain from "../../components/HeaderMain/HeaderMain"

export default function ShowPage() {


    const [house, setHouse] = useState(null)
    const [reviewBoolean, setReviewBoolean] = useState("")
    const [emailBoolean, setEmailBoolean] = useState("")
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
        // ShowPage div container
        <div className={`d-flex flex-column flex-grow-1 mt-5 pt-3 ${style.showPageContainer}`}>
            <HeaderMain />
            {house ? ( //if lenght > 0 render ShowPage else render loader inside  the ShowPage div container
                <>
                    <HouseShowCard houseEl={house} />
                    {/* recensioni box */}


                    <div className="d-flex justify-content-around mb-5 mt-5">
                        <button className={`${style.btn} ${reviewBoolean ? style['btn-active'] : ''}`} onClick={() => {
                            emailBoolean && setEmailBoolean(!emailBoolean)
                            setReviewBoolean(!reviewBoolean)
                        }}>Lascia una recensione</button>

                        <button className={`${style.btn} ${emailBoolean ? style['btn-active'] : ''}`} onClick={() => {
                            reviewBoolean && setReviewBoolean(!reviewBoolean)
                            setEmailBoolean(!emailBoolean)
                        }}>Contatta il proprietario</button>
                    </div>
                    {/* form recensioni */}
                    {!emailBoolean && reviewBoolean && <ReviewForm />}

                    {!reviewBoolean && emailBoolean && <EmailForm email={house.ownerEmail} />}

                    <ReviewCard reviews={house.reviews} />
                </>
            ) :

                // ... else render loader inside  the ShowPage div container
                (
                    <div className="d-flex align-items-center justify-content-center flex-grow-1">
                        <Loader />
                    </div>
                )}
        </div>

    )
} 