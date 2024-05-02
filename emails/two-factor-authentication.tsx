import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Link } from '@react-email/link';
import { Text } from '@react-email/text';
import React from "react";

interface TwoFactorAuthenticationProps {
  userName: string;
  appName: string;
  supportEmail: string;
}

const TwoFactorAuthentication = ({ userName, appName, supportEmail }: TwoFactorAuthenticationProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f0f0f0', fontFamily: 'Arial, sans-serif', fontWeight: 'lighter' }}>
        <Container style={{ backgroundColor: '#ffffff', padding: '20px', margin: '0 auto', maxWidth: '600px' }}>
          <Heading>Two factor authentication added</Heading>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>Dear {userName},</Text>
          <Text style={{ fontSize: '16px' }}>
            Two-Factor Authentication (2FA) has been enabled on your {appName} account, providing an additional layer of security.
          </Text>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>
            If you did not initiate this change, or if you have any queries, please contact our support team immediately at <Link href={`mailto:${supportEmail}`}>{supportEmail}</Link>.
          </Text>
          <Text style={{ fontSize: '16px' }}>
            Thank you for securing your account with 2FA.
          </Text>
          <Text style={{ fontSize: '16px' }}>{appName} team</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TwoFactorAuthentication;
