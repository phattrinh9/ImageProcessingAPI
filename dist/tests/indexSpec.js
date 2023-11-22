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
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("./../utils/utils"); // Import your image processing function here
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index")); // Replace with the path to your Express app file
describe('Image Processing Endpoint', () => {
    it('should return 400 for missing parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/images//');
        expect(response.status).toBe(400);
    }));
    it('should return 400 for invalid width', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/images/?name=encenadaport&width=abc&height=200');
        expect(response.status).toBe(400);
    }));
    it('should return 400 for invalid height', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/images/?name=encenadaport&width=200&height=-1');
        expect(response.status).toBe(400);
    }));
    it('should return 404 for invalid image name', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/images/?name=invalidimage&width=100&height=200');
        expect(response.status).toBe(404);
    }));
    it('should return 200 for valid parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/images/?name=encenadaport&width=100&height=200');
        if (fs_1.default.existsSync('./images/full/encenadaport-100-100.jpg')) {
            fs_1.default.unlinkSync('./images/full/encenadaport-100-100.jpg');
        }
        expect(response.status).toBe(200);
    }));
});
describe('Saved resize image', () => {
    const testImagePath = './images/full/fjord.jpg'; // Replace with your original image path
    const resizedImagePath = './images/full/fjord-100-100.jpg'; // Replace with the expected resized image path
    afterEach(() => {
        // Clean up the generated test image after each test
        if (fs_1.default.existsSync(resizedImagePath)) {
            fs_1.default.unlinkSync(resizedImagePath);
        }
    });
    it('Should generate resized image', () => __awaiter(void 0, void 0, void 0, function* () {
        // Ensure the resized image doesn't exist initially
        expect(fs_1.default.existsSync(resizedImagePath)).toBeFalsy();
        // Call the resizing function
        yield (0, utils_1.resizeImage)(testImagePath, 100, 100, resizedImagePath);
        // Check if the resized image has been generated
        expect(fs_1.default.existsSync(resizedImagePath)).toBeTruthy();
    }));
});
