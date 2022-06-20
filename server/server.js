import express from 'express';
//this will help us to create the global variables for instance, ports, DB varibales:
import dotenv from 'dotenv';
//this will allow us to have colors in the console:
import colors from 'colors';
//this will help use to do the logging:
import morgan from 'morgan';

//importing cors
import cors from 'cors';

//this will bring the users reference 
import userRoutes from './routes/users.js'

//to bring the db reference:
import connectDB from './config/db.js';

//this is to access the config file:
dotenv.config({ path: './config/config.env' });

//calling the connectdb funcation:
connectDB();

//this will bring the transactions reference here in the server.js:
import transactions from './routes/routestransactions.js';

//this will initialize our express:
const app = express();

//creating a middleware to allow us to use the body parser:
app.use(express.json());
app.use(cors());

//to log the request information:  
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//hitting the server for a simple route:
app.use('/transactions', transactions);
app.use('/user', userRoutes);

//to access the port property from the config file:
const PORT = process.env.PORT || 4000;

//here i am allowing the app to listen a particular port:
app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

