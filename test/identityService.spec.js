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

  it('should signup users', async () => {
    const res = await chai.request(app).post('/api/v1/user/signup').send({
      firstName: 'Jesse',
      lastName: 'Doeman',
      email: 'j3bsie@gmail.com',
      password: 'password',
      accountType: 'CUSTOMER',
    });
    expect(res.statusCode).equals(201);
    expect(res.body).haveOwnProperty('data');
  });

  it('should not signup existing users', async () => {
    const res = await chai.request(app).post('/api/v1/user/signup').send({
      firstName: 'Jesse',
      lastName: 'Doeman',
      email: 'j3bsie@gmail.com',
      password: 'password',
      accountType: 'CUSTOMER',
    });
    expect(res.statusCode).equals(409);
    expect(res.body).haveOwnProperty('error');
  });

  it('should be able to login users', async () => {
    const res = await chai.request(app).post('/api/v1/user/login').send({
      email: 'j3bsie@gmail.com',
      password: 'password',
    });
    expect(res.statusCode).equals(200);
    expect(res.body).haveOwnProperty('data');
  });
});
