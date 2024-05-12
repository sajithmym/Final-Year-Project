import { config } from 'dotenv';
config();

module.exports = {
  port: process.env.Port || 5670,
};
