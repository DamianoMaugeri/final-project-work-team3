const express = require('express');

const router = express.Router();

const bnbUserController = require('../controllers/bnbUserController.js')
const bnbOwnerController = require('../controllers/bnbOwnerController.js')

// rotte USER

// index: mostra tutte le properties
router.get('/', bnbUserController.index);

// show: mostra la singola property
router.get('/:id([0-9]+)', bnbUserController.show);

//update: aggiorna parzialmente properties
router.patch('/:id([0-9]+)', bnbUserController.update);

//postReview: permette di inserire una review solo se l'utente ha una prenotazione e se non ha già lasciato una review (controllo fatto tramite email dell'user)
router.post('/:id([0-9]+)/reviews', bnbUserController.postReview);

// rotte OWNER

// propertiesByOwner: mostra tutte le proprietà di un owner specifico
router.get('/owner/:id([0-9]+)', bnbOwnerController.propertiesByOwner);

// permette agli owner di creare una nuova proprietà
router.post('/', bnbOwnerController.create);




module.exports = router