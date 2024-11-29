const express = require('express');
const pruebaController = require('../controllers/pruebaController');

const router = express.Router();

router.post('/', pruebaController.createPrueba);
router.get('/', pruebaController.getPruebas);

module.exports = router;
