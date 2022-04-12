import { API } from 'aws-amplify';

export default class DocsService {
  private apiName: string = 'bhrestapi';
  private authPath: string = '/docs/authenticate';
  private pwKey: string = 'brendanhouse-docs-pw';

  async passwordLogin(password: string): Promise<DocsAuthStatus> {
    localStorage.setItem(this.pwKey, password);
    let req = {
      body: { password },
    };
    let resp: DocsAuthStatus = await API.post(this.apiName, this.authPath, req);
    return resp;
  }

  async getAuthStatus(): Promise<DocsAuthStatus> {
    let req = {
      body: { password: localStorage.getItem(this.pwKey) },
    };
    let resp: DocsAuthStatus = await API.post(this.apiName, this.authPath, req);
    return resp;
  }
}

export interface DocsAuthStatus {
  docs_auth: boolean;
  cohort: number;
}
