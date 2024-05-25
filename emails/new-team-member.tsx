import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from "react";

interface newTeamMemberProps {
  teamLeaderName: string;
  newTeamMemberName: string;
  newMemberProfile: string;
  positionInTeam: string;
  newMember_firstName: string;
  managerEmail: string;
  appName: string;
}

const NewTeamMember = ({
  teamLeaderName,
  newTeamMemberName,
  newMemberProfile,
  positionInTeam,
  newMember_firstName,
  managerEmail,
  appName,
}) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#E5E7EB', fontFamily: 'sans-serif', fontWeight: 300 }}>
        <Container style={{ backgroundColor: 'white', padding: '48px 60px' }}>
          <Heading>New team member</Heading>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>Dear {teamLeaderName},</Text>
          <Text style={{ fontSize: '16px' }}>
            {newTeamMemberName} has joined your team as a {positionInTeam}
          </Text>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>
            Please click the button below to view the entire team
          </Text>
          <Button
            href={newMemberProfile}
            style={{ fontSize: '16px', padding: '12px 40px', backgroundColor: 'black', fontWeight: 600, color: 'white', borderRadius: '4px' }}
          >
            View Profile
          </Button>
          <Text style={{ fontSize: '16px' }}>Acme {appName}</Text>
        </Container>
      </Body>
    </Html>
  );
};
export default NewTeamMember;
