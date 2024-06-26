import express from 'express';
import dotenv from 'dotenv';
import oAuth2Client, { getAccessToken, setCredentials } from './oauth2Client';
import { storeTokens } from './tokenStore';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the Email Automation Tool!');
});

// Route to initiate OAuth2 authentication
app.get('/auth', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.send',
    ],
  });
  res.redirect(authUrl);
});

// OAuth2 callback route
app.get('/auth/callback', async (req, res) => {
  const code = req.query.code as string;
  if (!code) {
    res.status(400).send('Missing code parameter');
    return;
  }

  try {
    const tokens = await getAccessToken(code);
    setCredentials(tokens);
    storeTokens(tokens);
    res.send('Authentication successful! You can close this tab.');
  } catch (error) {
    console.error('Error getting access token:', error);
    res.status(500).send('Authentication failed');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});








// import express from 'express';
// import dotenv from 'dotenv';
// import oAuth2Client, { getAccessToken, setCredentials } from './oauth2Client';
// import { storeTokens } from './tokenStore';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('Welcome to the Email Automation Tool!');
// });

// // OAuth2 callback route
// app.get('/auth/callback', async (req, res) => {
//   const code = req.query.code as string;
//   if (!code) {
//     res.status(400).send('Missing code parameter');
//     return;
//   }

//   try {
//     const tokens = await getAccessToken(code);
//     setCredentials(tokens);
//     storeTokens(tokens);
//     res.send('Authentication successful! You can close this tab.');
//   } catch (error) {
//     console.error('Error getting access token:', error);
//     res.status(500).send('Authentication failed');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
