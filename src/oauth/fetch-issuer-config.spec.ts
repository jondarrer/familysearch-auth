import nock from 'nock';

import { fetchIssuerConfig } from './fetch-issuer-config.js';
// import fetch from 'node-fetch'

// jest.mock('node-fetch', () => jest.fn());

describe('server/fetchIssuerConfig', () => {
  it('should fetch the issuer config correctly', async () => {
    // Arrange
    const issuerBaseUrl = 'https://issuer-url';
    const issuerPath = '/1/2/v3/';
    const issuerUrl = `${issuerBaseUrl}${issuerPath}`;
    nock(issuerBaseUrl)
      .get(`${issuerPath}.well-known/openid-configuration`)
      .reply(200, {
        jwks_uri:
          'https://issuer-url/1/2/v3/.well-known/openid-configuration?certs',
        issuer: 'https://issuer-url',
        authorization_endpoint: 'https://issuer-url/1/2/v3/authorization',
        token_endpoint: 'https://issuer-url/1/2/v3/token',
        response_types_supported: ['code'],
        id_token_signing_alg_values_supported: ['RS256'],
        scopes_supported: ['openid', 'profile', 'email'],
        subject_types_supported: ['public'],
        userinfo_endpoint: 'https://issuer-url/1/2/3/v4/userinfo',
      });

    // Act
    const issuerConfig = await fetchIssuerConfig(issuerUrl);

    // Assert
    expect(issuerConfig).toEqual({
      jwks_uri:
        'https://issuer-url/1/2/v3/.well-known/openid-configuration?certs',
      issuer: 'https://issuer-url',
      authorization_endpoint: 'https://issuer-url/1/2/v3/authorization',
      token_endpoint: 'https://issuer-url/1/2/v3/token',
      response_types_supported: ['code'],
      id_token_signing_alg_values_supported: ['RS256'],
      scopes_supported: ['openid', 'profile', 'email'],
      subject_types_supported: ['public'],
      userinfo_endpoint: 'https://issuer-url/1/2/3/v4/userinfo',
    });
  });
});
