import { IncomingHttpHeaders } from 'http';

export function extractHeaderValue(
  headers: IncomingHttpHeaders | undefined,
  headerName: string,
): string | undefined {
  const stringOrStrings = headers?.[headerName];
  if (typeof stringOrStrings === 'object') {
    // If array - return the first header value.
    return stringOrStrings[0];
  }
  return stringOrStrings;
}
