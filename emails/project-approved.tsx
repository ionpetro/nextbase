import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Link } from '@react-email/link';
import { Text } from '@react-email/text';
import React from "react";

interface projectApprovedProps {
  userName: string;
  projectName: string;
  organisationName: string;
  senderName: string;
  position: string;
  nextStepGuide: string;
  organisationMail: string;
  approver: string;
  positionOfApprover: string;
  dateOfApproval: Date;
}

const ProjectApproved = ({
  userName,
  projectName,
  organisationName,
  organisationMail,
  senderName,
  position,
  approver,
  nextStepGuide,
  positionOfApprover,
  dateOfApproval,
}: projectApprovedProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#E5E7EB', fontFamily: 'sans-serif', fontWeight: 300 }}>
        <Container style={{ backgroundColor: 'white', padding: '48px 60px' }}>
          <Heading>
            Your project{projectName} has been approved by {/*approver*/}Bob
          </Heading>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>Dear {userName}Ronaldo,</Text>

          <Text style={{ fontSize: '16px' }}>
            The project you submitted for approval to organisation
            {organisationName} has been approved by Bob, their CEO
            {/*positionOfApprover*/} {/*dateOfApproval*/}on 11th July 2023
          </Text>

          {/* <Text style={{ fontSize: '16px' }}>
            After careful evaluation and review of the submitted proposals,
            your project stood out for several reasons:
          </Text>
          <Text style={{ fontSize: '16px' }}>
            1. Lorem ipsum dolor sit, amet consectetur adipisicing elit.{" "}
            <br />
            2. Lorem ipsum dolor sit amet consectetur, adipisicing elit.{" "}
            <br />
            3. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text> */}
          <Hr style={{ margin: '20px 0' }} />
          {/* <Text style={{ fontSize: '16px' }}>
            Your dedication, innovation, and attention to detail showcased
            throughout the project proposal were truly impressive. We are
            confident that your expertise and passion will contribute
            significantly to the success of this collaboration.
          </Text> */}
          <Text style={{ fontSize: '16px' }}>
            To move to the next steps, click on the button below
          </Text>
          {/* <Text style={{ fontSize: '16px' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Architecto praesentium non itaque nihil mollitia dolor dolorem
            velit quae? Mollitia nobis, expedita cum a aliquam cumque placeat
            beatae sint sed est?
          </Text> */}
          <Button
            style={{ fontSize: '16px', backgroundColor: 'black', fontWeight: 600, color: 'white', padding: '12px 40px', borderRadius: '4px' }}
            href={nextStepGuide}
          >
            Next Steps
          </Button>
          <Hr style={{ margin: '20px 0' }} />
          {/* <Text style={{ fontSize: '16px' }}>
            Once again, congratulations on this achievement! We are excited to
            work together and bring your {projectName}project project to life.
          </Text> */}
          <Text style={{ fontSize: '16px' }}>
            If you have any questions or need further clarification, please do
            not hesitate to reach out to us at{" "}
            <Link href={organisationMail}>
              organisation@organisation.co.in
            </Link>
          </Text>
          <Text style={{ fontSize: '16px' }}>Best regards,</Text>
          <Text style={{ fontSize: '16px' }}>
            {senderName}Cris Jefferson
            <br />
            CEO{position}
            <br />
            {organisationName}Organisation
            <br />
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
export default ProjectApproved;
