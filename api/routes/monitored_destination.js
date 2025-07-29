const express = require('express');
const router = express.Router();
const controller = require('../controllers/monitored-destination');
const auth = require('../middleware/auth'); // JWT auth middleware

router.post('/create', auth, controller.create);
router.get('/get/all', auth, controller.getAll);
router.get('/get/:id', auth, controller.getById);
router.put('/update/:id', auth, controller.update);
router.delete('/delete/:id', auth, controller.delete);

module.exports = DestRouter;
