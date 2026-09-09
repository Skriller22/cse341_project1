const express = require('express');
const router = express.Router();
const mongodb = require("../data/database");

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getById);

module.exports = router;