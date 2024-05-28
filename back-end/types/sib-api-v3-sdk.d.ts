// types/sib-api-v3-sdk.d.ts
declare module 'sib-api-v3-sdk' {
    export class ApiClient {
      static instance: ApiClientInstance;
    }
  
    export class ApiClientInstance {
      authentications: { [key: string]: { apiKey: string } };
    }
  
    export class TransactionalSMSApi {
      sendTransacSms(sendSms: SendTransacSms): Promise<any>;
    }
  
    export class SendTransacSms {
      constructor(params: { sender: string; recipient: string; content: string });
    }
  }
  