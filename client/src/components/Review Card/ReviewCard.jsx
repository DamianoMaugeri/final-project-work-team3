import style from './ReviewCard.module.css';

export default function ReviewCard({ reviews }) {



    return (
        reviews ?
            <section className="container mt-4">
                <div>
                    <h3 className="card-title mb-2">Recensioni degli affittuari:</h3>
                </div>
                <div className="card" >
                    <div className={`card-body ${style.customCardBody}`} >
                        <div className="row d-flex flex-column gap-3">
                            {reviews.map((review, index) => (
                                <div key={index} className={`col d-flex flex-column gap-2 ${style.customSingleCard}`}>
                                    <div className="d-flex justify-content-initial gap-3">
                                        <div className="card-text fs-6"><strong>Check In:</strong> {new Date(review.rent_start).toLocaleDateString()}</div>
                                        <div className="card-text fs-6"><strong>Check Out: </strong> {new Date(review.rent_end).toLocaleDateString()}</div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="card-text fst-italic">{review.text}</div>
                                        <div className="card-text"><strong>Valutazione:</strong>{review.vote}</div>
                                    </div>

                                    <div className="card-text fst-italic" ><strong>By: </strong>{review.first_name} {review.last_name}</div>


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