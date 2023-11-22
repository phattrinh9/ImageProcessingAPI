import fs from 'fs'
import { resizeImage } from './../utils/utils'; // Import your image processing function here
import request from 'supertest';
import app from '../index'; // Replace with the path to your Express app file

describe('Image Processing Endpoint', () => {
  it('should return 400 for missing parameters', async () => {
    const response = await request(app).get('/api/images//');
    expect(response.status).toBe(400);
  });

  it('should return 400 for invalid width', async () => {
    const response = await request(app).get('/api/images/?name=encenadaport&width=abc&height=200');
    expect(response.status).toBe(400);
  });
  it('should return 400 for invalid height', async () => {
    const response = await request(app).get('/api/images/?name=encenadaport&width=200&height=-1');
    expect(response.status).toBe(400);
  });

  it('should return 404 for invalid image name', async () => {
    const response = await request(app).get('/api/images/?name=invalidimage&width=100&height=200');
    expect(response.status).toBe(404);
  });

  it('should return 200 for valid parameters', async () => {
    const response = await request(app).get('/api/images/?name=encenadaport&width=100&height=200');
    if (fs.existsSync('./images/full/encenadaport-100-100.jpg')) {
      fs.unlinkSync('./images/full/encenadaport-100-100.jpg')
    }
    expect(response.status).toBe(200);
  });
});

describe('Saved resize image', () => {
  const testImagePath = './images/full/fjord.jpg'; // Replace with your original image path
  const resizedImagePath = './images/full/fjord-100-100.jpg'; // Replace with the expected resized image path

  afterEach(() => {
    // Clean up the generated test image after each test
    if (fs.existsSync(resizedImagePath)) {
      fs.unlinkSync(resizedImagePath)
    }
  });

  it('Should generate resized image', async () => {
    // Ensure the resized image doesn't exist initially
    expect(fs.existsSync(resizedImagePath)).toBeFalsy()

    // Call the resizing function
    await resizeImage(testImagePath, 100, 100, resizedImagePath);

    // Check if the resized image has been generated
    expect(fs.existsSync(resizedImagePath)).toBeTruthy()
  })
})
