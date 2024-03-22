export function isDevelopmentEnvironment(): boolean {
  return process.env.IS_DEVELOPMENT_ENVIRONMENT === 'true';
}
