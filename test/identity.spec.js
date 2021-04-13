const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
import app from '../app';

describe('Identity Service API', () => {
  it('should show home route', async () => {
    const res = await chai.request(app).get('/api/v1');
    expect(res.statusCode).equals(200);
  });
  // it('should show all users', async () => {
  //   const res = await request(app).get('/api/v1/users');
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toHaveProperty('users');
  // });
});
