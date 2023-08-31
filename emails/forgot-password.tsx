import React from "react";
import {
  Head,
  Html,
  Heading,
  Tailwind,
  Hr,
  Body,
  Text,
  Button,
  Container,
} from "@react-email/components";

interface ForgotPasswordProps{
  appName:string;
  userName:string;
}

const ForgotPassword = ({ appName, userName }:ForgotPasswordProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="m-3 bg-gray-200 font-sans font-light">
          <Container className="bg-white px-12 py-5 mx-auto">
            <Heading>
              Password reset request {appName}
            </Heading>
            <Hr className="my-5"/>
            <Text className="text-base">Dear John {userName},</Text>
            <Text className="text-base">
              We received a request to reset the password for your Acme account.
              If you requested this password reset, click on the button below to
              create a new password:
            </Text>
            <Container className="h-9">
              <Button
                href=""
                className="text-base bg-black font-semibold text-white px-10 py-3 rounded"
              >
                Reset password
              </Button>
              <Hr  className="my-5"/>
            </Container>
            <Text className="text-base">
              Please note, this link is valid for 24 hours from the time of
              receipt of this email. If you did not request this change, please
              disregard this email and your password will remain unchanged.
            </Text>
            {/* <Text className="text-base">
              Remember to create a strong and unique password that you don't use
              for other websites or apps to ensure the security of your Acme {appName} account.
            </Text> */}
            <Text className="text-base">
              Thank you for using {appName}Acme.
            </Text>
            <Text className="text-base">Best Regards,</Text>
            <Text className="text-base">{appName}Acme team</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ForgotPassword;
