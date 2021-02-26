import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string): string {
  return `
    <div style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
    ">
        <h2>Hello There !</h2>
        <p>${text}</p>
        <p>from Simon</p>
    </div>
    `;
}

interface mailResponse {
  accepted: string[];
  rejected: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: { from: string; to: string[] };
  messageId: string;
}

export async function sendPasswordResetEmail(resetToken: string, to: string) {
  const info: mailResponse = await transport.sendMail({
    to,
    from: 'simon@dosda.com',
    subject: 'Your password reset token is here!',
    html: makeANiceEmail(
      `Hello there!
        <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">
          Click here to reset
        </a>`
    ),
  });
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`Message sent! preview at ${getTestMessageUrl(info)}`);
  }
}
