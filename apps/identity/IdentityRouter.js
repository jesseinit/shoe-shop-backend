import express from 'express';
import handleValidationErrors from '../../middlewares/handleValidationErrors';
import {
  loginValidationSchema,
  signUpValidationSchema,
  verifyValidationSchema,
} from './IdentityValidationSchema';
import IdentityContoller from './IdentityController';
import controllerWrapper from '../../middlewares/controllerWrapper';

const identityRouter = express.Router();

identityRouter.get('/', IdentityContoller.home);

identityRouter.post(
  '/user/signup',
  signUpValidationSchema,
  handleValidationErrors,
  controllerWrapper(IdentityContoller.signUpUsers)
);

identityRouter.post(
  '/user/verify',
  verifyValidationSchema,
  handleValidationErrors,
  controllerWrapper(IdentityContoller.verifyUsers)
);

identityRouter.post(
  '/user/login',
  loginValidationSchema,
  handleValidationErrors,
  controllerWrapper(IdentityContoller.loginUsers)
);

export default identityRouter;
