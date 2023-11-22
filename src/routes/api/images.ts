import express from 'express'
import sharp from 'sharp'
import dotenv from 'dotenv'
import { fileExists, resizeImage } from '../../utils/utils'
import path from 'path'

const images = express.Router()
dotenv.config()
images.get('/', async (req, res) => {
  const imageName = String(req.query?.name)
  const imageHeight = Number(req.query.height)
  const imageWidth = Number(req.query.width)
  const imageResouce = ['encenadaport', 'fjord', 'icelandwaterfall', 'palmtunnel', 'santamonica']

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
  const imagePath = process.env.IMAGES_FOLDER_PATH
  const imageUrl = imagePath + imageName + '.jpg'

  const imageResizeName = path.join(`${imageName}-${imageWidth}-${imageHeight}.jpg`)
  let imageResizePath = imagePath + imageResizeName
  try {
    const imageExists = await fileExists(imageResizePath);

    if (!imageExists) {
      const originalImagePath = imageUrl; // Replace with your original image path

      await resizeImage(originalImagePath, imageWidth, imageHeight, imageResizePath);
    }

    imageResizePath = '/../../.' + imageResizePath
    res.sendFile(path.join(__dirname, imageResizePath))
  } catch (error) {
      console.error('Error processing image:', error)
      res.status(500).send('Internal Server Error')
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
})
export = images
