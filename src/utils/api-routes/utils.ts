// import sendgrid from '@sendgrid/mail';
import { Resend } from 'resend';
import { errors } from '../errors';

type EmailOptions = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

export async function sendEmail(options: EmailOptions) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    // return sendgrid.send(options);
    return resend.emails.send(options);
  } catch (error) {
    errors.add(error);
  }
}
