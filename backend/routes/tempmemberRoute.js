// import express from 'express';
// import { TempMember } from '../models/tempmember.js';
// import { Member } from '../models/membermodel.js';
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// const router = express.Router();
// dotenv.config();

// // Nodemailer transporter setup
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     port : 587,
//     secure : false ,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// // Route for adding a new member (Temporary Registration)
// router.post('/', async (req, res) => {
//     try {
//         const { name, email, age, category } = req.body;

//         if (!name || !email || !age || !category) {
//             return res.status(400).send({ message: 'Send all required fields: name, email, age, category' });
//         }

//         const newTempMember = { name, email, age, category, isApproved: false };
//         const tempMember = await TempMember.create(newTempMember);

//         return res.status(200).send(tempMember);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// });

// // Route for approving a member
// router.put('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;

//         const tempMember = await TempMember.findById(id);

//         if (!tempMember) {
//             return res.status(404).send({ message: 'Member not found' });
//         }

//         const newMember = {
//             name: tempMember.name,
//             email: tempMember.email,
//             age: tempMember.age,
//             category: tempMember.category,
//             isApproved: true
//         };

//         await Member.create(newMember);
//         await TempMember.findByIdAndDelete(id);

//         // Send email notification
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: tempMember.email,
//             subject: 'Registration Approved',
//             text: `Hello ${tempMember.name},\n\nYour registration has been approved.\n\nBest regards,\nFitness Center Team`
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//                 return res.status(500).send('Error sending email');
//             }
//             res.status(200).send(newMember);
//         });

//         // return res.status(200).send(newMember);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// });

// // Route for getting unapproved members
// router.get('/', async (req, res) => {
//     try {
//         const tempMembers = await TempMember.find({});
//         res.status(200).json({
//             count: tempMembers.length,
//             data: tempMembers
//         });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// });

// // Router for deleting a tempmember ( unapproval)

// router.delete('/:id', async (req,res) => {
//     try {

//         const {id} = req.params;

//         const result = await TempMember.findByIdAndDelete(id)

//         if(!result){
//             return res.status(404).send({message : 'Member can not find'})
//         }

//         return res.status(200).send({message : 'Member information deleted successfully'})
        
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).send({message : error.message})
        
//     }

// })

// export default router;
import express from 'express';
import { TempMember } from '../models/tempmember.js';
import { Member } from '../models/membermodel.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config(); 

const router = express.Router();

// Log environment variables (temporarily)
console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

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

        // Send email notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: tempMember.email,
            subject: 'Registration Approved',
            text: `Hello ${tempMember.name},\n\nYour registration has been approved.\n\nBest regards,\nFitness Center Team`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send('Error sending email');
            }
            res.status(200).send(newMember);
        });

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

// Router for deleting a tempmember (unapproval)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await TempMember.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({ message: 'Member not found' });
        }

        return res.status(200).send({ message: 'Member information deleted successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
