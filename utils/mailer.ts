import nodemailer, { SendMailOptions } from 'nodemailer';
import log from './logger';
import config from 'config';

// const createTestCreds = async () => {
//   const creds = await nodemailer.createTestAccount();
//   console.log({ creds })
// }

// createTestCreds();

type SMPT = {
  user: string, pass: string, host: string, port: number, secure: boolean
}
const smtp = config.get<SMPT>('smtp');

const transporter = nodemailer.createTransport({
  ...smtp, 
  auth: {
    user: smtp.user,
    pass: smtp.pass,
  }
})

const sendEmail = async (payload: SendMailOptions) => {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(err, "Error sending email");
      return;
    }

    log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail