import express from 'express';
import { TempMember } from '../models/tempmember.js';
import { Member } from '../models/membermodel.js';

const router = express.Router();

// Route for adding a new member (Temporary Registration)
router.post('/', async (req, res) => {
    try {
        const { name, email, age, category } = req.body;

        if (!name || !email || !age || !category) {
            return res.status(400).send({ message: 'Send all required fields: name, email, age, category' });
        }

        const newTempMember = { name, email, age, category, isApproved: false };
        const tempMember = await TempMember.create(newTempMember);

        return res.status(200).send(tempMember);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for approving a member
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const tempMember = await TempMember.findById(id);

        if (!tempMember) {
            return res.status(404).send({ message: 'Member not found' });
        }

        const newMember = {
            name: tempMember.name,
            email: tempMember.email,
            age: tempMember.age,
            category: tempMember.category,
            isApproved: true
        };

        await Member.create(newMember);
        await TempMember.findByIdAndDelete(id);

        return res.status(200).send(newMember);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for getting unapproved members
router.get('/', async (req, res) => {
    try {
        const tempMembers = await TempMember.find({});
        res.status(200).json({
            count: tempMembers.length,
            data: tempMembers
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
