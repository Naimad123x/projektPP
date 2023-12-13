import request from 'supertest';
import {app} from '../src/site/app.js';
import 'dotenv/config'
describe('GET /api/location/warszawa', () => {
  it('responds with JSON', (done) => {
    request(app)
      .get('/api/location/warszawa?key='+process.env.API_KEY)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

process.exit();