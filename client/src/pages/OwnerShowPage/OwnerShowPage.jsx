import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import HouseCard from "../../components/HouseCard/HouseCard";
import HouseForm from "../../components/HouseForm/HouseForm";
import style from './OwnerShowpage.module.css';

export default function OwnerShowpage() {
    const { owner, setOwner } = useContext(GlobalContext);
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token');  // Rimuovi il token dal localStorage
        setOwner(null);  // Resetta lo stato dell'owner
        navigate("/login");  // Reindirizza al login
    }

    // Se non c'è un owner, reindirizza al login
    useEffect(() => {
        if (!owner || !owner.id) {
            navigate("/login");
        }
    }, [owner, navigate]);

    // Se l'owner è ancora in fase di caricamento, mostra un messaggio di caricamento
    if (!owner) {
        return <div>Loading...</div>;
    }

    const { first_name, last_name, email, propertiesOwned } = owner;

    return (
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
                            <button onClick={logout} className="btn btn-danger">Logout</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <h3 className="mb-3">I tuoi immobili:</h3>
                            {propertiesOwned?.length > 0 ? (
                                <div className="d-flex flex-wrap gap-3">
                                    {propertiesOwned.map((property, i) => (
                                        <div key={i} className="col-12 col-md-6 col-lg-4">
                                            <HouseCard content={property} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-white">Nessuna proprietà trovata.</p>
                            )}
                        </div>
                    </div>

                    <div className="row mt-4">
                        <h1>Aggiungi un nuovo immobile:</h1>
                        <div className="col mt-4">
                            <HouseForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
