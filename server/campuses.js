'use strict';

const router = require('express').Router();
const models = require('../db/models');
const Student = models.Student;
const Campus = models.Campus;

//ROUTES FOR /api/campuses

router.get('/', (req, res, next) => {
  Campus.findAll()
  .then(campuses => res.json(campuses))
  .catch(next)
})

router.get('/:campusId', (req, res) => {
  Campus.findById(req.params.campusId, {rejectOnEmpty: true})
  .then(campus => res.json(campus))
  .catch(function(err) {
    res.status(404).json(err.message)
  })
})

router.post('/', (req, res, next) => {
  Campus.create({
    name: req.body.name,
    image: req.body.image
  })
  .then(newCampus => res.status(201).json(newCampus))
  .catch(next);
})

router.put('/:campusId', (req, res) => {
  Campus.findById(req.params.campusId, {rejectOnEmpty: true})
  .then(campus => campus.update(req.body))
  .then(updatedCampus => res.status(201).json({
    message: 'Updated successfully',
    campus: updatedCampus
  })
  )
  .catch(function(err) {
    res.status(404).json(err.message);
  })
})

router.delete('/:campusId', (req, res) => {
  const id = +req.params.campusId
  Campus.findById(id, {rejectOnEmpty: true})
  .then(campus => campus.destroy())
  .then((destroyedCampus) => res.status(204).json(destroyedCampus))
  .catch(function(err) {
    res.status(404).json(err.message);
  });
})

module.exports = router;
