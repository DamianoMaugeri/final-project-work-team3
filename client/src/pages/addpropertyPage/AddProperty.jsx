import HouseForm from "../../components/HouseForm/HouseForm";
import { useParams } from "react-router-dom";
import style from '../OwnerShowPage/OwnerShowPage.module.css'


export default function AddProperty() {
    const { id } = useParams();


    return (
        <section className={`flex-grow-1 ${style.page} `}>
            {/* <HeaderOwners ownerId={id} onLogout={logout} firstName={first_name} lastName={last_name} /> */}
            <div className={`card m-4 ${style.customCard}`}>


                <div className="row mt-4">
                    <h1 className="text-center">Aggiungi un nuovo immobile:</h1>
                    <div className="col mt-4">
                        <HouseForm id={id} />
                    </div>
                </div>
            </div>

        </section >
    )
}