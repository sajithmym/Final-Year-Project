import { config } from 'dotenv';
config();

export const configure = {
  port: process.env.PORT || 8888,
  DB_Port: process.env.DB_PORT || 3306,
  DB_Host: process.env.DB_HOST || 'localhost',
  DB_User: process.env.DB_USER || 'root',
  DB_Pass: process.env.DB_PASS || '',
  DB_Name: process.env.DB_NAME || 'patient_management_system',

  CLICKSEND_FROM_PHONE: '+9575',
  CLICKSEND_USERNAME: 'tihicll.com',
  CLICKSEND_API_KEY: '588499',

  JWTsecret: process.env.JWTsecret || 'qTAJ/qSat/MJ7Zj1Il0Q30JWVwXEyLEF6QwnH4jMsVk=',
};