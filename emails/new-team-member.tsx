import React from "react";
import {
  Html,
  Head,
  Heading,
  Body,
  Tailwind,
  Container,
  Text,
  Button,
  Hr,
  Link
} from "@react-email/components";

interface newTeamMemberProps{
  teamLeaderName:string;
  newTeamMemberName:string;
  newMemberProfile:string;
  positionInTeam:string;
  newMember_firstName:string;
  managerEmail:string;
  appName:string;
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
      <Tailwind>
        <Body className="bg-gray-200 font-sans font-light">
          <Container className="bg-white px-12 py-5">
            <Heading>New team member</Heading>
            <Hr className="my-5" />
            <Text className="text-base">Dear{teamLeaderName} Sam W. ,</Text>
            <Text className="text-base">
             Robert has joined your team as a {positionInTeam}senior developer
            </Text>
            <Hr className="my-5" />
            <Text className="text-base ">
              Please click the button below to view the entire team
            </Text>
            
              <Button
                href={newMemberProfile}
                className="text-base px-10 py-3 bg-black font-semibold text-white rounded"
              >
                View Profile
              </Button>
            
            {/* <Text className="text-base">
              If you have any questions or need further information, please
              don't hesitate to reach out. For any specific inquiries related to
              Robert's{newMember_firstName} onboarding or project assignments, we
              encourage you, as the team leader, to contact our manager,
              Clara, at <Link href={managerEmail}>clara@acme.co.in</Link>.
            </Text> */}
            <Text className="text-base">Acme {appName}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NewTeamMember;
