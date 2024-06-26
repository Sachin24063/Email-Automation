// import { Configuration, OpenAIApi } from 'openai';

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


import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeEmail = async (content: string) => {
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: `Categorize the following email content: "${content}"\n\nCategories:\n- Interested\n- Not Interested\n- More Information`,
    max_tokens: 50,
  });

  const category = response.choices[0].text.trim();
  return category;
};

export const generateReply = async (category: string, content: string) => {
  let prompt = '';

  if (category === 'Interested') {
    prompt = `Generate a reply to an email indicating interest. Ask if they are willing to hop on a demo call and suggest a time. Email content: "${content}"`;
  } else if (category === 'Not Interested') {
    prompt = `Generate a polite reply indicating no further interest. Email content: "${content}"`;
  } else if (category === 'More Information') {
    prompt = `Generate a reply requesting more information. Email content: "${content}"`;
  }

  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 150,
  });

  const reply = response.choices[0].text.trim();
  return reply;
};
