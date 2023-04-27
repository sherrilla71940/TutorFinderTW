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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const tutors_mock_data_json_1 = __importDefault(require("./tutors-mock-data.json"));
const mongoose_1 = __importDefault(require("mongoose"));
// JEST DOES NOT EXIT THE TEST SUITE AUTOMATICALLY
// SEVERING MONGOOSE CONNECTION MANUALLY IN TEST HOOKS DOES NOT HELP
// -> TERMINATE TESTING ROUTINE BY CTRL + C
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect('mongodb://127.0.0.1/tutor');
}));
describe('Test GET all tutors', function () {
    test('It should respond with an array and status 200', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get('/');
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });
});
describe('Test POST a tutor', function () {
    test('It should process POST requests with a tutor object', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post('/')
                .send(tutors_mock_data_json_1.default[0]);
            expect(response.statusCode).toBe(201);
        });
    });
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
