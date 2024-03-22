import { server } from './server';

process.env.API_GW_BASE_URL = 'http://testhost';
process.env.IS_DEVELOPMENT_ENVIRONMENT = 'true';

beforeAll(() => {
  server.listen();
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(2021, 1, 17, 10, 30).getTime());
});

afterEach(() => server.resetHandlers());
afterAll(() => {
  jest.clearAllTimers();
  server.close();
});
