import { config } from 'dotenv';
config();

export const configure = {
  port: process.env.PORT || 8888,
  DB_Port: process.env.DB_PORT || 3306,
  DB_Host: process.env.DB_HOST || 'localhost',
  DB_User: process.env.DB_USER || 'root',
  DB_Pass: process.env.DB_PASS || '',
  DB_Name: process.env.DB_NAME || 'patient_management_system',
  INFOBIP_API_KEY : process.env.INFOBIP_API_KEY,
  SENDER_NAME : process.env.SENDER_NAME,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
};