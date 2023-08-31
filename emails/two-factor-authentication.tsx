import React from "react";
import {
  Head,
  Html,
  Heading,
  Text,
  Body,
  Tailwind,
  Hr,
  Container,
  Link,
} from "@react-email/components";

interface twoFactorAuthenticaitonProps {
  userName:string;
  appName:string;
  supportEmail:string;
}

const TwoFactorAuthenticaiton = ({ userName, appName, supportEmail }:twoFactorAuthenticaitonProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-200 font-sans font-light">
          <Container className="bg-white px-12 py-5 mx-auto">
            <Heading>Two factor authentication added</Heading>
            <Hr className="my-5" />
            <Text className="text-base">Dear {userName}John,</Text>
            <Text className="text-base">
              Two-Factor Authentication (2FA) has been enabled on your Acme{" "}
              {appName} account, providing an additional layer of security.
            </Text>
            <Hr className="my-5" />
            <Text className="text-base">
              If you did not initiate this change, or if you have any queries,
              please contact our support team immediately at{" "}
              <Link href={supportEmail}>support@acme.co.in</Link>.
            </Text>
            <Text className="text-base">
              Thank you for securing your account with 2FA.
            </Text>
            <Text className="text-base">{appName} Acme team</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default TwoFactorAuthenticaiton;
