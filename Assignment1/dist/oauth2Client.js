"use strict";
// import { google } from 'googleapis';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCredentials = exports.getAccessToken = void 0;
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
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const oAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
const getAccessToken = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokens } = yield oAuth2Client.getToken(code);
    return tokens;
});
exports.getAccessToken = getAccessToken;
const setCredentials = (tokens) => {
    oAuth2Client.setCredentials(tokens);
};
exports.setCredentials = setCredentials;
exports.default = oAuth2Client;
