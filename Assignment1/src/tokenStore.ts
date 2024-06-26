import fs from 'fs';
const TOKEN_PATH = 'tokens.json';

export const storeTokens = (tokens: any) => {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
};

export const getTokens = () => {
  if (fs.existsSync(TOKEN_PATH)) {
    const tokens = fs.readFileSync(TOKEN_PATH);
    return JSON.parse(tokens.toString());
  }
  return null;
};
