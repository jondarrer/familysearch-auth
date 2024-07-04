export type ServerConfig = {
  issuerUrl?: string;
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
};

export type IssuerConfig = {
  jwks_uri: string;
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  response_types_supported: Array<string>;
  id_token_signing_alg_values_supported: Array<string>;
  scopes_supported: Array<string>;
  subject_types_supported: Array<string>;
  userinfo_endpoint: string;
};
