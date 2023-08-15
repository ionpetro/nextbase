// import sendgrid from '@sendgrid/mail';
import { Resend } from 'resend';
import { errors } from '../errors';

// sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

type EmailOptions = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

export async function sendEmail(options: EmailOptions) {
  try {
    // return sendgrid.send(options);
    return resend.sendEmail(options);
  } catch (error) {
    errors.add(error);
  }
}
