const connection = require("../data/db");

function propertiesByOwner(req, res) {
    const ownerId = req.user.id; // Estratto dal token JWT

    const sqlOwner = 'SELECT * FROM owners WHERE id = ?';
    const sqlProperties = 'SELECT * FROM properties WHERE owner_id = ?';

    // Recupera i dati dell'owner
    connection.query(sqlOwner, [ownerId], (err, resultsOwner) => {
        if (err) return res.status(500).json({ error: 'Database query failed 1' });

        if (resultsOwner.length === 0) {
            return res.status(404).json({ error: 'Nessun owner trovato con questo ID' });
        }

        const owner = resultsOwner[0];

        // Recupera le proprietà dell'owner
        connection.query(sqlProperties, [ownerId], (err, resultsProperties) => {
            if (err) return res.status(500).json({ error: 'Database query failed 2' });

            if (resultsProperties.length === 0) {
                return res.status(404).json({ error: 'Nessuna proprietà trovata per questo owner' });
            }

            resultsProperties.forEach(result => {
                const formattedImage = result.image?.split(' ').join('_');
                result.image = `http://localhost:3000/images/${formattedImage}`;
            });

            owner.propertiesOwned = resultsProperties;
            res.json(owner);
        });
    });
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