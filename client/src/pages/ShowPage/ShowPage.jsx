import { useState } from "react"
import axios from "axios"
import ReviewCard from "../../components/Review Card/ReviewCard"


export default function ShowPage() {

    // recuperare l'id del libro dal path della rotta
    const [house, setHouse] = useState(null)

    const { id } = useParams()


    function fetchHouse() {
        axios.get(`http://localhost:3000/api/boolbnb/${id}`)
            .then(res => {
                setHouse(res.data)
                console.log('data', data)
            })
            .catch(err => {
                console.error(err)
                // qui dovremmo fare un redirect alla pagina 404
            })
            
    }

    useEffect(() => {
        fetchMovie()
    }, [id])


    return (
        <>

            {/* detagli casa */}
            <div className="d-flex">
                <div>
                    <img src="" alt="" />
                </div>
                <div>vote</div>
                <div>
                    <h3>tipo di casa</h3>
                    <p>description</p>
                </div>
            </div>

            <div>
                <div>Detagli</div>
                <ul>
                    <li># rooms</li>
                    <li># beds</li>
                    <li># bathroom</li>
                    <li>size</li>
                    <li>ciy</li>
                </ul>
            </div>


            {/* recensioni box */}
            <ReviewCard />


        </>

    )
} 