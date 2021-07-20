const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()

//Paths for express config
const viewsPath = path.join(__dirname,'../templates/views')
const publicDirectoryPath =path.join(__dirname, '../public')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'Welcome',
        name: 'Aayush'
    })
})
//app.com
app.get('/about',(req,res) => {
    res.render('about',{
        title:'Robots'
    })
})


app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        msg: 'Kindly log in for further support'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Kindly provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location}) => {
        if(error){
            return res.send({error})
        }
        forecast(longitude, latitude,(error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products', (req,res) => {
    if(!req.query.search){
         return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMessage:'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage:'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on 3000')
})
