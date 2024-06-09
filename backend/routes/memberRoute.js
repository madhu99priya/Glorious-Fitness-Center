// // if we have more than one model(in here we have initailly member model, then it's okay to 
// // have routes in index.js, but think if we have 5 models we have 25 routes in index.js. it's
// // not a good idea. therefore, okay to have routes in seperate folder

// import express from 'express'
// import {Member} from '../models/membermodel.js'

// const router = express.Router()

// //Route for adding a new member
// // we don't need to specify /members agains in http routes-> we specified in middleware in index.js
// router.post('/', async (req,res) =>{
    
//     try 
//     {
//     //validation
    
//     if(!req.body.name || !req.body.email || !req.body.age || !req.body.category)
//     {
//         return res.status(400).send({
//             message: 'Send all required fields : name, email,age'
//         })
//     }

//     const newMember = {
//         name : req.body.name,
//         email : req.body.email,
//         age : req.body.age,
//         category : req.body.category
//     }

//     const member = await Member.create(newMember) // see about async/await keywords
//     return res.status(200).send(member)
        
//     }

//     catch (error) 
//     {
//         console.log(error.message)
//         res.status(500).send({message : error.message})
        
//     }

// })


// //Route for get all members in the database

// router.get('/' ,  async (req,res)=>{
//     try {
        
//         const members = await Member.find({})
//         res.status(200).json({
//             count : members.length,
//             data : members
//         })
        
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).send({message : error.message})
        
//     }
// })


// //Route for get one member using id

// router.get('/:id' , async (req,res) => {
//     try {
//         const member = await Member.findById(req.params.id) // also we can use destructing method to get id -> const {id} = req.params
//         res.status(200).json(member); // also we can use .send not a problem

//     } catch (error) {
//         console.log(error.message)
//         res.status(500).send({message : error.message})
        
//     }

// })

// // Route for updating the members info

// router.put('/:id',  async (req,res) => {
//     try {

//         if(!req.body.name || !req.body.email || !req.body.age || !req.body.category)
//             {
//                 return res.status(400).send({
//                     message: 'Send all required fields : name, email,age'
//                 })
//             }
        
//         const {id} = req.params
//         const result = await Member.findByIdAndUpdate(id , req.body)
        
//         if(!result){
//             return res.status(404).json({message : 'Member cannot find'}); // see
//         }

//         return res.status(200).send({message : "Member's information updated successfully"})
        

        
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).send({message : error.message})
        
//     }

// })


// // Router for deleting a member

// router.delete('/:id', async (req,res) => {
//     try {

//         const {id} = req.params;

//         const result = await Member.findByIdAndDelete(id)

//         if(!result){
//             return res.status(404).send({message : 'Member can not find'})
//         }

//         return res.status(200).send({message : 'Member information deleted successfully'})
        
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).send({message : error.message})
        
//     }

// })


// // //route for registration
// // // User registration route
// // router.post('/register', async (req, res) => {
// //     try {
// //         const { name, email, age, category } = req.body;

// //         if (!name || !email || !age || !category) {
// //             return res.status(400).send({ message: 'Send all required fields: name, email, age, category' });
// //         }

// //         const newMember = { name, email, age, category, isApproved: false };
// //         const member = await Member.create(newMember);

// //         return res.status(200).send(member);
// //     } catch (error) {
// //         console.log(error.message);
// //         res.status(500).send({ message: error.message });
// //     }
// // });

// // // Admin approval route
// // router.put('/approve/:id', async (req, res) => {
// //     try {
// //         const { id } = req.params;

// //         const member = await Member.findByIdAndUpdate(id, { isApproved: true }, { new: true });

// //         if (!member) {
// //             return res.status(404).send({ message: 'Member not found' });
// //         }

// //         return res.status(200).send(member);
// //     } catch (error) {
// //         console.log(error.message);
// //         res.status(500).send({ message: error.message });
// //     }
// // });

// // // Route for getting unapproved members
// // router.get('/unapproved', async (req, res) => {
// //     try {
// //         const members = await Member.find({ isApproved: false });

// //         return res.status(200).json({
// //             count: members.length,
// //             data: members
// //         });
// //     } catch (error) {
// //         console.log(error.message);
// //         res.status(500).send({ message: error.message });
// //     }
// // });

// export default router;

import express from 'express';
import { Member } from '../models/membermodel.js';

const router = express.Router();

// Route for adding a new member
router.post('/', async (req, res) => {
  try {
    // Validation
    if (!req.body.name || !req.body.email || !req.body.age || !req.body.category) {
      return res.status(400).send({
        message: 'Send all required fields: name, email, age',
      });
    }

    const newMember = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      category: req.body.category,
    };

    const member = await Member.create(newMember); // see about async/await keywords
    return res.status(200).send(member);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for getting all members in the database and populating payments
router.get('/', async (req, res) => {
  try {
    const members = await Member.find({}).populate('payments');
    res.status(200).json({
      count: members.length,
      data: members,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for getting one member using id
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate('payments'); // Populate payments
    res.status(200).json(member); // also we can use .send not a problem
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for updating the member's info
router.put('/:id', async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.age || !req.body.category) {
      return res.status(400).send({
        message: 'Send all required fields: name, email, age',
      });
    }

    const { id } = req.params;
    const result = await Member.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: 'Member cannot find' }); // see
    }

    return res.status(200).send({ message: "Member's information updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for deleting a member
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Member.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: 'Member cannot find' });
    }

    return res.status(200).send({ message: 'Member information deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;

    
