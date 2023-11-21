import supertest from 'supertest'
import app from '../index' // Import your Express app
const request = supertest(app)

describe('Express Routes', () => {
  it('should return Images encenadaport with width=100 and height=300', () => {
    request
      .get('/api/images?name=encenadaport&width=100&height=300')
      .expect(200)
  })
  it('should return Images encenadaport with with width=300 and height=300', () => {
    request
      .get('/api/images?name=encenadaport&width=300&height=300')
      .expect(200)
  })
  it('should return error not found image', () => {
    request
      .get('/api/images?name=imageMissing&width=100&height=300')
      .expect(404)
      .expect('Can not find image')
  })
})
