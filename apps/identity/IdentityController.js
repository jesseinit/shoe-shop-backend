import { IdentityOnboardingService } from './IdentityService';

class IdentityContoller {
  static async home(req, res) {
    res.send({ message: 'Hello World!' });
  }

  static async signUpUsers(req, res) {
    const serviceResult = await IdentityOnboardingService.createUserAccount(req.body);
    res.status(201).send({ data: serviceResult });
  }

  static async verifyUsers(req, res) {
    const serviceResult = await IdentityOnboardingService.verifyUserAccount(req.body);
    res.status(200).send({ data: serviceResult });
  }

  static async loginUsers(req, res) {
    const serviceResult = await IdentityOnboardingService.loginUserAccount(req.body);
    res.status(200).send({ data: serviceResult });
  }
}

export default IdentityContoller;
