import dotenv from 'dotenv';

const res = dotenv.config();

if (res.error)
    throw res.error;

const {parsed: env} = res;
export {env};
