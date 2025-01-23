import { useContext } from "react"
import GlobalContext from "../../context/GlobalContext"
import HouseCard from "../../components/HouseCard/HouseCard"
import HouseForm from "../../components/HouseForm/HouseForm"

export default function OwnerShowpage() {

    const { owner, setOwner } = useContext(GlobalContext)

    console.log(owner)


    const { id, first_name, last_name, email, propertiesOwned } = owner



    return (
        owner &&
        <>
            <div>
                <div>
                    {first_name}
                </div>
                <div> {last_name} </div>
                <div> {email} </div>

                <div>
                    {propertiesOwned.map((property, i) => (
                        <div key={i}> <HouseCard content={property} /> </div>
                    ))}
                </div>
            </div>
            <HouseForm />

        </>

    )
} 