import {
  Head,
  Heading,
  Html,
  Body,
  Tailwind,
  Container,
  Text,
  Button,
  Link,
  Hr,
} from "@react-email/components";
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
      <Tailwind>
        <Body className="bg-gray-200 font-sans font-light">
          <Container className="bg-white px-12 py-5">
            <Heading>
              Your project{projectName} has been approved by {/*approver*/}Bob
            </Heading>
            <Hr className="my-5" />
            <Text className="text-base">Dear {userName}Ronaldo,</Text>
        
              <Text className="text-base">
                The project you submitted for approval to organisation
                {organisationName} has been approved by Bob, their CEO
                {/*positionOfApprover*/} {/*dateOfApproval*/}on 11th July 2023
              </Text>
            
            {/* <Text className="text-base">
              After careful evaluation and review of the submitted proposals,
              your project stood out for several reasons:
            </Text>
            <Text className="text-base">
              1. Lorem ipsum dolor sit, amet consectetur adipisicing elit.{" "}
              <br />
              2. Lorem ipsum dolor sit amet consectetur, adipisicing elit.{" "}
              <br />
              3. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Text> */}
            <Hr className="my-5" />
            {/* <Text className="text-base">
              Your dedication, innovation, and attention to detail showcased
              throughout the project proposal were truly impressive. We are
              confident that your expertise and passion will contribute
              significantly to the success of this collaboration.
            </Text> */}
            <Text className="text-base">
              To move to the next steps, click on the button below
            </Text>
            {/* <Text className="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto praesentium non itaque nihil mollitia dolor dolorem
              velit quae? Mollitia nobis, expedita cum a aliquam cumque placeat
              beatae sint sed est?
            </Text> */}
            <Button
              className="text-base bg-black font-semibold text-white px-10 py-3 rounded"
              href={nextStepGuide}
            >
              Next Steps
            </Button>
            <Hr className="my-5" />
            {/* <Text className="text-base">
              Once again, congratulations on this achievement! We are excited to
              work together and bring your {projectName}project project to life.
            </Text> */}
            <Text className="text-base">
              If you have any questions or need further clarification, please do
              not hesitate to reach out to us at{" "}
              <Link href={organisationMail}>
                organisation@organisation.co.in
              </Link>
            </Text>
            <Text className="text-base">Best regards,</Text>
            <Text className="text-base">
              {senderName}Cris Jefferson
              <br />
              CEO{position}
              <br />
              {organisationName}Organisation
              <br />
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default ProjectApproved;
