import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from "react";

const YourRoleChanged = ({
  appName,
  teamMateName,
  effectiveDate,
  newRole,
  roleDescription,
  senderName,
  keyRoles,
  position,
  oldRole,
}) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f0f0f0', fontFamily: 'Arial, sans-serif', fontWeight: 'lighter' }}>
        <Container style={{ backgroundColor: '#ffffff', padding: '48px', maxWidth: '600px', margin: '0 auto' }}>
          <Heading>Your role has changed from {oldRole} to {newRole}</Heading>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>Dear {teamMateName},</Text>
          <Text style={{ fontSize: '16px' }}>
            Max has changed your role from {oldRole} to {newRole}.
          </Text>
          <Text style={{ fontSize: '16px' }}>
            To see the full details, please click the button below:
          </Text>
          <Button style={{ backgroundColor: '#000000', color: '#ffffff', padding: '12px 20px', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold' }} href={roleDescription}>
            View Role Description
          </Button>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>
            We appreciate your flexibility and dedication throughout this process. Thank you for your continued commitment to our team's success.
          </Text>
          <Text style={{ fontSize: '16px' }}>Best regards,</Text>
          <Text style={{ fontSize: '16px' }}>
            {senderName}
            <br />
            {position}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default YourRoleChanged;
