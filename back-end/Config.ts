import { config } from 'dotenv';
config();

export const configure = {
  port: process.env.PORT || 8888,
  DB_Port: process.env.DB_PORT || 3306,
  DB_Host: process.env.DB_HOST || 'localhost',
  DB_User: process.env.DB_USER || 'root',
  DB_Pass: process.env.DB_PASS || '',
  DB_Name: process.env.DB_NAME || 'patient_management_system',

  CLICKSEND_FROM_PHONE: '+94729735575',
  CLICKSEND_USERNAME: 'tihic74706@luravell.com',
  CLICKSEND_API_KEY: '58849E5B-CE92-C4DD-81F9-E8CF38B32169',

  JWTsecret: process.env.JWTsecret ,
};