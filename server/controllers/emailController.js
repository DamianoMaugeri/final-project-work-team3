
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

    if (!from || !to || !subject || !text) {
        return res.status(400).json({
            message: 'Devi fornire almeno mittente, destinatario, oggetto e testo dell\'email',
        });
    }

    const mailOptions = {
        from,    // email del mittente
        to,      //  email del destinatario destinatario
        subject,           // Oggetto
        text,        // Corpo dell'email in formato testo
        //html,       // Corpo dell'email in formato HTML nel caso in cui c'è bisogno di inviare email particolari che non comprendono solo il testo 
    };

    const autoMailOptions = {
        from: "BooleanBnBServizioclienti@gmail.com",    // email del sito 
        to: mailOptions.from,      //  email del mittenente al quale inviare la conferma
        subject: 'Email Ricevuta ',           // Oggetto
        text: 'Il propietario del sito ha ricevuto la tua email e ti risponderà al più presto',

    }



    transporter
        .sendMail(mailOptions)
        .then((info) => {

            transporter.sendMail(autoMailOptions).then((info) => {


                // se l'email è stata inviata con successo salva il messaggio nel db per poterlo visualizzare nella sezione messaggi di ogni propietario 
                // bisogna creare una query che recupera owner_id dalla tabella Owner , user id dalla tabella user e inserisce il messaggio nella tabella messages
                // con i campi owner_id, user_id, message, 





                res.status(200).json({
                    message: 'Email inviata con successo!',
                    info,
                });
            }).catch((error) => {
                console.error('Errore durante l\'invio dell\'email:', error);
                res.status(500).json({
                    message: 'Errore durante l\'invio dell\'email',
                    error,
                });
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