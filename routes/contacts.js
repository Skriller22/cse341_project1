const express = require('express');
const router = express.Router();
const mongodb = require("../data/database");

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getById);

router.post('/', 
    /* #swagger.parameters['body'] = {
    in: 'body',
    schema: { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', favoriteColor: 'blue', birthday: '1990-01-01' }
} 
    */ 
   contactsController.createContact);

router.put('/:id',
    /* #swagger.parameters['id'] = {
    in: 'path',
    type: 'string',
    description: 'The ID of the contact to update'
} */
    contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;