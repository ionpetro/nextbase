import React from 'react';
import {
  Html,
  Head,
  Heading,
  Text,
  Body,
  Tailwind,
  Hr,
  Container,
} from '@react-email/components';
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
      <Tailwind>
        <Body className="bg-gray-200 font-sans font-light">
          <Container className="bg-white px-12 py-5">
            <Heading>your project has been rejected by Lary{approver}</Heading>
            <Hr className="my-5" />
            <Text className="text-base">Dear Smith,{appMaker}</Text>
            <Text className="text-base">
              The project you submitted for approval to organization
              {organisationName}, has been rejected by their CEO
              {/*positionOfApprover*/}, Lary{/*approver*/}, on 11th July, 2023.
              {/*dateOfRejection*/}
            </Text>
            {/* <Text className="text-base">
              After careful consideration and thorough evaluation, we regret to
              inform you that your {projectName}project has not been selected
              for further advancement. Our review committee assessed numerous
              proposals, including yours, and unfortunately, we had to make some
              difficult decisions.
            </Text> */}
            <Hr className="my-5" />
            {/* <Text className="text-base">
              While your proposal showcased {positivesOfProject}Lorem ipsum
              dolor, sit amet consectetur adipisicing elit, it did not align
              closely enough with our organization's current objectives and
              priorities. We had to prioritize projects that were better suited
              to our specific focus areas at this time.
            </Text> */}
            {/* <Text className="text-base">
              We want to emphasize that the rejection of your {projectName}
              project does not diminish the value of your work and the
              creativity you demonstrated. We encourage you to continue pursuing
              your innovative ideas and exploring other opportunities for
              support and collaboration.
            </Text> */}
            <Text className="text-base">
              Thank you for your interest in {organisationName}organisation, and
              we appreciate your contribution. We wish you all the best in your
              future endeavors.
            </Text>
            <Text className="text-base">Sincerely,</Text>
            <Text className="text-base">
              {senderName}Rebecca
              <br />
              {position}CEO
              <br />
              {organisationName}Organisation
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ProjectRejected;
