import axios from 'axios';

export const fetchTokens = async (
  tokenEndpoint: string,
  redirectUri: string,
  code: string,
  clientId: string,
  codeVerifier: string
): Promise<any> => {
  const response = await axios.post(
    `${tokenEndpoint}?redirect_uri=${redirectUri}`,
    new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: clientId,
      code_verifier: codeVerifier,
    })
  );
  return response.data;
};
