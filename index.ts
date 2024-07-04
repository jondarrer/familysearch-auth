import { createServer, startServer } from './src/server.js';

(async () => {
  const {
    ISSUER_URL: issuerUrl,
    CLIENT_ID: clientId,
    CLIENT_SECRET: clientSecret,
    REDIRECT_URI: redirectUri,
    PORT: port,
  } = process.env;
  const server = await createServer({
    issuerUrl,
    clientId,
    clientSecret,
    redirectUri,
  });
  startServer(server, Number(port));
})();
