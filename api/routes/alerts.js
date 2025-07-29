const express = require('express');
const router = express.Router();

const alertsController = require('../controllers/alerts');

router.get('/:username/alerts/get/all', alertsController.getAll);
router.get('/:username/alerts/get/:id', alertsController.get);

module.exports = alertsRouter;