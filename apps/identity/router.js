import express from 'express';
const identityRouter = express.Router();

identityRouter.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

identityRouter.post('/user/signup', async (req, res) => {
  res.send({ message: 'SignUp Endpoint' });
});

export default identityRouter;
