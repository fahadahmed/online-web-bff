import { DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/resourceInfoService';
import { ApolloError } from 'apollo-server-fastify';
import { formatResourceTypeResponse } from './helpers/resource.helper';

class ResourceAPI extends DESLDataSource {
  constructor() {
    super('/v1/utility/resource');
  }

  getMobileType(lineNumber: string) {
    return this.get<definitions['MobileTypeResponse']>(
      `/${lineNumber}/mobiletype`,
    )
      .then(() => {
        return { isValidMobile: true };
      })
      .catch((error: ApolloError) => {
        const {
          extensions: {
            response: { status },
          },
        } = error;
        if (status < 500) {
          return { isValidMobile: false };
        }
        throw error;
      });
  }

  async getResourceType(resourceId: string) {
    const data = await this.get<definitions['ResourceInfoResponse']>(
      `/${resourceId}`,
    );
    return formatResourceTypeResponse(data);
  }
}

export default ResourceAPI;
