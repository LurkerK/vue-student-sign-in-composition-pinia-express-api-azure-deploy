const express = require('express')
const apiRoutes = require('./routes/api.js')
const path = require('path')

// Create web applicaton server
const app = express()

app.use(express.json())

const staticFilePath = path.join(__dirname, 'client', 'dist') 
const staticFiles = express.static(staticFilePath)
app.use('/', staticFiles)

// route for API endpoints
app.use('/api', apiRoutes)

// handle 404 errors
app.use(function(req, res, next) {
    res.status(404).send('Sorry not found.')
    // todo - can't find a matching route 
})

// handle server errors
app.use(function(err, req, res, next) {
    console.log(err.stack)  // for srever developers
    res.status(500).send('Server error')  // for client
})


// Start server running
const server = app.listen(process.env.port || 3000, function() {
    console.log('Express server running on port ', server.address().port)
})

