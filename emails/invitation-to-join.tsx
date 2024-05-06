import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from "react";

interface InvitationToJoinProps {
  nameOfOrganisation: string;
  recipientName: string;
  deadLine: Date;
  senderName: string;
}

const InvitationToJoin = ({
  nameOfOrganisation,
  recipientName,
  senderName
}: InvitationToJoinProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#E5E7EB' }}>
        <Container style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', borderRadius: '0.5rem', backgroundColor: 'white', padding: '48px', fontWeight: 300, fontFamily: 'sans-serif' }}>
          <Heading>
            {" "}
            Invitation to join {nameOfOrganisation}
          </Heading>
          <Hr style={{ margin: '20px 0' }} />

          <Text style={{ fontSize: '16px' }}>Dear {recipientName},</Text>
          <Text style={{ fontSize: '16px' }}>
            {senderName} has invited you to join {nameOfOrganisation}
          </Text>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>
            Click the button below to accept the invitation
          </Text>
          <Button
            href="#"
            style={{ fontSize: '16px', backgroundColor: 'black', fontWeight: 600, color: 'white', padding: '12px 40px', borderRadius: '0.25rem' }}
          >
            Accept Invitation
          </Button>
          <Text style={{ fontSize: '16px' }}>Best regards,</Text>
          <Text style={{ fontSize: '16px' }}>
            Richard
            <br />
            CEO
            <br />
            Organisation
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
export default InvitationToJoin;
