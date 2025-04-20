import { IConfiguration } from './interface';

export default (): IConfiguration => ({
  envName: process.env.ENV_NAME || 'dev',
  port: parseInt(process.env.PORT) || 3000,
  docs: process.env.DOCS_PATH || 'docs',

  chainId: parseInt(process.env.CHAIN_ID) || 11155111,
  rpcUrl: process.env.RPC_URL || '',
  contractAddress: process.env.CONTRACT_ADDRESS || '',
  operatorAddress: process.env.OPERATOR_ADDRESS || '',
  operatorPk: sanitizePrivateKey(process.env.OPERATOR_ADDRESS_PK),
});

function sanitizePrivateKey(key?: string): string {
  if (!key) return '';
  return key.startsWith('0x') ? key.slice(2) : key;
}
