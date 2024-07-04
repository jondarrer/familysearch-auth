import axios from 'axios';
import { IssuerConfig } from '../types.js';

export const fetchIssuerConfig = async (
  issuerUrl: string
): Promise<IssuerConfig> => {
  const response = await axios<IssuerConfig>(
    `${issuerUrl}.well-known/openid-configuration`
  );
  return response.data;
};
