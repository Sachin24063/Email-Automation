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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const oauth2Client_1 = __importDefault(require("./oauth2Client"));
const googleapis_1 = require("googleapis");
const openaiClient_1 = require("./openaiClient");
const queue = new bullmq_1.Queue('emailQueue');
const worker = new bullmq_1.Worker('emailQueue', (job) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth: oauth2Client_1.default });
    const res = yield gmail.users.messages.list({ userId: 'me', q: 'is:unread' });
    const messages = res.data.messages || [];
    for (const message of messages) {
        if (!message.id)
            continue;
        const msg = yield gmail.users.messages.get({ userId: 'me', id: message.id });
        if ('data' in msg && msg.data) {
            const content = msg.data.snippet || '';
            if (!content)
                continue;
            const category = yield (0, openaiClient_1.analyzeEmail)(content);
            const reply = yield (0, openaiClient_1.generateReply)(category, content);
            const fromHeader = (_c = (_b = (_a = msg.data.payload) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.find((header) => header.name === 'From')) === null || _c === void 0 ? void 0 : _c.value;
            const subjectHeader = (_f = (_e = (_d = msg.data.payload) === null || _d === void 0 ? void 0 : _d.headers) === null || _e === void 0 ? void 0 : _e.find((header) => header.name === 'Subject')) === null || _f === void 0 ? void 0 : _f.value;
            if (!fromHeader || !subjectHeader)
                continue;
            const rawMessage = `From: me\nTo: ${fromHeader}\nSubject: Re: ${subjectHeader}\n\n${reply}`;
            const encodedMessage = Buffer.from(rawMessage).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
            yield gmail.users.messages.send({
                userId: 'me',
                requestBody: {
                    raw: encodedMessage,
                },
            });
            yield gmail.users.messages.modify({
                userId: 'me',
                id: message.id,
                requestBody: {
                    addLabelIds: [category],
                    removeLabelIds: ['UNREAD'],
                },
            });
        }
    }
}), {
    connection: {
        host: 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
    }
});
// Correct type for repeat options
queue.add('checkEmails', {}, { repeat: { cron: '*/5 * * * *' } });
exports.default = queue;
