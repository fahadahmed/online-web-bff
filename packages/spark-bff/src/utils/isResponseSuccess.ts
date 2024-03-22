export function isResponseSuccess(code: number) {
  return code >= 2000 && code < 3000;
}
