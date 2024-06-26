import { Queue, Worker } from 'bullmq';
import oAuth2Client from './oauth2Client';
import { google, gmail_v1 } from 'googleapis';
import { analyzeEmail, generateReply } from './openaiClient';

const queue = new Queue('emailQueue');

const worker = new Worker('emailQueue', async job => {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  const res = await gmail.users.messages.list({ userId: 'me', q: 'is:unread' });
  const messages = res.data.messages || [];

  for (const message of messages) {
    if (!message.id) continue;
    const msg = await gmail.users.messages.get({ userId: 'me', id: message.id });
    if ('data' in msg && msg.data) {
      const content = msg.data.snippet || '';
      if (!content) continue;

      const category = await analyzeEmail(content);
      const reply = await generateReply(category, content);

      const fromHeader = msg.data.payload?.headers?.find((header: any) => header.name === 'From')?.value;
      const subjectHeader = msg.data.payload?.headers?.find((header: any) => header.name === 'Subject')?.value;
      if (!fromHeader || !subjectHeader) continue;

      const rawMessage = `From: me\nTo: ${fromHeader}\nSubject: Re: ${subjectHeader}\n\n${reply}`;

      const encodedMessage = Buffer.from(rawMessage).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage,
        },
      });

      await gmail.users.messages.modify({
        userId: 'me',
        id: message.id,
        requestBody: {
          addLabelIds: [category],
          removeLabelIds: ['UNREAD'],
        },
      });
    }
  }
}, {
  connection: {
    host: 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  }
});

// Correct type for repeat options
queue.add('checkEmails', {}, { repeat: { cron: '*/5 * * * *' } as any });

export default queue;
