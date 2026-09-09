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

module.exports = {
  getAll,
  getById
};