'use strict';

const router = require('express').Router();
const models = require('../db/models');
const Student = models.Student;
const Campus = models.Campus;


//ROUTES FOR /api/students

router.get('/', (req, res, next) => {
  Student.findAll()
  .then(students => res.json(students))
  .catch(next)
})

router.get('/:studentId', (req, res, next) => {
  Student.findById(req.params.studentId, {rejectOnEmpty: true})
  .then(student => res.json(student))
  .catch(function(err) {
    res.status(404).json(err.message)
  })
})

router.post('/', (req, res, next) => {
  Campus.findOrCreate({
    where: {
      name: req.body.campusName
    }
  })
  .then(values => {
    var campus = values[0];
    return Student.create({
      name: req.body.name,
      email: req.body.email,
    })
    .then(student => student.setCampus(campus))
    .then(newStudent => res.status(201).json(newStudent))
    .catch(next);
  })
  .catch(next);
})

router.put('/:studentId/remove-campus', (req, res, next) => {
  Student.findById(+req.params.studentId)
    .then(student => student.setCampus(null))
    .then(updatedStudent => res.status(202).json({
      message: 'Updated successfully',
      student: updatedStudent
    }))
    .catch(function(err) {
      res.status(404).json(err.message);
    })
});

router.put('/:studentId', (req, res, next) => {
  Campus.findOrCreate({where: {name: req.body.campusName}})
  .then(values => {
    var campus = values[0];
    return Student.findById(+req.params.studentId)
    .then(student => student.setCampus(campus))
    .then(student => student.update(req.body))
    .then(updatedStudent => res.status(202).json({
      message: 'Updated successfully',
      student: updatedStudent
    }))
    .catch(next);
  })
  .catch(function(err) {
    res.status(404).json(err.message);
  })
});


router.delete('/:studentId', (req, res) => {
  Student.findById(req.params.studentId, {rejectOnEmpty: true})
  .then(student => student.destroy())
  .then(destroyedStudent => res.status(204).json(destroyedStudent.id))
  .catch(function(err) {
    res.status(404).json(err.message);
  });
})

module.exports = router;
