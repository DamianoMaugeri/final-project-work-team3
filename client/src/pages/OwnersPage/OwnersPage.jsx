import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import GlobalContext from "../../context/GlobalContext"
import axios from 'axios'
import style from './OwnersPage.module.css'

const initialFormData = {
    email: ''
}


export default function OwnersPage() {

    const [formData, setFormData] = useState(initialFormData)
    const [isLogged, setIsLogged] = useState(false)

    const { owner, setOwner } = useContext(GlobalContext)

    const navigate = useNavigate()




    function handleForm(e) {
        const { value, name } = e.target

        setFormData(
            {
                ...formData,
                [name]: value
            }
        )
    };

    function logIn(e) {
        e.preventDefault();

        const data = {
            email: formData.email.trim()
        }


        if (!data.email) {
            console.log('form is not valid')
            return
        }

        axios.get(`http://localhost:3000/api/boolbnb/owner`, {
            params: {
                email: data.email
            }
        })
            .then(res => {
                console.log(res.data)
                // se la chiamata va a buon fine dovremmo andare sulla rotta del propietario 
                // e resettare il form
                setFormData(initialFormData)
                setIsLogged(true)
                setOwner(res.data)
                console.log(owner)
                navigate(`/owners/${res.data.id}`);


            }).catch(err => {
                console.log(err)

            })

    }




    useEffect(() => {
        if (owner !== undefined) {
            navigate(`/owners/${owner.id}`);
        }
    }, [navigate]); // Aggiungi le dipendenze necessarie








    return (
        <form className={style.customForm} onSubmit={logIn} >

            <p className={style.formGroup}>
                <label htmlFor="email" className="form-label">INSERISCI LA TUA EMAIL *</label>
                <input required type="text" className="form-control" placeholder="inserisci l'email" name="email" id="email" value={formData.email} onChange={handleForm} />

            </p>


        </form>
    )
}