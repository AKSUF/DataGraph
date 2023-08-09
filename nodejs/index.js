// app.js

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');

// Import the schema and model from the dataModel.js file
const Data = require('./schema/datas');

app.use(cors());
app.use(bodyParser.json());

// Connect to the database
mongoose.connect('mongodb://localhost/dasboard', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connection successful'))
    .catch(err => console.log('Error connecting to database: ' + err));


const apphandelr = require('./router/apphandeler.js');
app.use('/app', apphandelr);



// Read JSON data from the file and save it to the database
const jsonDataPath = './data/data.json';

fs.readFile(jsonDataPath, 'utf8', async(err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    const jsonData = JSON.parse(data);
    const dataCount = await Data.countDocuments();

    if (dataCount === 0) {
        Data.insertMany(jsonData)
            .then(() => console.log('Data inserted successfully'))
            .catch((err) => console.error('Error inserting data:', err));
    } else {
        console.log('Data already exists in the database. Skipping insertion.');
    }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));