const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')
console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const public_directory_path = path.join(__dirname, '../public')
const views_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', views_path)
hbs.registerPartials(partials_path)

// Setup static directory to serve
app.use(express.static(public_directory_path))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mark McAllister'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mark McAllister'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        help_text: 'You need help? Hah! Loser',
        name: 'Mark McAllister'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }
    
    geocode(req.query.address, (error, { lat, long, location} = {}) =>{
        if (error){
            return res.send({error})
        }
        //do forecast function from utils/forecast.js sending lat and long and storing returned error and forecast_data
        forecast( lat, long, (error, forecast_data) => {
            if (error){
                return res.send({error})
            }
    
            
            res.send({
                forecast_data : forecast_data,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mark McAllister',
        error_message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render( '404', {
        title: '404',
        name: 'Mark McAllister',
        error_message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})