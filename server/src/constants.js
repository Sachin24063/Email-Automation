require('dotenv');
const auth = {
    type: 'OAuth2',
    user: 'sk8155566@gmail.com',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN
};

module.exports = { auth };
