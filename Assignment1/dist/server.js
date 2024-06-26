"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const oauth2Client_1 = __importStar(require("./oauth2Client"));
const tokenStore_1 = require("./tokenStore");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Welcome to the Email Automation Tool!');
});
// Route to initiate OAuth2 authentication
app.get('/auth', (req, res) => {
    const authUrl = oauth2Client_1.default.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/gmail.readonly',
            'https://www.googleapis.com/auth/gmail.send',
        ],
    });
    res.redirect(authUrl);
});
// OAuth2 callback route
app.get('/auth/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    if (!code) {
        res.status(400).send('Missing code parameter');
        return;
    }
    try {
        const tokens = yield (0, oauth2Client_1.getAccessToken)(code);
        (0, oauth2Client_1.setCredentials)(tokens);
        (0, tokenStore_1.storeTokens)(tokens);
        res.send('Authentication successful! You can close this tab.');
    }
    catch (error) {
        console.error('Error getting access token:', error);
        res.status(500).send('Authentication failed');
    }
}));
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
