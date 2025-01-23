
const nodemailer = require('nodemailer');

//  configurazione
const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io', // Host SMTP di Mailtrap
    port: 2525,              // Porta SMTP di Mailtrap
    auth: {
        user: process.env.MT_USER, // qui va inserito il nome utente di mail trap
        pass: process.env.MT_PASSWORD, // qui va inserita la password che viene fornita da mail trap
    },
});

function emailSend(req, res) {
    const { from, to, subject, text, html } = req.body;

    console.log('ciao')

    const mailOptions = {
        from,    // email del mittente
        to,      //  email del destinatario destinatario
        subject,           // Oggetto
        text,        // Corpo dell'email in formato testo
        //html,       // Corpo dell'email in formato HTML nel caso in cui c'è bisogno di inviare email particolari che non comprendono solo il testo 
    };

    transporter
        .sendMail(mailOptions)
        .then((info) => {
            res.status(200).json({
                message: 'Email inviata con successo!',
                info,
            });
        })
        .catch((error) => {
            console.error('Errore durante l\'invio dell\'email:', error);
            res.status(500).json({
                message: 'Errore durante l\'invio dell\'email',
                error,
            });
        });
};





module.exports = { emailSend }