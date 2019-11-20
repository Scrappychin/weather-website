const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()

//Here we are using the port value which herku has provided at process.env or if it doesn't exist then default to 3000
const port = process.env.PORT || 3000


//defining the paths for express config. You don't have to do this, it will default to a folder named 'views' in public (or whatever your top folder is)
//with path.join, you can use '..' as a string to go up a folder from that path, or '../..' to go up 2 folders.
//in this one we go up one then into public from there
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setting handlebars engine and express to look at templates folder not the default views folder
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.set('view engine', 'hbs')
//express.static is a function which needs a path to the folder which we want to serve up, in this case we be sending it to the public directory where this app is living
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) =>{
    res.render('index', {
        title: 'BALLS',
        name:'Mr Scrotum'
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'ABOUT BALLS',
        name:'Mr Scrotums'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'HELP MY BALLS',
        name:'PLEASE HELP Mr Scrotums'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }
    else{
        //Here the ={} after lat long is a default to return an empty object if there is an error and no lat, long location can be found
        geoCode(req.query.address, (error, {lattitude,longitude,location} = {} ) => {
        if(error){
            return res.send({error})
        }
        forecast(lattitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({  
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
        })
    }
})

//when sending info to the server the info starts after ? then every & is a new thing.
//i.e. http://localhost:3000/products?type=games&rating=5

app.get('/products', (req,res)=>{
    //if there is no search term at the end of the url passed (?search)
    if(!req.query.search){
        //gotta use return to stop any other code from going through once they have not provided a search term (otherwise all the shit below will still happen)
        return res.send({
            error: 'you must provide a search term'
        })
    }
    //printing the search to the console for no reason
    console.log(req.query)
    res.send({
        products:[]
    })
})

//this one will only do 404's in the help section
app.get('/help/*',(req,res)=>{
    res.render('errorMessage',{
        title:'Help specific 404 error',
        name:'something',
        errorMessage:'Help specific 404 error, cant find this page'
    })
})

//for some reason the 404 get needs to be your last get (cos it will check all the dudes above before *)
app.get('*',(req,res)=>{
    res.render('errorMessage',{
        title:'generic 404 error',
        name:'something',
        errorMessage:'Generic 404 error, cant find this page'
    })
})



//starting the server up, usually you use port 80 but we are using 3000 for no reason
app.listen(port, ()=>{
    console.log('server started on whatever port heroku provided or the default ('+port+')')
})