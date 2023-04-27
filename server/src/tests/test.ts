import request from 'supertest';
import app from '../app';
import mockTutors from './tutors-mock-data.json';
import mongoose from 'mongoose';

// JEST DOES NOT EXIT THE TEST SUITE AUTOMATICALLY
// SEVERING MONGOOSE CONNECTION MANUALLY IN TEST HOOKS DOES NOT HELP
// -> TERMINATE TESTING ROUTINE BY CTRL + C

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1/tutor');
})

describe('Test GET all tutors', function () {
  test('It should respond with an array and status 200', async function () {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  })
})

describe('Test POST a tutor', function () {
  test('It should process POST requests with a tutor object', async function () {
    const response = await request(app).post('/')
      .send(mockTutors[0]);
    expect(response.statusCode).toBe(201);
  })
})

afterAll(async () => {
  await mongoose.disconnect();
})



