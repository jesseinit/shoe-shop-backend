const chai = require('chai');
const chaiHttp = require('chai-http');
import sinon from 'sinon';
const expect = chai.expect;
chai.use(chaiHttp);
import app from '../app';
import { RandomNumberGeneratorManager, NotificatonManager } from '../utils/helpers';

describe('Identity Service API', () => {
  it('should show home route', async () => {
    const res = await chai.request(app).get('/api/v1');
    expect(res.statusCode).equals(200);
  });

  describe('----------------OnBoarding Tests----------------', () => {
    let randomNumberGeneratorStub;
    let notificatonManagerStub;
    before(function () {
      // runs once after the last test in this block
      randomNumberGeneratorStub = sinon
        .stub(RandomNumberGeneratorManager, 'generateRandHex')
        .returns('0d82cf3b47de473d9e8eb9c252cb4f25');
      notificatonManagerStub = sinon.stub(NotificatonManager, 'sendMail').returns(null);
    });
    after(function () {
      // runs once after the last test in this block
      randomNumberGeneratorStub.restore();
      notificatonManagerStub.restore();
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

    it('should be able to verify and activate users', async () => {
      const res = await chai.request(app).post('/api/v1/user/verify').send({
        verificationCode: '0d82cf3b47de473d9e8eb9c252cb4f25',
      });
      expect(res.statusCode).equals(200);
      expect(res.body).haveOwnProperty('data');
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
});
