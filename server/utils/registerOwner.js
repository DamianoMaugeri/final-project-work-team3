const bcrypt = require('bcrypt');
const connection = require('../data/db'); // Usa require per importare

const firstName = "pinco";
const lastName = "pallino";
const email = 'pinco.pallino@email.com';
const plainPassword = 'passwordprova123';

const saltRounds = 10;

const registerUser = async () => {
    try {
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

        connection.execute(
            'INSERT INTO owners (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, firstName, lastName],
            (err, results) => {
                if (err) {
                    console.error("Errore durante l'inserimento dell'utente:", err);
                } else {
                    console.log('Utente registrato con successo!');
                }
            }
        );
    } catch (error) {
        console.error("Errore durante la registrazione dell'utente:", error);
    }
};

registerUser();
