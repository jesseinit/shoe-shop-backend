import express from 'express';
import IdentityRouter from './apps/identity/IdentityRouter';
import morgan from 'morgan';
const app = express();
import { config as loadEnv } from 'dotenv';

loadEnv();

app.use(morgan('dev'));

app.use(express.json());
app.use('/api/v1', [IdentityRouter]);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({ error: err.message });
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`>>> Serving Requests at ${PORT}`));
