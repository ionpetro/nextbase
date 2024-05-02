import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from "react";
interface ProjectRejectedProps {
  projectName: string;
  appMaker: string;
  organisationName: string;
  senderName: string;
  position: string;
  approver: string;
  positionOfApprover: string;
  dateOfRejection: Date;
}
const ProjectRejected = ({
  projectName,
  appMaker,
  organisationName,
  senderName,
  approver,
  positionOfApprover,
  dateOfRejection,
  position,
}: ProjectRejectedProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#E5E7EB', fontFamily: 'sans-serif', fontWeight: 300 }}>
        <Container style={{ backgroundColor: 'white', padding: '48px 60px' }}>
          <Heading>your project has been rejected by Lary{approver}</Heading>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>Dear Smith,{appMaker}</Text>
          <Text style={{ fontSize: '16px' }}>
            The project you submitted for approval to organization
            {organisationName}, has been rejected by their CEO
            {/*positionOfApprover*/}, Lary{/*approver*/}, on 11th July, 2023.
            {/*dateOfRejection*/}
          </Text>
          {/* <Text style={{ fontSize: '16px' }}>
            After careful consideration and thorough evaluation, we regret to
            inform you that your {projectName}project has not been selected
            for further advancement. Our review committee assessed numerous
            proposals, including yours, and unfortunately, we had to make some
            difficult decisions.
          </Text> */}
          <Hr style={{ margin: '20px 0' }} />
          {/* <Text style={{ fontSize: '16px' }}>
            While your proposal showcased {positivesOfProject}Lorem ipsum
            dolor, sit amet consectetur adipisicing elit, it did not align
            closely enough with our organization's current objectives and
            priorities. We had to prioritize projects that were better suited
            to our specific focus areas at this time.
          </Text> */}
          {/* <Text style={{ fontSize: '16px' }}>
            We want to emphasize that the rejection of your {projectName}
            project does not diminish the value of your work and the
            creativity you demonstrated. We encourage you to continue pursuing
            your innovative ideas and exploring other opportunities for
            support and collaboration.
          </Text> */}
          <Text style={{ fontSize: '16px' }}>
            Thank you for your interest in {organisationName}organisation, and
            we appreciate your contribution. We wish you all the best in your
            future endeavors.
          </Text>
          <Text style={{ fontSize: '16px' }}>Sincerely,</Text>
          <Text style={{ fontSize: '16px' }}>
            {senderName}Rebecca
            <br />
            {position}CEO
            <br />
            {organisationName}Organisation
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
export default ProjectRejected;
