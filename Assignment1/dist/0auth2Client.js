"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCredentials = exports.getAccessToken = void 0;
const googleapis_1 = require("googleapis");
const tokenStore_1 = require("./tokenStore");
const oAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
const tokens = (0, tokenStore_1.getTokens)();
if (tokens) {
    oAuth2Client.setCredentials(tokens);
}
oAuth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
        (0, tokenStore_1.storeTokens)(tokens);
    }
});
const getAccessToken = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokens } = yield oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    (0, tokenStore_1.storeTokens)(tokens);
    return tokens;
});
exports.getAccessToken = getAccessToken;
const setCredentials = (tokens) => {
    oAuth2Client.setCredentials(tokens);
};
exports.setCredentials = setCredentials;
exports.default = oAuth2Client;
