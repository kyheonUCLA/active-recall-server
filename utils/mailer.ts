import nodemailer from 'nodemailer'

const createTestCreds = async () => {
  const creds = await nodemailer.createTestAccount();
  console.log({ creds })
}

createTestCreds();

const sendEmail = async () => {

}

export default sendEmail