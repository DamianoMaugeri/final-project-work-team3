const express = require('express');

const router = express.Router();
//separazione dei controller per dividere le logiche tra: 
//User (può visualizzare tutte le proprietà, aggiungere voti ad una proprietà,aggiungere review ad una proprietà solo se ha già preso in affitto quella specifica proprietà) 
//Owner (può visualizzare solo le proprietà già aggiunte sulla piattaforma, può aggiungere altre proprietà)
const bnbUserController = require('../controllers/bnbUserController.js')
const bnbOwnerController = require('../controllers/bnbOwnerController.js');
const emailController = require('../controllers/emailController.js');

// rotte => USER

// index: mostra tutte le properties
router.get('/', bnbUserController.index);

// show: mostra la singola property
router.get('/:id([0-9]+)', bnbUserController.show);

//update: aggiorna parzialmente properties (utilizzata per aggiornare il campo vote)
router.patch('/:id([0-9]+)', bnbUserController.update);

//postReview: permette di inserire una review solo se l'utente ha una prenotazione e se non ha già lasciato una review (controllo fatto tramite email dell'user)
router.post('/:id([0-9]+)/reviews', bnbUserController.postReview);

// rotte => OWNER

// propertiesByOwner: questa rotta simula un autenticazione tramite sola email e nel caso in cui ci sia corrispondenza con quella di un proprietario restituisce tutte le proprietà appartenenti a quel proprietario
router.get('/owner', bnbOwnerController.propertiesByOwner);

// permette agli owner di creare una nuova proprietà
router.post('/owner/:id([0-9]+)', bnbOwnerController.create);






// endpoint che gestisce l'invio di una email
router.post('/email-send', emailController.emailSend)




module.exports = router