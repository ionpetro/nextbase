import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from "react";
interface ForgotPasswordProps {
  appName: string;
  userName: string;
}

const ForgotPassword = ({ appName, userName }: ForgotPasswordProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ margin: '12px', backgroundColor: '#E5E7EB', fontFamily: 'sans-serif', fontWeight: 300 }}>
        <Container style={{ backgroundColor: 'white', padding: '48px 60px', margin: 'auto' }}>
          <Heading>
            Password reset request {appName}
          </Heading>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>Dear John {userName},</Text>
          <Text style={{ fontSize: '16px' }}>
            We received a request to reset the password for your Acme account.
            If you requested this password reset, click on the button below to
            create a new password:
          </Text>
          <Container style={{ height: '36px' }}>
            <Button
              href=""
              style={{ fontSize: '16px', backgroundColor: 'black', fontWeight: 600, color: 'white', padding: '12px 40px', borderRadius: '4px' }}
            >
              Reset password
            </Button>
            <Hr style={{ margin: '20px 0' }} />
          </Container>
          <Text style={{ fontSize: '16px' }}>
            Please note, this link is valid for 24 hours from the time of
            receipt of this email. If you did not request this change, please
            disregard this email and your password will remain unchanged.
          </Text>
          {/* <Text style={{ fontSize: '16px' }}>
              Remember to create a strong and unique password that you don't use
              for other websites or apps to ensure the security of your Acme {appName} account.
            </Text> */}
          <Text style={{ fontSize: '16px' }}>
            Thank you for using {appName}Acme.
          </Text>
          <Text style={{ fontSize: '16px' }}>Best Regards,</Text>
          <Text style={{ fontSize: '16px' }}>{appName}Acme team</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ForgotPassword;
