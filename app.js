import express from 'express';
var morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3030;
import UserModel from './models/users';

app.use(morgan('dev'));

app.get('', async (req, res) => {
  const newUser = await UserModel.create(
    {
      firstName: 'Another One',
      lastName: 'Another One',
      email: 'AnotherOne@me.come',
    },
    {
      returning: true,
    }
  );
  res.send({ mesage: 'Hello World!', data: newUser });
});

app.listen(PORT, () => console.log(`>>> Serving Requests at ${PORT}`));
