import { config } from 'dotenv';
config();

export const configure = {
  port: process.env.PORT || 5670,
  DB_Port: process.env.DB_PORT || 3306,
  DB_Host: process.env.DB_HOST || 'localhost',
  DB_User: process.env.DB_USER || 'root',
  DB_Pass: process.env.DB_PASS || '',
  DB_Name: process.env.DB_NAME || 'patient_management_system',
  TWILIO_SID : process.env.TWILIO_ACCOUNT_SID || 'ACXXXXXXXX',
  TWILIO_TOKEN : process.env.TWILIO_AUTH_TOKEN || 'your_auth_token',
  NUMBER : process.env.TWILIO_PHONE_NUMBER || '+15017122661',
};