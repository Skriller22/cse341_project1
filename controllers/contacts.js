const mongodb = require("../data/database");
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const db = mongodb.getDb();
        const contacts = await db.db().collection('contacts').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving contacts.' });
    }
}

const getById = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    try {
        const db = mongodb.getDb();
        const contact = await db.db()
        .collection('contacts')
        .findOne({ _id: contactId });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found.' });
        }
        res.status(200).json(contact);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving the contact.' });
    }
};

const createContact = async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ error: 'firstName, lastName, email, favoriteColor, and birthday are all required.' });
    }

    const contact = { firstName, lastName, email, favoriteColor, birthday };

    try {
        const db = mongodb.getDb();
        const response = await db.db().collection('contacts').insertOne(contact);

        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json({ error: 'An error occurred while creating the contact.' });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the contact.' });
    }
};

const updateContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ error: 'firstName, lastName, email, favoriteColor, and birthday are all required.' });
    }

    const contact = { firstName, lastName, email, favoriteColor, birthday };

    try {
        const db = mongodb.getDb();
        const response = await db.db()
            .collection('contacts')
            .replaceOne({ _id: contactId }, contact);

        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'Contact not found.' });
        }
        res.status(204).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the contact.' });
    }
};

const deleteContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);

    try {
        const db = mongodb.getDb();
        const response = await db.db()
            .collection('contacts')
            .deleteOne({ _id: contactId });

        if (response.deletedCount === 0) {
            return res.status(404).json({ error: 'Contact not found.' });
        }
        res.status(200).json({ message: 'Contact deleted.' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the contact.' });
    }
};

module.exports = {
  getAll,
  getById,
  createContact,
  updateContact,
  deleteContact
};
