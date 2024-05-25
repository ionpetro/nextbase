import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Link } from '@react-email/link';
import { Text } from '@react-email/text';
import React from "react";

interface MagicLinkProps {
  appName: string;
  userName: string;
  supportEmail: string;
  magicLink: string;
}

const MagicLink = ({ appName, userName, supportEmail, magicLink }: MagicLinkProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#E5E7EB', fontWeight: 300, fontFamily: 'sans-serif' }}>
        <Container style={{ backgroundColor: 'white', padding: '48px 60px', margin: 'auto' }}>
          <Heading>Magic link from acme {appName}</Heading>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>Hello John{userName},</Text>
          <Text style={{ fontSize: '16px' }}>
            You've requested a magic link to sign into Acme{appName}. Please
            find it below:
          </Text>
          <Link href={magicLink}>Magic Link</Link>
          <Text style={{ fontSize: '16px' }}>
            Clicking on this link will instantly log you into your account.
            For your security, please note that this link will expire in 24
            hours, or once you've used it to log in
          </Text>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>
            If you didn't request this link or if you have any questions,
            please us at <Link href={supportEmail}>support.acme.co.in</Link>
          </Text>
          <Text style={{ fontSize: '16px' }}>Enjoy exploring Acme{appName}!</Text>
          <Text style={{ fontSize: '16px' }}>{appName}Acme team</Text>
        </Container>
      </Body>
    </Html>
  );
};
export default MagicLink;
