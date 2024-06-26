"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokens = exports.storeTokens = void 0;
const fs_1 = __importDefault(require("fs"));
const TOKEN_PATH = 'tokens.json';
const storeTokens = (tokens) => {
    fs_1.default.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
};
exports.storeTokens = storeTokens;
const getTokens = () => {
    if (fs_1.default.existsSync(TOKEN_PATH)) {
        const tokens = fs_1.default.readFileSync(TOKEN_PATH);
        return JSON.parse(tokens.toString());
    }
    return null;
};
exports.getTokens = getTokens;
