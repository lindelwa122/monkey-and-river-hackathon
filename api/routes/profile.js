const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profile');

router.put('/:username/on_more_thing/update', profileController.updateOneMoreThing);
router.put('/:username/another_thing/update', profileController.updateAnotherThing);

router.get('/:username/profile/get', profileController.getProfile);

router.put('/:username/first_name/update', profileController.updateFirstName);
router.put('/:username/last_name/update', profileController.updateLastName);
router.put('/:username/password/update', profileController.updatePassword);
router.put('/:username/email/update', profileController.updateEmail);

module.exports = profileRouter;