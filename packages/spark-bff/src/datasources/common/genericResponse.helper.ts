import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server-fastify';
import { definitions } from 'generated/typings/userPreferencesProxy';
import { isResponseSuccess } from 'utils/isResponseSuccess';
import { DESLResponse } from './DESLDataSourceWithHeaders';

export interface GenericResponseBody {
  code: number;
  message: string;
  success: boolean;
}

function constructPlainResponse({
  code = 5001,
  message = 'Unknown error',
} = {}): GenericResponseBody {
  return {
    code,
    message,
    success: isResponseSuccess(code),
  };
}

export const constructGenericResponse = (
  deslBody: definitions['Response'],
): GenericResponseBody => {
  const deslMessage = deslBody?.messages?.[0];
  return constructPlainResponse({
    code: deslMessage?.code,
    message: deslMessage?.message,
  });
};

export const constructSuccessResponse = (deslBody: definitions['Response']) => {
  return constructGenericResponse(deslBody);
};

export const constructErrorResponse = (
  error: ApolloError | ForbiddenError | AuthenticationError,
) => {
  const deslBody = error.extensions?.response?.body as definitions['Response'];
  if (!deslBody && error.message) {
    return constructPlainResponse({ message: error.message });
  }
  return constructGenericResponse(deslBody);
};

export const constructSuccessResponseWithHeaders = (
  deslResponse: DESLResponse<definitions['Response']>,
): DESLResponse<GenericResponseBody> => {
  return {
    body: constructGenericResponse(deslResponse.body),
    headers: deslResponse.headers,
  };
};

export const constructErrorResponseWithHeaders = (
  error: ApolloError | ForbiddenError | AuthenticationError,
): DESLResponse<GenericResponseBody> => {
  const deslBody = error.extensions.response?.body as definitions['Response'];
  return {
    body: constructGenericResponse(deslBody),
    headers: null,
  };
};
