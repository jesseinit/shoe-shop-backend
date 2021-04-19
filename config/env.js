import { config as loadEnv } from 'dotenv';

const { parsed: envs } = loadEnv();

export default envs;
