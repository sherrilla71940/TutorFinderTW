"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    test('Should add a tutor to db', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(host).toBe('localhost');
    }));
    /*   test('Should retrieve a tutor from the db using the corresponding tutorId', () => {
    
      });
    
      test('Should get status code 400 if trying to add a tutor that already exists', () => {
    
      });
    
      test('', () => {
    
      }) */
});
