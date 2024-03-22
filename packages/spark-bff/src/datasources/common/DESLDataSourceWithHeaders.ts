import type { Response, Request } from 'apollo-datasource-rest';
import { Headers } from 'apollo-server-env';
import DESLDataSource from './DESLDataSource';

export type DESLResponse<TBody> = {
  body: TBody;
  headers: Headers | null;
};

abstract class DESLDataSourceWithHeaders extends DESLDataSource {
  async didReceiveResponse(response: Response, request: Request) {
    const body = await super.didReceiveResponse(response, request);
    return { body, headers: response.headers };
  }
}

export default DESLDataSourceWithHeaders;
