import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from "react";

const YourRoleInOrganisationChanged = ({
  organisationName,
  organisationMember,
  newRole,
  oldRole,
  roleDescription,
  personIncharge,
  position,
  senderName,
  previousRole,
}) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f0f0f0', fontFamily: 'Arial, sans-serif', fontWeight: 'lighter' }}>
        <Container style={{ backgroundColor: '#ffffff', padding: '48px', maxWidth: '600px', margin: '0 auto' }}>
          <Heading>Your role in the organisation has changed from {previousRole} to {newRole}</Heading>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>Dear {organisationMember},</Text>
          <Text style={{ fontSize: '16px' }}>
            Mr. {personIncharge} has changed your role from {oldRole} to {newRole}.
          </Text>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>
            To see the full details, please click the button below:
          </Text>
          <Button style={{ backgroundColor: '#000000', color: '#ffffff', padding: '12px 20px', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold' }} href={roleDescription}>
            View Role Description
          </Button>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>
            Thank you for your hard work and dedication. We appreciate your commitment to our organization, and we look forward to your continued contributions in your new role.
          </Text>
          <Text style={{ fontSize: '16px' }}>Sincerely,</Text>
          <Text style={{ fontSize: '16px' }}>
            {senderName}
            <br />
            {position}
            <br />
            {organisationName}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default YourRoleInOrganisationChanged;
