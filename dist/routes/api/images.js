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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../../utils/utils");
const path_1 = __importDefault(require("path"));
const images = express_1.default.Router();
dotenv_1.default.config();
images.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const imageName = String((_a = req.query) === null || _a === void 0 ? void 0 : _a.name);
    const imageHeight = Number(req.query.height);
    const imageWidth = Number(req.query.width);
    const imageResouce = ['encenadaport', 'fjord', 'icelandwaterfall', 'palmtunnel', 'santamonica'];
    // Check if all required parameters are provided
    if (!imageName || !imageHeight || !imageWidth) {
        return res.status(400).send('Missing parameters');
    }
    // Validate width and height
    if (isNaN(imageHeight) || isNaN(imageWidth) || imageHeight <= 0 || imageWidth <= 0) {
        return res.status(400).send('Invalid width or height');
    }
    // Validate filename
    if (!imageResouce.includes(imageName)) {
        return res.status(404).send('Image not found');
    }
    //concatenate image path
    const imagePath = process.env.IMAGES_FOLDER_PATH;
    const imageUrl = imagePath + imageName + '.jpg';
    const imageResizeName = path_1.default.join(`${imageName}-${imageWidth}-${imageHeight}.jpg`);
    let imageResizePath = imagePath + imageResizeName;
    try {
        const imageExists = yield (0, utils_1.fileExists)(imageResizePath);
        if (!imageExists) {
            const originalImagePath = imageUrl; // Replace with your original image path
            yield (0, utils_1.resizeImage)(originalImagePath, imageWidth, imageHeight, imageResizePath);
        }
        imageResizePath = '/../../.' + imageResizePath;
        res.sendFile(path_1.default.join(__dirname, imageResizePath));
    }
    catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Internal Server Error');
    }
    // //use sharp for resize image
    // sharp(imageUrl)
    //   .resize(imageHeight, imageWidth) // Set the desired width and height
    //   .toBuffer()
    //   .then((data) => {
    //     // Display the image or do further processing
    //     // For example, if you are using Express.js, you can send the image as a response:
    //     res.writeHead(200, { 'Content-Type': 'image/jpg' })
    //     res.end(data)
    //   })
    //   .catch((error) => {
    //     // Handle any errors that occur during the process
    //     console.error(error)
    //     res.writeHead(404)
    //     res.send('Can not find image')
    //   })
}));
module.exports = images;
