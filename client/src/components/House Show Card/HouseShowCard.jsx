

export default function HouseShowCard({ houseEl }) {


    const { title, number_of_rooms, number_of_beds, number_of_bathrooms, size, city, full_address, image } = houseEl

    return (
        houseEl ?
            <>
                <section className="container mt-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="row ">
                                <div className="col-auto">
                                    <img src={image} alt={title} className="img-fluid" style={{ maxWidth: '200px' }} />
                                </div>
                                <div className="col">
                                    <div>
                                        <h2 className="card-title mb-4">{title}</h2>
                                        <h5 className="card-text">Dettagli dell'immobile:</h5>
                                        <ul>
                                            <li className="card-text">Valutazione: </li>
                                            <li className="card-text" >Indirizzo: {full_address}</li>
                                            <li className="card-text">Stanze: {number_of_rooms}</li>
                                            <li className="card-text">Posti letto: {number_of_beds}</li>
                                            <li className="card-text">Bagni: {number_of_bathrooms}</li>
                                            <li className="card-text">Dimensione: {size}</li>
                                            <li className="card-text">Città: {city}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </> :
            <div>Nessun resultato</div>
    )
}