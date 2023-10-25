const app = require('../app')
const request = require('supertest')

describe('GET /admin/best-clients', () => {
  test('should return 200 OK and have the correct shape', async () => {
    await request(app)
      .get('/admin/best-clients?start=1597471200000&end=1597730399000&limit=2')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then((response) => {
        // Check the response type and length
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(2)

        // Check the response data
        expect(response.body[0].id).toBe(4)
        expect(response.body[0].fullName).toBe('Ash Kethcum')
        expect(response.body[0].paid).toBe(2020)
      })
  })
})
