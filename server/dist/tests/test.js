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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const tutors_mock_data_json_1 = __importDefault(require("./tutors-mock-data.json"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("../router"));
const supertest_1 = __importDefault(require("supertest"));
const tutor_1 = require("../mvc/models/tutor");
const dbName = 'tutors_test';
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
describe('Test the tutors data stream', function () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(router_1.default);
    const request = (0, supertest_1.default)(app);
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connect(`mongodb://127.0.0.1/${dbName}`);
        yield tutor_1.Tutor.deleteMany();
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield tutor_1.Tutor.deleteMany();
        yield mongoose_1.default.disconnect();
    }));
    it('It should process POST requests with proper tutor objects', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(tutors_mock_data_json_1.default.map((tutor) => __awaiter(this, void 0, void 0, function* () {
                const response = yield request.post('/')
                    .send(tutor);
                expect(response.statusCode).toBe(201);
            })));
        });
    });
    it('It should reject POST requests with faulty/incomplete data', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.post('/')
                .send({
                name: "Smiley Face",
                email: "smile@outlook.com"
            });
            expect(response.statusCode).toBe(400);
        });
    });
    it('It should respond with an array on request for all tutors', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.get('/');
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });
    it('It should return a specific tutor by id', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.get('/');
            const allTutors = response.body;
            const randomTutorIndex = getRandomInRange(0, allTutors.length - 1 >= 0 ? allTutors.length - 1 : 0);
            const tutorId = allTutors[randomTutorIndex]._id;
            const nextResponse = yield request.get(`/${tutorId}`);
            expect(response.statusCode).toBe(200);
            expect(nextResponse.body).toStrictEqual(allTutors[randomTutorIndex]);
        });
    });
    it('It should delete a tutor from the database', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.get('/');
            const allTutors = response.body;
            const randomTutorIndex = getRandomInRange(0, allTutors.length - 1 >= 0 ? allTutors.length - 1 : 0);
            const tutorId = allTutors[randomTutorIndex]._id;
            const nextResponse = yield request.delete(`/${tutorId}`);
            expect(nextResponse.statusCode).toBe(200);
            expect(allTutors[randomTutorIndex]).not.toContainEqual(nextResponse.body);
        });
    });
    it('It should update a tutor record in the database', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.get('/');
            let allTutors = response.body;
            const randomTutorIndex = getRandomInRange(0, allTutors.length - 1 >= 0 ? allTutors.length - 1 : 0);
            const tutor = allTutors[randomTutorIndex];
            tutor.name = "Smiley Face";
            const nextResponse = yield request.put(`/${tutor._id}`)
                .send(tutor);
            expect(nextResponse.statusCode).toBe(200);
            const lastResponse = yield request.get('/');
            allTutors = lastResponse.body;
            expect(allTutors).toContainEqual(tutor);
        });
    });
});
