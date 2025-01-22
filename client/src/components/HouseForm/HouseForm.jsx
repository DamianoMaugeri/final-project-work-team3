import { useState } from "react"

const initialFormData = {
    title: "",
    number_of_rooms: "",
    number_of_beds: "",
    number_of_bathrooms: "",
    size: "",
    full_address: "",
    city: "",
    image: "",
    house_type: "",
}

export default function HouseForm(id, onSuccess = () => { }) {


    const [formData, setFormData] = useState(initialFormData)

    function handleForm(e) {
        const { value, name } = e.target

        setFormData(
            {
                ...formData,
                [name]: value
            }
        )
    };

    function storeNewHouse(e) {
        e.preventDefault()


        const data = {
            title: formData.title.trim() || undefined,
            number_of_rooms: parseInt(formData.number_of_rooms),
            number_of_beds: parseInt(formData.number_of_beds),
            number_of_bathrooms: parseInt(formData.number_of_bathrooms),
            size: parseInt(formData.size),
            full_address: formData.full_address.trim(),
            city: formData.city.trim(),
            image: formData.image,
            house_type: formData.house_type.trim(),



        }



        // validazione lato client
        if (!data.title ||
            !data.number_of_rooms ||
            data.number_of_rooms < 0 ||
            !data.number_of_beds ||
            data.number_of_beds < 0 ||
            !data.number_of_bathrooms ||
            data.number_of_bathrooms < 0 ||
            !data.size ||
            data.size < 0 ||
            !data.full_address ||
            !data.image ||
            !data.house_type) {
            console.log('form is not valid')
            return
        }



        axios.post(`http://localhost:3000/api/boolbnb/owners/${id}`, data)
            .then(res => {
                console.log(res)
                // se la chiamata va a buon fine dovremmo refetchare il book
                // e resettare il form
                setFormData(initialFormData)
                onSuccess()
            }).catch(err => {
                console.log(err)

            })
    }





    return (
        <form onSubmit={storeNewHouse}>

            <p>
                <label htmlFor="title" className="form-label">NOME DELLA CASA *</label>
                <input required type="text" className="form-control" placeholder="inserisci il nome della casa" name="title" id="title" value={formData.title} onChange={handleForm} />

            </p>
            <p>
                <label htmlFor="number_of_rooms" className="form-label">NUMERO DI STANZE *</label>
                <input required type="text" className="form-control" placeholder="inserisci il numero di stampe" name="number_of_rooms" id="number_of_rooms" value={formData.number_of_rooms} onChange={handleForm} />

            </p>
            <p>
                <label htmlFor="number_of_beds" className="form-label">NUMERO DI LETTI *</label>
                <input required type="text" className="form-control" placeholder="inserisci il numero di letti " name="number_of_beds" id="number_of_beds" value={formData.number_of_beds} onChange={handleForm} />

            </p>
            <p>
                <label htmlFor="number_of_bathrooms" className="form-label">NUMERO DI BAGNI *</label>
                <input required type="text" className="form-control" placeholder="inserisci il numero di bagni" name="number_of_bathrooms" id="number_of_bathrooms" value={formData.number_of_bathrooms} onChange={handleForm} />

            </p>
            <p>
                <label htmlFor="size" className="form-label">TETRI QUADRI DELLA CASA *</label>
                <input required type="text" className="form-control" placeholder="inserisci la metratura della casa" name="size" id="size" value={formData.size} onChange={handleForm} />

            </p>
            <p>
                <label htmlFor="full_address" className="form-label">EMAIL *</label>
                <input required type="text" className="form-control" placeholder="inserisci l' indirizzo" name="full_address" id="full_address" value={formData.full_address} onChange={handleForm} />

            </p>
            <p>
                <label htmlFor="city" className="form-label">CITTA' *</label>
                <input required type="text" className="form-control" placeholder="inserisci la città" name="city" id="city" value={formData.city} onChange={handleForm} />

            </p>
            <p>
                <label htmlFor="image" className="form-label">FOTO *</label>
                <input required type="text" className="form-control" placeholder="inserisci il nome della foto" name="image" id="image" value={formData.image} onChange={handleForm} />

            </p>


            <p className='form-control'>
                <label htmlFor="house_type" className="form-label" >TIPO DI CASA *</label>
                <select required name="house_type" id="house_type" className="form-control" value={formData.house_type} onChange={handleForm}>
                    <option value="appartamento">Appartamento</option>
                    <option value="villa">Villa</option>
                    <option value="chalet">Chalet</option>
                    <option value="villetta a schiera">Villetta a schiera</option>
                    <option value="baita">Baita</option>
                    <option value="casa indipendente">Casa indipendente</option>

                </select>
            </p>

            <div>
                {isFormValid === false && <div>i dati non sono validi</div>}
                <button className="submit-button">invia</button>
            </div>





        </form>
    )
}