import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from "react";

interface passwordUpdateProps {
  userName: string;
  appName: string;
  supportEmail: string;
  passwordResetLink: string;
  signinPage: string;
}

const PasswordUPdated = ({ userName, appName, signinPage }: passwordUpdateProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#E5E7EB', fontWeight: 300, fontFamily: 'sans-serif' }}>
        <Container style={{ backgroundColor: 'white', padding: '48px 60px' }}>
          <Heading>Your password has been updated</Heading>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>Dear {userName},</Text>
          <Text style={{ fontSize: '16px' }}>
            This email is to confirm that the password for your {appName}
            account has been successfully updated.
          </Text>
          <Text style={{ fontSize: '16px' }}>Please login again to confirm</Text>
          <Button href={signinPage} style={{ fontSize: '16px', backgroundColor: 'black', fontWeight: 600, color: 'white', padding: '12px 40px', borderRadius: '4px' }}>Log In</Button>
          <Hr style={{ margin: '20px 0' }} />
          {/* <Text style={{ fontSize: '16px' }}>
            If you did not request this password change, please secure your
            account immediately by <Link href={passwordResetLink}>resetting your password</Link> or contact our
            support team at <Link href={supportEmail}>support@acme.co.in</Link>.
          </Text> */}
          <Text style={{ fontSize: '16px' }}>
            Thank you for using {appName}.
          </Text>
          <Text>{appName} team</Text>
        </Container>
      </Body>
    </Html>
  );
};
export default PasswordUPdated;
