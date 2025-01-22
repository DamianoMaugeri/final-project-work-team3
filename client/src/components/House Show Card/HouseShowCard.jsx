

export default function HouseShowCard({ houseEl }) {


    const { title, number_of_rooms, number_of_beds, number_of_bathrooms, size, city, full_address, image } = houseEl

    return (
        houseEl ?
            <>
                <div>
                    <div className="w-25">
                        <img src={image} alt={title} />
                    </div>
                    <div>vote</div>
                    <div>
                        <h3>{title}</h3>
                    </div>
                </div>

                <div>
                    <div>Detagli</div>
                    <ul>
                        <li>Full Address: {full_address}</li>
                        <li># rooms: {number_of_rooms}</li>
                        <li># beds: {number_of_beds}</li>
                        <li># bathroom: {number_of_bathrooms}</li>
                        <li>size: {size}</li>
                        <li>city: {city}</li>
                    </ul>
                </div>
            </> :
            <div>Nessun resultato</div>
    )
}