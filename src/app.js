const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
//here this is required when the directory containg .hbs files is named other than "views"(here "templates"). changes required in line 9 and 14
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


//setup handlebars view engine ansd views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
// //since this route has no use after using "use" to serve static file...we can remove this 
// instead use: 
// for root page:   http://localhost:3000, http://localhost:3000/index.html
// for help page:   http://localhost:3000/help.html
// for about page:  http://localhost:3000/about.html

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         title: 'Help page',
//         name: "sudipt"
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</hi>')
// })

//routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sudipt'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ram'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Krishna'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address required'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longitude, latitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecastdata: forecastdata,
                location: location,
                address: req.query.address
            })
            // console.log(location)
            // console.log(forecastdata)
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
        name: 'self help',
        helpText: ' Help Page Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'default',
        helpText: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server up and running.')
})