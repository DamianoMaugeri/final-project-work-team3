const express = require('express');

const router = express.Router();

const bnbController = require('../controllers/bnbController.js')


// rotte 

// index: mostra tutte le properties
router.get('/', bnbController.index);

// show: mostra la singola property
router.get('/:id([0-9]+)', bnbController.show);

//update: aggiorna parzialmente properties
router.patch('/:id([0-9]+)', bnbController.update);

// propertiesByOwner: mostra tutte le proprietà di un owner specifico
router.get('/owner/:ownerId([0-9]+)', bnbController.propertiesByOwner);

// permette agli owner di creare una nuova proprietà
router.post('/', bnbController.create);


module.exports = router