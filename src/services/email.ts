import { API } from 'aws-amplify';

export default class EmailService {
  private apiName: string = 'bhrestapi';
  private path: string = '/email';

  async postReceiptEmail(emailTo: string, receiptUrl: string): Promise<object> {
    let req = {
      body: { emailTo, receiptUrl },
    };
    let resp = await API.post(this.apiName, this.path, req);
    return resp;
  }
}
