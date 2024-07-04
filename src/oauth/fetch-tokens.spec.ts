import nock from 'nock';
import { fetchTokens } from './fetch-tokens.js';

// jest.mock('node-fetch', () => jest.fn());

describe('server/fetchTokens', () => {
  it('should fetch the issuer config correctly', async () => {
    // Arrange
    const tokenEndpoint = 'http://issuer-url';
    const redirectUri = '';
    const code = '';
    const clientId = '';
    const codeVerifier = '';

    nock(tokenEndpoint)
      .get(`/token`)
      .reply(200, {
        tokens: {
          access_token: '456',
          id_token: '123',
          token_type: 'Bearer',
        },
      });

    // Act
    const tokens = await fetchTokens(
      `${tokenEndpoint}/token`,
      redirectUri,
      code,
      clientId,
      codeVerifier
    );

    // Assert
    expect(tokens).toEqual('');
  });
});
