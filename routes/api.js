const express = require('express')
const database = require('../models/index')  // will require the index.js file from this directory
const Student = database.Student  // the student model

const router = express.Router()

// fetch all students
router.get('/students', function(req, res, next) {
    // qurey database, get all rows from DB,
    // convert to JSON form
    // available in the then function
    Student.findAll( { order: ['name'] } ).then(students => {
        return res.json(students)
    })
})

// create new student
router.post('/students', function(req, res, next){
    const newStudent = req.body
    console.log(newStudent)
    Student.create(newStudent).then( result => {
        return res.status(201).send('New student created!')
    }).catch( err => {
        // 400 = bad request - client is sending a request the server can't fulfill
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map( e => e.message )
            return res.status(400).json(messages)
        } else {
            // some other error?
            next(err)
        }
    })
})

// update a student
router.patch('/students/:id', function(req, res, next) {
    // matches requests to /students/1
    // students/2
    // students/100
    //req.params stores the id value
    // stories any placeholders in the URL

    const studentID = req.params.id
    const updatedStudent = req.body  // updated data about this student
    console.log(updatedStudent)
    Student.update( updatedStudent, { where: { id: studentID } }).then( ( result ) => {
      
      const rowsModified = result[0]  
      // if 1 row was changed, we found student and they were updated
      if (rowsModified === 1) {
        return res.send('OK')
      }  
      // studentid that doesn't exist
      else {
        // if 0 rows were updated, student was not found
        return res.status(404).send('Student not found')
      }


    }).catch( err => { // database error - can't connect
        
            // invalid data in the updatedStudent - eg. no name
        // 400 = bad request - client is sending a request the server can't fulfill
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map( e => e.message )
            return res.status(400).json(messages)
        } else {
            // some other error?  - can't connect to database
            next(err)
        }
    })

    // what kinds of error could we see?

    // invalid data in the updatedStudent - eg. no name
    // database problems - app can't connect to the database

})

// delete student
router.delete('/students.:id', function(req, res, next) {
    // delete request to /api.students/4 will delete student with id 4
    const studentID = req.params.id
    Student.destroy( { where: { id: studentID } } ).then( (rowsDeleted) => {
        if (rowsDeleted === 1) {
            return res.send('Student deleted')
        } else {  // 0 rows deleted - the student with this id is not in the database
            return res.status(404).send('Student not found')
        }

    }).catch( err => {
        return next(err)
    })
})


module.exports = router  // don't forget the s !