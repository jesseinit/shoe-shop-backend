import { validationResult } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(422).send({
      error: validationErrors.array(),
    });
  }
  next();
};

export default handleValidationErrors;
