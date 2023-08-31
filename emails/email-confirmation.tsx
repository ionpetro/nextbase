import React from "react";
import {
  Head,
  Html,
  Heading,
  Text,
  Body,
  Tailwind,
  Hr,
  Button,
  Container,
  Link
} from "@react-email/components";

interface EmailConfirmationProps
  {
    appName:string;
    userName:string;
    supportEmail:string;
  }

const EmailConfirmation = ({ appName, userName, supportEmail }:EmailConfirmationProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-200 font-sans font-light">
          <Container className="bg-white px-12 py-5 mx-auto">
            <Heading>Confirm your email address</Heading>
            <Hr  className="my-5"/>
            <Text className="text-base">Dear {userName} John,</Text>
            <Text className="text-base">
              Thank you for signing up with Acme {appName}.
            </Text>
            {/* <Text className="text-base">
              To ensure the best service and security, we need to verify your
              email address.
            </Text> */}
            <Text className="text-base">
              Click the button below to confirm your email:
            </Text>
            <Button
              href=""
              className="text-base bg-black font-semibold text-white px-10 py-3 rounded"
            >
              Confirm Email
            </Button>
            {/* <Text className="text-base">
            <Hr className=" my-7"/>
              By confirming your email, you ensure that you can receive
              important notifications and account information from us.
            </Text> */}
            <Hr className="my-5"/>
            <Text className="text-base">
              If you didn't sign up for an account with [Your App Name] or if
              you have any questions, please contact our support team at{" "}
              {supportEmail}
              <Link href={supportEmail}>support@acme.co.in</Link>.
            </Text>
            <Text className="text-base">
              Thank you for choosing {appName} Acme.
            </Text>
            <Text className="text-base">{appName} Acme team</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default EmailConfirmation;
