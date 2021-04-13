import express from 'express';
import handleValidationErrors from '../../middlewares/handleValidationErrors';
import { signUpValidationSchema } from './IdentitySchema';
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

export default identityRouter;
