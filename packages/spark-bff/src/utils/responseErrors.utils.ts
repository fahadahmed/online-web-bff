export interface DataSourceError {
  extensions?: {
    response?: {
      status?: number;
    };
  };
}

enum StatusCode {
  UNAUTHENTICATED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

export function isUnauthenticated(error: DataSourceError) {
  return error?.extensions?.response?.status === StatusCode.UNAUTHENTICATED;
}

export function isForbidden(error: DataSourceError) {
  return error?.extensions?.response?.status === StatusCode.FORBIDDEN;
}

export function isNotFound(error: DataSourceError) {
  return error?.extensions?.response?.status === StatusCode.NOT_FOUND;
}
