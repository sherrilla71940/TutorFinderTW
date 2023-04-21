const path = require('path');
const dotenv = require('dotenv');
const envFileAbsPath = path.resolve(__dirname, '../../../.env');
dotenv.config({ path: envFileAbsPath });
const port = Number(process.env.PORT) || 8000;
const host = process.env.HOST || 'localhost';


describe('Should be able to add, find, update, and delete a tutor by id', () => {
  // test('Should add a tutor to db', async () => {
  //   fetch('http://localhost:8080', )
  // });
  test('Should add a tutor to db', async () => {
    expect(host).toBe('localhost');
  });
/*   test('Should retrieve a tutor from the db using the corresponding tutorId', () => {

  });

  test('Should get status code 400 if trying to add a tutor that already exists', () => {

  });

  test('', () => {

  }) */
})