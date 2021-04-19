import { checkSchema } from 'express-validator';

const signUpValidationSchema = checkSchema({
  email: {
    in: 'body',
    customSanitizer: {
      options: (email) => email.trim(),
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Email cannot be empty',
    },
    isEmail: {
      errorMessage: 'Please provide a valid email',
    },
    errorMessage: 'email is too short',
  },
  password: {
    in: 'body',
    isEmpty: {
      negated: true,
      errorMessage: 'Password cannot be empty',
    },
    isLength: {
      options: {
        min: 6,
      },
      errorMessage: 'Password cannot be less than 6 Characters',
    },
  },
  firstName: {
    in: 'body',
    customSanitizer: {
      options: (fullName) => fullName.trim(),
    },
    isEmpty: {
      negated: true,
      errorMessage: 'First name cannot be empty',
    },
    isString: {
      errorMessage: 'First name has to be a string',
    },
    isLength: {
      options: {
        min: 2,
        max: 50,
      },
      errorMessage: 'First name should be atleast 2 and upto 50 characters long',
    },
  },
  lastName: {
    in: 'body',
    customSanitizer: {
      options: (fullName) => fullName.trim(),
    },
    isEmpty: {
      negated: true,
      errorMessage: 'First name cannot be empty',
    },
    isString: {
      errorMessage: 'First name has to be a string',
    },
    isLength: {
      options: {
        min: 2,
        max: 50,
      },
      errorMessage: 'First name should be atleast 2 and upto 50 characters long',
    },
  },
  accountType: {
    in: 'body',
    isIn: {
      options: ['CUSTOMER', 'SELLER'],
      errorMessage: 'You can either be a seller of a customer',
    },
  },
});

const loginValidationSchema = checkSchema({
  email: {
    in: 'body',
    customSanitizer: {
      options: (email) => email.trim(),
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Email cannot be empty',
    },
    isEmail: {
      errorMessage: 'Please provide a valid email',
    },
    errorMessage: 'email is too short',
  },
  password: {
    in: 'body',
    isEmpty: {
      negated: true,
      errorMessage: 'Password cannot be empty',
    },
    isLength: {
      options: {
        min: 6,
      },
      errorMessage: 'Password cannot be less than 6 Characters',
    },
  },
});

export { signUpValidationSchema, loginValidationSchema };
