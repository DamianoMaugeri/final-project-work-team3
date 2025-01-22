export default function ReviewCard({ reviews }) {



    return (
        reviews ?
            <div className="mt-5">
                {reviews.map((review, index) => (
                    <div key={index} className="review-card">
                        <p>{review.text}</p>
                        <div>
                            <strong>Voto: {review.vote}</strong>
                            <div>
                                Check In: {new Date(review.rent_start).toLocaleDateString()} - Check Out: {new Date(review.rent_end).toLocaleDateString()}
                            </div>
                        </div>
                        <div>{review.first_name} {review.last_name}</div>
                    </div>
                ))}
            </div> :
            <div>nessun risultato </div>
    );

}