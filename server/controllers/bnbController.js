const connection = require("../data/db");



function index(req, res) {
    let sql = "SELECT * FROM properties"
    const params = [];
    if (req.query.city) {
        sql += " WHERE city= ?"
        params.push(req.query.city)
    }
    sql += " ORDER BY vote DESC"
    connection.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });

        results.forEach(result => {

            const formattedImage = result.image.split(' ').join('_')
            result.image = `http://localhost:3000/images/${formattedImage}`
        })


        res.json(results);
    });

}





function show(req, res) {
    const id = req.params.id;
    const sqlHouse = "SELECT * FROM properties WHERE id = ?";
    const sqlReviews = "SELECT * FROM reviews AS rev JOIN rents AS r ON rev.rent_id=r.id JOIN users AS u ON r.user_id=u.id WHERE r.property_id= ?";
    connection.query(sqlHouse, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        if (results.length === 0) return res.status(404).json({ errore: "House not found" });
        const house = results[0];
        connection.query(sqlReviews, [id], (err, results) => {
            if (err) return res.status(500).json({ error: "Database query failed" });
            house.reviews = results;

            const formattedImage = house.image.split(' ').join('_')
            house.image = `http://localhost:3000/images/${formattedImage}`
            res.json(house);
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



function propertiesByOwner(req, res) {
    const ownerId = req.params.ownerId;
    const sql = "SELECT * FROM properties WHERE owner_id = ?";
    connection.query(sql, [ownerId], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        if (results.length === 0) return res.status(404).json({ error: "No properties found for this owner" });

        results.forEach(result => {
            const formattedImage = result.image.split(' ').join('_');
            result.image = `http://localhost:3000/images/${formattedImage}`;
        });

        res.json(results);
    });
}


function create(req, res) {
    const { number_of_rooms, number_of_beds, number_of_bathrooms, size, full_address, email, ownerId, title, city, price, image } = req.body;

    // Controlla che tutti i campi obbligatori siano presenti
    if (!ownerId || !title || !city || !price || !image) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `
        INSERT INTO properties (owner_id, name, city, price, image) 
        VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(sql, [ownerId, name, city, price, image], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });

        res.status(201).json({
            message: "Property added successfully",
            propertyId: results.insertId,
        });
    });
}

module.exports = { index, show, update, propertiesByOwner, create };



