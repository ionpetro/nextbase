import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from "react";

interface WelcomeEmailProps {
  appName: string;
  userName: string;
  purposeOfApp: string;
  makerName: string;
  positionInTeam: string;
  linkToApp: string;
  supportEmail: string;
  socialMediaLinks: string;
}

const WelcomeEmail = ({
  appName,
  userName,
  purposeOfApp,
  makerName,
  positionInTeam,
  linkToApp,
  supportEmail,
  socialMediaLinks,
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f0f0f0', fontFamily: 'Arial, sans-serif', fontWeight: 'lighter' }}>
        <Container style={{ backgroundColor: '#ffffff', padding: '48px', maxWidth: '600px', margin: '0 auto' }}>
          <Heading>Welcome to {appName}</Heading>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>Dear {userName},</Text>
          <Text style={{ fontSize: '16px' }}>Greetings!</Text>
          <Text style={{ fontSize: '16px' }}>
            We're thrilled to welcome you to {appName}. Your account has been successfully created and is ready to use.
          </Text>
          <Text style={{ fontSize: '16px' }}>
            Through {appName}, our goal is to help you {purposeOfApp}.
          </Text>
          <Text style={{ fontSize: '16px' }}>Click the button below to get started:</Text>

          <Button style={{ width: '100%', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#000000', color: '#ffffff', padding: '10px', borderRadius: '5px' }} href={linkToApp}>
            Get Started
          </Button>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>
            Should you need any assistance or further information, feel free to reach out to our support team at <Link href={`mailto:${supportEmail}`}>{supportEmail}</Link> or visit our FAQ section.
          </Text>
          <Text style={{ fontSize: '16px' }}>
            Stay connected with us on our social media platforms for the latest updates: <Link href={socialMediaLinks}>Twitter</Link>, <Link href={socialMediaLinks}>Facebook</Link>.
          </Text>
          <Text style={{ fontSize: '16px' }}>
            Thank you for choosing {appName}. We're excited to have you on board!
          </Text>
          <Text style={{ fontSize: '16px' }}>Best Regards,</Text>
          <Text style={{ fontSize: '16px' }}>{makerName}</Text>
          <Text style={{ fontSize: '16px' }}>{positionInTeam}</Text>
          <Text style={{ fontSize: '16px' }}>{appName} Team</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;
