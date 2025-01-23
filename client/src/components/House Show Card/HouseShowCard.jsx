import style from './HouseShowCard.module.css'

export default function HouseShowCard({ houseEl }) {


    const { title, number_of_rooms, number_of_beds, number_of_bathrooms, size, city, full_address, image } = houseEl

    return (
        houseEl ?
            <>
                <section className="container mt-4">
                    <div className={`card ${style.customCard}`}>
                        <div className="card-body">
                            <div className="row ">
                                <div className={`col  ${style.col}`}>
                                    <img src={image} alt={title} className={style.sizeImg} />
                                </div>
                                <div className="col">
                                    <div>
                                        <h2 className="card-title mb-4">{title}</h2>
                                        <h5 className="card-text">Dettagli dell'immobile:</h5>
                                        <ul>
                                            <li className="card-text"><strong>Valutazione:</strong> </li>
                                            <li className="card-text" ><strong>Indirizzo:</strong> {full_address}</li>
                                            <li className="card-text"><strong>Stanze:</strong> {number_of_rooms}</li>
                                            <li className="card-text"><strong>Posti letto:</strong> {number_of_beds}</li>
                                            <li className="card-text"><strong>Bagni:</strong> {number_of_bathrooms}</li>
                                            <li className="card-text"><strong>Dimensione:</strong> {size} mq</li>
                                            <li className="card-text"><strong>Città:</strong> {city}</li>
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