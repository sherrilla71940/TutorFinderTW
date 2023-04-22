// import app, {PORT, HOST} from '../app';
import mockTutorsJSON from './tutors-mock-data.json';
// const mockTutorsJSON = require('../src/tests/tutors-mock-data.json');

console.log(mockTutorsJSON);
test('asd', () => {
  expect(1).toBe(1);
});

// describe('Should be able to add, find, update, and delete a tutor by id', () => {
//   test('Should add a tutor to db', async () => {
//     const mockTutorJSON = JSON.stringify(mockTutors[0]);
//     const response = await fetch(`http://${host}:${port}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: mockTutorJSON
//     });
//     const jsonData: string = await response.json();
//     tutorIds.push((JSON.parse(jsonData)._id).toString())
//     expect(jsonData).toContain('_id');
//     console.log(tutorIds);
//   });
// /*   test('Should retrieve a tutor from the db using the corresponding tutorId', () => {

//   });

//   test('Should get status code 400 if trying to add a tutor that already exists', () => {

//   });

//   test('', () => {

//   }) */
// })

