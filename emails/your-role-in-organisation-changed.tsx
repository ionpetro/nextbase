import React from "react";
import {
  Head,
  Heading,
  Tailwind,
  Body,
  Html,
  Text,
  Button,
  Hr,
  Container,
} from "@react-email/components";
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
      <Tailwind>
        <Body className="bg-gray-200 font-sans font-light">
          <Container className="bg-white px-12 py-5">
            <Heading>Your role in the organisation has changed from assistant manager{previousRole} to managing director{newRole}</Heading>{" "}
            <Hr className="my-5" />
            <Text className="text-base">Dear Robert{organisationMember},</Text>
            <Text className="text-base">
             Mr. Richard{personIncharge} has changed your role from {oldRole}Assistant manager to {newRole}Managing Director
            </Text>
            {/* <Text className="text-base">
              {keyResponsibilities}Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Voluptate, possimus omnis sapiente.
            </Text> */}
            <Hr className="my-5" />
            <Text className="text-base">
              To see the full details, please click
              the button below:
            </Text>
            <Button
              className="text-base bg-black font-semibold text-white px-10 py-3 rounded"
              href={roleDescription}
            >
              View Role Description
            </Button>
            {/* <Text className="text-base">
              We believe that this change will provide you with exciting
              opportunities to further develop your skills and contribute to our
              team's success. We have full confidence in your ability to excel
              in this new capacity.
            </Text> */}
            {/* <Text className="text-base">
              Should you have any questions or require further information,
              please feel free to contact Mr. X of the management team at{" "}
              <Link href={mailOfX}>x@acme.co.in</Link>. We are here to provide
              support and assist you during this transition.
            </Text> */}
            <Hr className="my-5" />
            <Text className="text-base">
              Thank you for your hard work and dedication. We appreciate your
              commitment to our organization, and we look forward to your
              continued contributions in your new role.
            </Text>
            <Text className="text-base">Sincerely</Text>
            <Text className="text-base">
              Rick{senderName}
              <br />
              CEO{position}
              <br />
              Organisation{organisationName}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default YourRoleInOrganisationChanged;
