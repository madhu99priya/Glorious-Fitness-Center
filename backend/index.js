import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose  from 'mongoose'
import memberRoute from './routes/memberRoute.js'
import tempmemberRoute from './routes/tempmemberRoute.js'
import cors from 'cors'


const app = express();

//midddleware for parsing request body
app.use(express.json())

//middleware for handling cores policy- important
    //option 01-for all origins
app.use(cors());

    //option 02 -for custom origins -> more security 
    // app.use(cors(
    //     {
    //         origin: 'http://localhost:3000', // change according to the required port no
    //         // only the clients with this origin can access the our server
    //         methods : ['GET', 'POST','PUT','DELETE'],
    //         allowedHeaders : ['Content-Type']
    //     }
    // ))


app.get('/', (req,res) =>{
    console.log(req);
    return res.status(234).send('welcome to Glorious')
})


//middleware for memberroute-> starting URLs with /members
app.use('/members', memberRoute);

//middlewares for tempmemberroute
app.use('/register',tempmemberRoute);
app.use('/unapproved',tempmemberRoute);
app.use('/approve',tempmemberRoute);


mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('Successfully connected to MongoDB');

        app.listen(PORT, ()=> {
            console.log(`App is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    }
);