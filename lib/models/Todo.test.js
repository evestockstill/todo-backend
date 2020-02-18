// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const Todo = require('./Todo');

describe('Todo model', () => {
  it('has a required name', () => {
    const todo = new Todo();
    const { errors } = todo.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });
  it('has a required description', () => {
    const todo = new Todo();
    const { errors } = todo.validateSync();

    expect(errors.description.message).toEqual('Path `description` is required.');
  });
});
