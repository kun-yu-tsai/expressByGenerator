// create a Router instance from express module
// use the router instance to bind the route with the corresponding (req,res) function
// (above behaviour is like the 'app' instance spawned by express() )
// what to do in the req,res function
// export the module as "the router instance"

var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.send('Wiki home page')
})

router.get('/about', (req,res)=>{
    res.send('About page')
})

module.exports = router