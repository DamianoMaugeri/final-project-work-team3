import { useContext } from "react"
import GlobalContext from "../../context/GlobalContext"
import HouseCard from "../../components/HouseCard/HouseCard"
import HouseForm from "../../components/HouseForm/HouseForm"
import style from './OwnerShowpage.module.css'

export default function OwnerShowpage() {

    const { owner, setOwner } = useContext(GlobalContext)

    console.log(owner)


    const { id, first_name, last_name, email, propertiesOwned } = owner



    return (
        owner &&
        <>
            <section className={`container m-4 ${style.page}`}>
                <div className={`card ${style.customCard}`}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <h1 className="card-title">
                                    {first_name} {last_name}
                                </h1>
                                <h6 className="card-subtitle mb-4 text-white">
                                    {email}
                                </h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <h3 className="mb-3">I tuoi immobili:</h3>
                                {propertiesOwned.length > 0 ? (
                                    <div className="d-flex flex-wrap gap-3">
                                        {propertiesOwned.map((property, i) => (
                                            <div key={i} className="col-12 col-md-6 col-lg-4">
                                                <HouseCard content={property} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted">Nessuna proprietà trovata.</p>
                                )}
                            </div>
                        </div>

                        <div className="row mt-4">
                            <h1>Aggiungi un nuovo immobile:</h1>
                            <div className="col mt-4">
                                <HouseForm id={id} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
} 