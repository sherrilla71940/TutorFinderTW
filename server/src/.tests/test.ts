/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: UPDATE TEST FILES TO MATCH UPDATED MODELS
import express from 'express';
import mockTutors from './tutors-mock-data.json';
import mongoose from 'mongoose';
import router from '../router';
import supertest from 'supertest';
import { Tutor } from '../mvc/models/tutor';

const dbName = 'tutors_test';

function getRandomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

describe('Test the tutors data stream', function () {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);
  
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(`mongodb://127.0.0.1/${dbName}`);
    await Tutor.deleteMany();
  })

  afterAll(async () => {
    await Tutor.deleteMany();
    await mongoose.disconnect();
  })

  it('It should process POST requests with proper tutor objects', async function () {
    await Promise.all(mockTutors.map(async (tutor) => {
      const response = await request.post('/')
        .send(tutor);
      expect(response.statusCode).toBe(201);
    }))
  })

  it('It should reject POST requests with faulty/incomplete data', async function () {
    const response = await request.post('/')
      .send({
        name: "Smiley Face",
        email: "smile@outlook.com"
      });
    expect(response.statusCode).toBe(400);
  })

  it('It should respond with an array on request for all tutors', async function () {
    const response = await request.get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  })

  it('It should return a specific tutor by id', async function () {
    const response = await request.get('/') as any;
    const allTutors = response.body;
    const randomTutorIndex = getRandomInRange(0, allTutors.length - 1 >= 0 ? allTutors.length - 1 : 0);
    const tutorId = allTutors[randomTutorIndex]._id;
    const nextResponse = await request.get(`/${tutorId}`);
    expect(response.statusCode).toBe(200);
    expect(nextResponse.body).toStrictEqual(allTutors[randomTutorIndex]);
  })

  it('It should delete a tutor from the database',async function () {
    const response = await request.get('/') as any;
    const allTutors = response.body;
    const randomTutorIndex = getRandomInRange(0, allTutors.length - 1 >= 0 ? allTutors.length - 1 : 0);
    const tutorId = allTutors[randomTutorIndex]._id;
    const nextResponse = await request.delete(`/${tutorId}`);
    expect(nextResponse.statusCode).toBe(200);
    expect(allTutors[randomTutorIndex]).not.toContainEqual(nextResponse.body);
  })

  it('It should update a tutor record in the database',async function () {
    const response = await request.get('/') as any;
    let allTutors = response.body;
    const randomTutorIndex = getRandomInRange(0, allTutors.length - 1 >= 0 ? allTutors.length - 1 : 0);
    const tutor = allTutors[randomTutorIndex];
    tutor.name = "Smiley Face";
    const nextResponse = await request.put(`/${tutor._id}`)
      .send(tutor);
    expect(nextResponse.statusCode).toBe(200);
    const lastResponse = await request.get('/') as any;
    allTutors = lastResponse.body;
    expect(allTutors).toContainEqual(tutor);
  })
})




