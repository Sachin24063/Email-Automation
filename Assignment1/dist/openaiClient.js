"use strict";
// import { Configuration, OpenAIApi } from 'openai';
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
exports.generateReply = exports.analyzeEmail = void 0;
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// export const analyzeEmail = async (content: string) => {
//   const response = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `Categorize the following email content: "${content}"\n\nCategories:\n- Interested\n- Not Interested\n- More Information`,
//     max_tokens: 50,
//   });
//   const category = response.data.choices[0].text.trim();
//   return category;
// };
// export const generateReply = async (category: string, content: string) => {
//   let prompt = '';
//   if (category === 'Interested') {
//     prompt = `Generate a reply to an email indicating interest. Ask if they are willing to hop on a demo call and suggest a time. Email content: "${content}"`;
//   } else if (category === 'Not Interested') {
//     prompt = `Generate a polite reply indicating no further interest. Email content: "${content}"`;
//   } else if (category === 'More Information') {
//     prompt = `Generate a reply requesting more information. Email content: "${content}"`;
//   }
//   const response = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt,
//     max_tokens: 150,
//   });
//   const reply = response.data.choices[0].text.trim();
//   return reply;
// };
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const analyzeEmail = (content) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield openai.completions.create({
        model: 'text-davinci-003',
        prompt: `Categorize the following email content: "${content}"\n\nCategories:\n- Interested\n- Not Interested\n- More Information`,
        max_tokens: 50,
    });
    const category = response.choices[0].text.trim();
    return category;
});
exports.analyzeEmail = analyzeEmail;
const generateReply = (category, content) => __awaiter(void 0, void 0, void 0, function* () {
    let prompt = '';
    if (category === 'Interested') {
        prompt = `Generate a reply to an email indicating interest. Ask if they are willing to hop on a demo call and suggest a time. Email content: "${content}"`;
    }
    else if (category === 'Not Interested') {
        prompt = `Generate a polite reply indicating no further interest. Email content: "${content}"`;
    }
    else if (category === 'More Information') {
        prompt = `Generate a reply requesting more information. Email content: "${content}"`;
    }
    const response = yield openai.completions.create({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 150,
    });
    const reply = response.choices[0].text.trim();
    return reply;
});
exports.generateReply = generateReply;
