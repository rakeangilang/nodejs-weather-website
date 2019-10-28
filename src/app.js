const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

// Define paths for express configs
const publicDirPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

// Setup view engine to handlebars and set views directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Gilang'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Bout',
        name: 'Gilang'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need sum help m8?',
        name: 'Gilang'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        });
    };

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) return res.send({error});

        forecast(latitude, longitude, (error, forecast) => {
            if(error) return res.send({error});
            res.send({
                location,
                forecast,
                address: req.query.address
            });
        });
    });

    // res.send([{
    //     address: req.query.address
    // }]);
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        });
    };

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        err_msg: "Help article not found",
        name: 'Gilang'
    })
});

app.get('/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        err_msg: "Page not found.",
        name: 'Gilang'
    });
});

app.listen(5000, () => {
    console.log('Connected to port 5000');
});