export default function ReviewCard({ reviews }) {



    return (
        reviews ?
            <section className="container mt-4">
                <div>
                    <h3 className="card-title mb-2">Recensioni degli affittuari:</h3>
                </div>
                <div className="card" >
                    <div className="card-body" >
                        <div className="row">
                            {reviews.map((review, index) => (
                                <div key={index} className="col">
                                    <p className="card-text">{review.text}</p>
                                    <div>
                                        <p className="card-text"><strong>Valutazione:</strong> {review.vote}</p>
                                        <div>
                                            <p className="card-text"><strong>Check In:</strong> {new Date(review.rent_start).toLocaleDateString()}</p>
                                            <p className="card-text"><strong>Check Out: </strong> {new Date(review.rent_end).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <p className="card-text" ><strong>Scritta da: </strong>{review.first_name} {review.last_name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            :
            <div>nessun risultato </div>
    );

}