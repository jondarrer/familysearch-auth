export const buildAuthorizationUrl = (
  authorizationEndpoint: string,
  clientId: string,
  scope: string,
  redirectUri: string,
  codeChallenge: string,
  codeChallengeMethod: string
): string =>
  `${authorizationEndpoint}?client_id=${clientId}&scope=${encodeURIComponent(
    scope
  )}&response_type=code&redirect_uri=${redirectUri}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`;
