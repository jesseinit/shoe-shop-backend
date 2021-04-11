import express from 'express';
import identityRouter from './apps/identity/router';
var morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3030;

app.use(morgan('dev'));

app.use('/api/v1', [identityRouter]);

app.listen(PORT, () => console.log(`>>> Serving Requests at ${PORT}`));
