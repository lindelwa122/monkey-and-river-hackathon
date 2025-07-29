const express = require('express');
const router = express.Router();
const controller = require('../controllers/monitored-destination');
// const auth = require('../middleware/auth'); // JWT auth middleware

router.post('/create', controller.create);
router.get('/get/all', controller.getAll);
router.get('/get/:id', controller.getById);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

module.exports = router;
