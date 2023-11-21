"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index")); // Import your Express app
const request = (0, supertest_1.default)(index_1.default);
describe('Express Routes', () => {
    it('should return Images encenadaport with width=100 and height=300', () => {
        request.get('/api/images?name=encenadaport&width=100&height=300')
            .expect(200);
    });
    it('should return Images encenadaport with with width=300 and height=300', () => {
        request.get('/api/images?name=encenadaport&width=300&height=300')
            .expect(200);
    });
    it('should return error not found image', () => {
        request.get('/api/images?name=imageMissing&width=100&height=300')
            .expect(404)
            .expect('Can not find image');
    });
});
