const connection = require("../data/db");

function propertiesByOwner(req, res) {

    const email = req.params.email;
    const sqlAutenticationEmail = "SELECT * FROM owners WHERE email = ?"
    const sql = "SELECT * FROM properties WHERE owner_id = ?";
    connection.query(sqlAutenticationEmail, [email], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" })
        if (results.length === 0) return res.status(404).json(
            {
                error: "Email not found",
                message: "No owner found with the provided Email"
            })
        const ownerId = results.id


        connection.query(sql, [ownerId], (err, results) => {
            if (err) return res.status(500).json({ error: "Database query failed" });
            if (results.length === 0) return res.status(404).json({ error: "No properties found for this owner" });

            results.forEach(result => {
                const formattedImage = result.image?.split(' ').join('_');
                result.image = `http://localhost:3000/images/${formattedImage}`;
            });

            res.json(results);
        });

    })
}


function create(req, res) {
    const { owner_id, title, number_of_rooms, number_of_beds, number_of_bathrooms, size, full_address, city, image, price_per_day, vote, house_type } = req.body;

    // Controlla che tutti i campi obbligatori siano presenti
    if (!owner_id || !title || !number_of_rooms || !number_of_beds || !number_of_bathrooms || !size || !full_address || !city || !price_per_day || !vote) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // house_type può essere nullo e nel caso in cui non è nullo i suoi valori possibili sono : appartamento, casa indipendente, villa, villetta a schiera, chalet, baita (NOTA BENE QUALSIASI ALTRO VALORE NON VERRA' ACCETTATO!!!)
    const sql = `
        INSERT INTO properties (owner_id, title, number_of_rooms, number_of_beds, number_of_bathrooms, size, full_address, city, image, price_per_day, vote, house_type) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(sql, [owner_id, title, number_of_rooms, number_of_beds, number_of_bathrooms, size, full_address, city, image, price_per_day, vote, house_type], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });

        res.status(201).json({
            message: "Property added successfully",
            propertyId: results.insertId,
        });
    });
}

module.exports = { propertiesByOwner, create }