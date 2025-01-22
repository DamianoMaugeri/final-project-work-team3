import ReviewCard from "../../components/Review Card/ReviewCard"


export default function ShowPage() {
    return (
        <>

            {/* detagli casa */}

            <div>show page</div>
            <div>
                <div>
                    <img src="" alt="" />
                </div>
                <div>vote</div>
                <div>
                    <h3>tipo di casa</h3>
                    <p>description</p>
                </div>
            </div>

            <div>
                <div>Detagli</div>
                <ul>
                    <li># rooms</li>
                    <li># beds</li>
                    <li># bathroom</li>
                    <li>size</li>
                    <li>ciy</li>
                </ul>
            </div>


            {/* recensioni box */}
            <ReviewCard />


        </>

    )
} 