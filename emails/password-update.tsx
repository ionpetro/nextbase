import React from "react";
import {
  Html,
  Head,
  Text,
  Body,
  Hr,
  Tailwind,
  Heading,
  Container,
  Button,
} from "@react-email/components";

interface passwordUpdateProps{
  userName: string;
    appName: string;
    supportEmail: string;
    passwordResetLink:string;
    signinPage:string;
}

const PasswordUPdated = ({ userName, appName, signinPage }:passwordUpdateProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-200 font-light font-sans">
          <Container className="bg-white px-12 py-5">
            <Heading>Your password has been updated</Heading>
            <Hr className="my-5"/>
            <Text className="text-base">Dear {userName} John,</Text>
            <Text className="text-base">
              This email is to confirm that the password for your {appName} Acme
              account has been successfully updated.
            </Text>
            <Text className="text-base">Please login again to confirm</Text>
            <Button href={signinPage} className="text-base bg-black font-semibold text-white px-10 py-3 rounded">Log In</Button>
            <Hr className="my-5"/>
            {/* <Text className="text-base">
              If you did not request this password change, please secure your
              account immediately by <Link href={passwordResetLink}>resetting your password</Link> or contact our
              support team at <Link href={supportEmail}>support@acme.co.in</Link>.
            </Text> */}
            <Text className="text-base">
            Thank you for using Acme {appName}.
            </Text>
            <Text>{appName}Acme team</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordUPdated;
