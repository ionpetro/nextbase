import React from 'react';
import {
  Html,
  Head,
  Heading,
  Text,
  Body,
  Container,
  Hr,
  Link,
  Button,
  Tailwind,
} from '@react-email/components';

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
      <Tailwind>
        <Body className="bg-gray-200 font-sans font-light">
          <Container className="bg-white px-12 py-5">
            <Heading>
              Your role has changed from junior developer{oldRole} to senior
              developer{newRole}
            </Heading>
            <Hr className="my-5" />
            <Text className="text-base">Dear Robin{teamMateName},</Text>
            <Text className="text-base">
              Max has changed your role from junior developer{oldRole} to senior
              developer{newRole}
            </Text>
            {/* <Text className="text-base">
              We believe that this change will provide you with new
              opportunities for growth and development. Your contributions are
              highly valued, and we have full confidence in your ability to
              excel in this new role.
            </Text> */}
            <Text className="text-base">
              To see the full details, please click the button below:
            </Text>
            <Button
              className="text-base bg-black font-semibold text-white px-10 py-3 rounded"
              href={roleDescription}
            >
              View Role Description
            </Button>
            <Hr className="my-5" />
            <Text className="text-base">
              We appreciate your flexibility and dedication throughout this
              process. Thank you for your continued commitment to our team's
              success.
            </Text>
            <Text className="text-base">Best regards,</Text>
            <Text className="text-base">
              Max{senderName}
              <br />
              Team Lead{position}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default YourRoleChanged;
