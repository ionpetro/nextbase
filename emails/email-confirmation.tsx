import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Link } from '@react-email/link';
import { Text } from '@react-email/text';
import React from "react";


interface EmailConfirmationProps {
  appName: string;
  userName: string;
  supportEmail: string;
}

const EmailConfirmation = ({ appName, userName, supportEmail }: EmailConfirmationProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#E5E7EB', fontFamily: 'sans-serif', fontWeight: 300 }}>
        <Container style={{ backgroundColor: 'white', padding: '48px 60px', margin: 'auto' }}>
          <Heading>Confirm your email address</Heading>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>Dear {userName} John,</Text>
          <Text style={{ fontSize: '16px' }}>
            Thank you for signing up with Acme {appName}.
          </Text>
          {/* <Text style={{fontSize: '16px'}}>
              To ensure the best service and security, we need to verify your
              email address.
            </Text> */}
          <Text style={{ fontSize: '16px' }}>
            Click the button below to confirm your email:
          </Text>
          <Button
            href=""
            style={{ fontSize: '16px', backgroundColor: 'black', fontWeight: 600, color: 'white', padding: '12px 40px', borderRadius: '4px' }}
          >
            Confirm Email
          </Button>
          {/* <Text style={{fontSize: '16px'}}>
            <Hr style={{margin: '28px 0'}}/>
              By confirming your email, you ensure that you can receive
              important notifications and account information from us.
            </Text> */}
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>
            If you didn't sign up for an account with [Your App Name] or if
            you have any questions, please contact our support team at{" "}
            {supportEmail}
            <Link href={supportEmail}>support@acme.co.in</Link>.
          </Text>
          <Text style={{ fontSize: '16px' }}>
            Thank you for choosing {appName} Acme.
          </Text>
          <Text style={{ fontSize: '16px' }}>{appName} Acme team</Text>
        </Container>
      </Body>
    </Html>
  );
};
export default EmailConfirmation;
