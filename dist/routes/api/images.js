"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const dotenv_1 = __importDefault(require("dotenv"));
const images = express_1.default.Router();
dotenv_1.default.config();
images.get('/', (req, res) => {
    var _a;
    const imageName = String((_a = req.query) === null || _a === void 0 ? void 0 : _a.name);
    const imageHeight = Number(req.query.height);
    const imageWidth = Number(req.query.width);
    //concatenate image path
    const imagePath = process.env.IMAGES_FOLDER_PATH;
    const imageUrl = imagePath + imageName + '.jpg';
    //use sharp for resize image
    (0, sharp_1.default)(imageUrl)
        .resize(imageHeight, imageWidth) // Set the desired width and height
        .toBuffer()
        .then((data) => {
        // Display the image or do further processing
        // For example, if you are using Express.js, you can send the image as a response:
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(data);
    })
        .catch((error) => {
        // Handle any errors that occur during the process
        console.error(error);
        res.writeHead(404);
        res.send('Can not find image');
    });
});
module.exports = images;
