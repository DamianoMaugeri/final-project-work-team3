import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import HouseCard from "../../components/HouseCard/HouseCard";
import HouseForm from "../../components/HouseForm/HouseForm";
import style from './OwnerShowpage.module.css';
import axios from "axios";
import HeaderOwners from "../../components/headerOwners/HeaderOwners";

export default function OwnerShowpage() {
    const { owner, setOwner } = useContext(GlobalContext);
    const navigate = useNavigate();
    const { id } = useParams();

    // Funzione per recuperare i dati dell'owner
    function fetchOwner() {
        const token = localStorage.getItem("token"); // Recupera il token dal localStorage
        if (!token) {
            console.error("Token non trovato");
            navigate("/login"); // Reindirizza al login se il token non esiste
            return;
        }

        axios.get('http://localhost:3000/api/boolbnb/owner', {
            headers: {
                Authorization: `Bearer ${token}` // Aggiungi il token come intestazione
            }
        })
            .then(res => {
                console.log(res.data);
                setOwner(res.data); // Imposta l'owner nello stato
            })
            .catch(err => {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    navigate("/login"); // Reindirizza al login in caso di errore 401
                }
            });
    }

    // Funzione per il logout
    function logout() {
        localStorage.removeItem('token');  // Rimuovi il token dal localStorage
        setOwner(null);  // Resetta lo stato dell'owner
        navigate("/owners");  // Reindirizza al login
    }

    // Effettua il fetch dei dati dell'owner al caricamento della pagina
    useEffect(() => {
        fetchOwner(); // Recupera i dati dell'owner
    }, []); // L'effetto viene eseguito solo al montaggio del componente

    // Se l'owner è ancora in fase di caricamento, mostra un messaggio di caricamento
    if (!owner) {
        return <div>Loading...</div>;
    }

    // Estrarre i dati dell'owner
    const { first_name, last_name, email, propertiesOwned } = owner;

    // Ritorna il rendering del componente
    return (
        <section className={`flex-grow-1 ${style.page}`}>
            <HeaderOwners ownerId={id} onLogout={logout} />
            <div className={`card m-4 ${style.customCard}`}>
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
