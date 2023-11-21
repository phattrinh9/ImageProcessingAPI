import express from 'express'
import sharp from 'sharp'
import dotenv from 'dotenv'

const images = express.Router()
dotenv.config()
images.get('/', (req, res) => {
  const imageName = String(req.query?.name)
  const imageHeight = Number(req.query.height)
  const imageWidth = Number(req.query.width)
  //concatenate image path

  const imagePath = process.env.IMAGES_FOLDER_PATH
  const imageUrl = imagePath + imageName + '.jpg'

  //use sharp for resize image
  sharp(imageUrl)
    .resize(imageHeight, imageWidth) // Set the desired width and height
    .toBuffer()
    .then((data) => {
      // Display the image or do further processing
      // For example, if you are using Express.js, you can send the image as a response:
      res.writeHead(200, { 'Content-Type': 'image/jpg' })
      res.end(data)
    })
    .catch((error) => {
      // Handle any errors that occur during the process
      console.error(error)
      res.writeHead(404)
      res.send('Can not find image')
    })
})
export = images
