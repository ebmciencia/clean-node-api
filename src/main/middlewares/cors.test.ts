import request from 'supertest'
import app from '../config/app'

describe('CORS Middlewre', () => {
  test('Should enable CORS', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('acces-control-allow-origin', '*')
      .expect('acces-control-allow-methods', '*')
      .expect('acces-control-allow-headers', '*')
  })
})
