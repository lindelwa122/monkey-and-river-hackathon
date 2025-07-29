const express = require('express');
const router = express.Router();

const alertsController = require('../controllers/alerts');

router.get('/:username/get/all', alertsController.getAll);
router.get('/:username/get/:id', alertsController.get);

module.exports = router;