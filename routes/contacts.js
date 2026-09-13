const express = require('express');
const router = express.Router();

const {ObjectId} = require('mongodb');

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
    next();
};

// Data validation middleware for creating a new contact
const validateContactData = (req, res, next) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

    // Validate birthday format (YYYY-MM-DD)
    const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthdayRegex.test(birthday)) {
    return res.status(400).json({ error: 'Invalid birthday format. Use YYYY-MM-DD' });
  }

    // Validate birthday is not in the future
    const birthdayDate = new Date(birthday);
    const today = new Date();
    if (birthdayDate > today) {
    return res.status(400).json({ error: 'Birthday cannot be in the future' });
  }

    next();
};

// Validation middleware for updating a contact
const validateUpdateData = (req, res, next) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName && !lastName && !email && !favoriteColor && !birthday) {
    return res.status(400).json({ error: 'At least one field must be provided for update' });
    }

    // Validate email format if provided
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
    }

    // Validate birthday format (YYYY-MM-DD) if provided
    if (birthday) {
        const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!birthdayRegex.test(birthday)) {
            return res.status(400).json({ error: 'Invalid birthday format. Use YYYY-MM-DD' });
        }
    }

    // Validate birthday is not in the future if provided
    if (birthday) {
        const birthdayDate = new Date(birthday);
        const today = new Date();
        if (birthdayDate > today) {
            return res.status(400).json({ error: 'Birthday cannot be in the future' });
        }
    }

    next();
};

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);
router.get('/:id', validateId, contactsController.getById);

router.post('/', validateContactData,
    /* #swagger.parameters['body'] = {
    in: 'body',
    schema: { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', favoriteColor: 'blue', birthday: '1990-01-01' }
} 
    */ 
   contactsController.createContact);

router.put('/:id', validateId, validateUpdateData,
    /* #swagger.parameters['id'] = {
    in: 'path',
    type: 'string',
    description: 'The ID of the contact to update'
} */
    contactsController.updateContact);

router.delete('/:id', validateId, contactsController.deleteContact);

module.exports = router;