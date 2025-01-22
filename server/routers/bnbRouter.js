const express = require('express');

const router = express.Router();

const bnbUserController = require('../controllers/bnbUserController.js')
const bnbOwnerController = require('../controllers/bnbOwnerController.js')

// rotte 

// index: mostra tutte le properties
router.get('/', bnbUserController.index);

// show: mostra la singola property
router.get('/:id([0-9]+)', bnbUserController.show);

//update: aggiorna parzialmente properties
router.patch('/:id([0-9]+)', bnbUserController.update);

// propertiesByOwner: mostra tutte le proprietà di un owner specifico
router.get('/owner/:id([0-9]+)', bnbOwnerController.propertiesByOwner);

// permette agli owner di creare una nuova proprietà
router.post('/', bnbOwnerController.create);


module.exports = router