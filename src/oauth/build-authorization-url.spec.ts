import { buildAuthorizationUrl } from './build-authorization-url.js';

describe('server/buildAuthorizationUrl', () => {
  it('should build the authorization url correctly', () => {
    // Arrange
    const authorizationEndpoint = 'http://authorization-endpoint/a/b/c';
    const scope = 'openid email profile';
    const clientId = '123abc';
    const codeChallenge = 'ab-34';
    const codeChallengeMethod = 'S256';

    // Act & Assert
    expect(
      buildAuthorizationUrl(
        authorizationEndpoint,
        clientId,
        scope,
        codeChallenge,
        codeChallengeMethod,
        codeChallengeMethod
      )
    ).toEqual(
      'http://authorization-endpoint/a/b/c?client_id=123abc&scope=openid%20email%20profile&response_type=code&redirect_uri=ab-34&code_challenge=S256&code_challenge_method=S256'
    );
  });
});
