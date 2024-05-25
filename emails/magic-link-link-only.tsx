import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Link } from '@react-email/link';
import { Text } from '@react-email/text';
import React from "react";

interface magicLinkOnlyProps {
  appName: string;
  magicLink: string;
  supportEmail: string;
}

const MagicLinkLinkOnly = ({ appName, magicLink, supportEmail }: magicLinkOnlyProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#E5E7EB', fontWeight: 300, fontFamily: 'sans-serif' }}>
        <Container style={{ backgroundColor: 'white', padding: '48px 60px' }}>
          <Heading>Your magic link from {appName}</Heading>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>Greetings,</Text>
          <Text style={{ fontSize: '16px' }}>
            Here is the magic link you've requested to sign into {appName}:
          </Text>
          <Link href={magicLink}>Magic Link</Link>
          <Text style={{ fontSize: '16px' }}>
            Click on this link to instantly log into your account. Please
            note, for your security, this link will expire in 24 hours or
            after you've used it to log in.
          </Text>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>
            If this request wasn't made by you, or should you have any
            questions, please contact us at <Link href={`mailto:${supportEmail}`}>support@acme.co.in</Link>
          </Text>
          <Text style={{ fontSize: '16px' }}>Enjoy exploring {appName}!</Text>
          <Text style={{ fontSize: '16px' }}>Acme team</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default MagicLinkLinkOnly;
