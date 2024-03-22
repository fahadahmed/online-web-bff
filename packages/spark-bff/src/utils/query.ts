import qs from 'qs';

export function formatQuery(queryParameters: object): string {
  return qs.stringify(queryParameters, { skipNulls: true });
}
export function formatPathWithQuery(
  path: string,
  queryParameters: object,
): string {
  const queryString = formatQuery(queryParameters);
  if (queryString) {
    return `${path}?${queryString}`;
  }

  return path;
}
