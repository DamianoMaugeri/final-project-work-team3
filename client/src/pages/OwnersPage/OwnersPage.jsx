import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import axios from 'axios';
import style from './OwnersPage.module.css';

const initialFormData = {
    email: '',
    password: ''
};

export default function OwnersPage() {
    const [formData, setFormData] = useState(initialFormData);
    const [isLogged, setIsLogged] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { owner, setOwner } = useContext(GlobalContext);

    const navigate = useNavigate();

    function handleForm(e) {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function logIn(e) {
        e.preventDefault();

        const data = {
            email: formData.email.trim(),
            password: formData.password.trim()
        };

        if (!data.email || !data.password) {
            setErrorMessage('Please enter both email and password.');
            return;
        }

        axios.post(`http://localhost:3000/auth/Owners/login`, data)
            .then(res => {
                // Salva il token nel localStorage
                localStorage.setItem('token', res.data.token);

                // Aggiorna lo stato con i dati dell'owner
                setOwner(res.data.owner);

                // Reimposta i dati del form
                setFormData(initialFormData);
                setIsLogged(true);

                // Naviga alla pagina dell'owner
                navigate(`/owners/${res.data.owner.id}`);
            })
            .catch(err => {
                setErrorMessage('Invalid email or password.');
            });
    }

    // Se l'owner è già loggato, reindirizza direttamente alla sua pagina
    useEffect(() => {
        if (owner && owner.id) {
            navigate(`/owners/${owner.id}`);
        }
    }, [navigate, owner]);

    return (
        <form className={style.customForm} onSubmit={logIn}>
            <p className={style.formGroup}>
                <label htmlFor="email" className="form-label fw-bold">INSERISCI LA TUA EMAIL *</label>
                <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="inserisci l'email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleForm}
                />
            </p>

            <p className={style.formGroup}>
                <label htmlFor="password" className="form-label fw-bold">INSERISCI LA TUA PASSWORD *</label>
                <input
                    required
                    type="password"
                    className="form-control"
                    placeholder="inserisci la password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleForm}
                />
            </p>

            {errorMessage && <div className="text-danger">{errorMessage}</div>}

            <button type="submit" className="btn btn-primary">Accedi</button>
        </form>
    );
}
