const Todo = require('../models/Todo');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    Todo.create({ ...req.body })
      .then(todo => res.send(todo))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Todo.findById(req.params.id)
      .then(todo => res.send(todo))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Todo.find()
      .then(todo => res.send(todo))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { name, description } = req.body;
    Todo.findByIdAndUpdate(req.params.id, { name, description }, { new: true })
      .then(todo => res.send(todo))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Todo
      .findByIdAndDelete(req.params.id)
      .then(todo => res.send(todo))
      .catch(next);
  });
