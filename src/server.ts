import { randomBytes } from 'crypto';
import express, { Express, Request, Response } from 'express';
import { ServerConfig } from './types.js';
import {
  buildAuthorizationUrl,
  fetchIssuerConfig,
  fetchTokens,
  generateCodeChallenge,
} from './oauth/index.js';

// jest.mock('node-fetch', () => jest.fn());

export const createServer = ({
  issuerUrl = '',
  clientId = '',
  clientSecret = '',
  redirectUri = '',
}: ServerConfig): Express => {
  const server: Express = express();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  server.get('/fs', async (req: Request, res: Response) => {
    console.log({
      issuerUrl,
      clientId,
      clientSecret,
      redirectUri,
      codeVerifier,
      codeChallenge,
    });

    const issuerConfig = await fetchIssuerConfig(issuerUrl);
    console.log({ issuerConfig });

    const { code } = req.query;

    if (code) {
      console.log({ code });
      try {
        const tokens = await fetchTokens(
          issuerConfig.token_endpoint,
          redirectUri,
          code.toString(),
          clientId,
          codeVerifier
        );
        if (tokens && tokens.id_token) {
          const token = JSON.parse(atob(tokens.id_token.split('.')[1]));
          console.log({ tokens, token });
          res.status(200).send({ tokens, token });
        } else {
          console.log({ tokens });
          res.status(500).send({ error: 'No tokens' });
        }
      } catch (e) {
        console.error(e);
        // console.error('An error occurred!', (e as Error).message);
        res.status(500).send({ error: e });
      }
    } else {
      const scope =
        'openid email profile qualifies_for_affiliate_account country';
      const codeChallengeMethod = 'S256';
      const authorizationUrl = buildAuthorizationUrl(
        issuerConfig.authorization_endpoint,
        clientId,
        scope,
        redirectUri,
        codeChallenge,
        codeChallengeMethod
      );
      console.log({ authorizationUrl });
      res.redirect(authorizationUrl);
    }
  });

  return server;
};

const encode = (input: Buffer) => Buffer.from(input).toString('base64url');

const generateCodeVerifier = (bytes = 32) => encode(randomBytes(bytes));

export const startServer = (server: Express, port: number): void => {
  server.listen(port, () => {
    // console.error(error);
  });

  console.log(`Server started on port ${port}`);
};
