const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

const moment = require('moment'); // require
moment().format(); 

// Import routes
const customerRoutes = require('./routes/customer');
const warrantyRoutes = require('./routes/warranty');
const staffRoutes = require('./routes/staff');
const productRoutes = require('./routes/product');


app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(morgan('common'));


const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

// Connect Database
dotenv.config();
try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        process.env.MONGO_URI,
        options
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

} catch (e) {
    console.log("could not connect");
}

app.listen(8000, () => {
    console.log('Server is running...');
});

// Routes
app.use('/v1/customer', customerRoutes);
app.use('/v1/warranty', warrantyRoutes);
app.use('/v1/staff', staffRoutes);
app.use('/v1/product', productRoutes);