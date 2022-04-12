import { API } from 'aws-amplify';

export default class ContactService {
  private apiName: string = 'bhrestapi';
  private path: string = '/contact';

  async postContactForm(firstName: string, lastName: string, email: string, message: string): Promise<object> {
    let req = {
      body: { firstName, lastName, email, message },
    };
    let resp = await API.post(this.apiName, this.path, req);
    return resp;
  }
}
