const express = require('express');

const router = express.Router();

const bnbController = require('../controllers/bnbController.js')


// rotte 

// index
router.get('/', bnbController.index);

// show
router.get('/:id([0-9]+)', bnbController.show);

//update
router.patch('/:id([0-9]+)', bnbController.update);



module.exports = router