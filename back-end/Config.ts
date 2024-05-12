/* eslint-disable prettier/prettier */
import { config } from 'dotenv';
config();

module.exports = {
  port: process.env.PORT || 5670,
  DB_Port: process.env.DB_PORT || 3306,
  DB_Host: process.env.DB_HOST || 'localhost',
  DB_User: process.env.DB_USER || 'root',
  DB_Pass: process.env.DB_PASS || '',
  DB_Name: process.env.DB_NAME || 'patient_management_system',
};