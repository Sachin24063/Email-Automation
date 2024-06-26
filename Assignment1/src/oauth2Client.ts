// import { google } from 'googleapis';

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );

// export const getAccessToken = async (code: string) => {
//   const { tokens } = await oAuth2Client.getToken(code);
//   oAuth2Client.setCredentials(tokens);
//   return tokens;
// };

// export const setCredentials = (tokens: any) => {
//   oAuth2Client.setCredentials(tokens);
// };

// export default oAuth2Client;


import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

export const getAccessToken = async (code: string) => {
  const { tokens } = await oAuth2Client.getToken(code);
  return tokens;
};

export const setCredentials = (tokens: any) => {
  oAuth2Client.setCredentials(tokens);
};

export default oAuth2Client;


