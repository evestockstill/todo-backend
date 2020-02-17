require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Todo = require('../lib/models/Todo');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let todo;
  beforeEach(async () => {
    todo = await Todo.create({
      name: 'do homework',
      description: 'read chapter 10'
    });
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a todo', () => {
    return request(app)
      .post('/api/v1/todos')
      .send({ name: 'practice pool', description: 'do drills' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'practice pool',
          description: 'do drills',
          __v: 0
        });
      });
  });
  it('gets a todo by id', () => {
    return request(app)
      .get(`/api/v1/todos/${todo.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: todo.id,
          name: 'do homework',
          description: 'read chapter 10',
          __v: 0
        });
      });
  });
  it('gets all of the todos', () => {
    return request(app)
      .get('/api/v1/todos')
      .then(res => {
        expect(res.body).toEqual([JSON.parse(JSON.stringify(todo))]);
      });
  });
  it('updates a todo', () => {
    return request(app)
      .patch(`/api/v1/todos/${todo.id}`)
      .send({ name: 'watch pool videos', description: 'play like them' })
      .then(res => {
        expect(res.body.name).toEqual('watch pool videos');
      });
  });
  it('deletes a todo', () => {
    return request(app)
      .delete(`/api/v1/todos/${todo.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: todo.id,
          name: 'do homework',
          description: 'read chapter 10',
          __v: 0
        });
      });
  });
});
