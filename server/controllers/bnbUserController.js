const connection = require("../data/db");



function index(req, res) {
    let sql = "SELECT * FROM properties"
    const params = [];
    if (req.query.city) {
        sql += " WHERE city LIKE ?"
        params.push(`%${req.query.city}%`)
    }
    sql += " ORDER BY vote DESC"
    connection.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });

        results.forEach(result => {

            const formattedImage = result.image?.split(' ').join('_')
            result.image = `http://localhost:3000/images/${formattedImage}`
        })


        res.json(results);
    });

}





function show(req, res) {
    const id = req.params.id;
    const sqlHouse = "SELECT * FROM properties WHERE id = ?";
    const sqlReviews = "SELECT * FROM reviews AS rev JOIN rents AS r ON rev.rent_id=r.id JOIN users AS u ON r.user_id=u.id WHERE r.property_id= ?";
    const sqlOwnerEmail = `SELECT o.email FROM properties as p JOIN owners as o ON p.owner_id = o.id WHERE p.id = ?`
    connection.query(sqlHouse, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        if (results.length === 0) return res.status(404).json({ errore: "House not found" });
        const house = results[0];
        connection.query(sqlReviews, [id], (err, results) => {
            if (err) return res.status(500).json({ error: "Database query failed" });
            house.reviews = results;

            const formattedImage = house.image?.split(' ').join('_')
            house.image = `http://localhost:3000/images/${formattedImage}`
            connection.query(sqlOwnerEmail, [id], (err, resultsEmail) => {
                if (err) return res.status(500).json({ error: "Database query failed" });
                if (results.length === 0) return res.status(404).json({ errore: "email not found" });
                house.ownerEmail = resultsEmail[0].email
                res.json(house)


            })
        })
    })
}



function update(req, res) {
    const propertyId = req.params.id;
    const updates = req.body;

    if (!Object.keys(updates).length) {
        return res.status(400).json({ error: 'No updates provided' });
    }

    const sql = "UPDATE properties SET ? WHERE id = ?";
    connection.query(sql, [updates, propertyId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.status(200).json({ message: 'Property updated successfully' });
    });
}

function postReview(req, res) {
    const id = req.params.id;
    const { text, email, vote } = req.body

    const sqlFirstControlUserEmail = "SELECT r.id FROM users AS u INNER JOIN rents AS r ON u.id=r.user_id WHERE u.email= ? AND r.property_id= ?"

    connection.query(sqlFirstControlUserEmail, [email, id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database query failed 0" });
        }
        if (results.length === 0) {
            return res.status(422).json({
                "error": "The provided email does not match any user with reservations."
            })
        }
        const rentId = results[0].id;
        const sqlSecondControlReview = "SELECT * FROM reviews WHERE rent_id= ?"

        connection.query(sqlSecondControlReview, [rentId], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Database query failed 1" });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    "error": "You have already submitted a review for this property."
                })
            }

            const sqlInsertReview = "INSERT INTO reviews (vote, text, rent_id) VALUES (?, ?, ?)"

            connection.query(sqlInsertReview, [vote, text, rentId], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Database query failed 2" });

                }
                res.status(201).json({
                    message: "Review added successfully",
                    reviewId: results.insertId
                })
            })
        })
    })

}





module.exports = { index, show, update, postReview };



