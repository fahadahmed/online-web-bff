import { RequestOptions } from 'apollo-datasource-rest';
import { DESLDataSource } from 'datasources/common';

export class A2PBaseAPI extends DESLDataSource {
  willSendRequest(request: RequestOptions) {
    // we prefer to pass this header from graphQL, not from the client side
    request.headers.append('Realm', 'MYSB');

    super.willSendRequest(request);
  }
}
