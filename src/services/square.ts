import { API } from 'aws-amplify';
import { SquareResponse } from '../models/SquarePayment';

export class SquareService {
  private apiName: string = 'bhrestapi';
  private path: string = '/square';

  async postPayment(
    token: string,
    payerFname: string,
    payerLname: string,
    payerEmail: string,
    amount: number,
    paymentType: number
  ): Promise<SquareResponse> {
    let req = {
      body: { token, amount, payerFname, payerLname, payerEmail, paymentType },
    };
    let resp: SquareResponse = await API.post(this.apiName, this.path, req);
    return resp;
  }
}
