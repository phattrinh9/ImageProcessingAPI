'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
const express_1 = __importDefault(require('express'))
const images = express_1.default.Router()
images.get('/', (req, res) => {
  let imageName = req.body.name
  let imageHeight = req.body.height
  let imageWidth = req.body.width
  //concatenate image path
  //use sharp for resize image
})
module.exports = images
