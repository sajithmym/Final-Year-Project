import { config } from 'dotenv';
config();

export const configure = {
  frontendUrl: 'http://localhost:2222',
  port: process.env.PORT || 8888,
  DB_Port: process.env.DB_PORT || 3306,
  DB_Host: process.env.DB_HOST || 'localhost',
  DB_User: process.env.DB_USER || 'root',
  DB_Pass: process.env.DB_PASS || '',
  DB_Name: process.env.DB_NAME || 'patient_management_system',

  CLICKSEND_FROM_PHONE: '+12013579122',
  CLICKSEND_USERNAME: 'wuryi75lw8@hellomailo',
  CLICKSEND_API_KEY: 'F4F6E139-1427-1D66-2870-7FB1AE57C7AE',

  JWTsecret: process.env.JWTsecret || 'qTAJ/qSat/MJ7Zj1Il0Q30JWVwXEyLEF6QwnH4jMsVk=',
};