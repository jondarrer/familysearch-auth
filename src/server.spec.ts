import request from 'supertest';
import { Express } from 'express';

import { createServer } from './server.js';

describe('server/createServer', () => {
  let server: Express;

  beforeAll(() => {
    server = createServer({
      issuerUrl: 'https://issuer-url',
      clientId: 'client-id',
      clientSecret: 'client-secret',
      redirectUri: 'https://redirect-uri',
    });
  });

  it('returns a 200 when passed invalid JSON', async () => {
    // Act
    const response = await request(server).get('/fs');

    // Assert
    expect(response.statusCode).toBe(200);
  });
});
