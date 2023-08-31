import React from "react";
import {
  Head,
  Heading,
  Html,
  Link,
  Text,
  Body,
  Tailwind,
  Container,
  Hr,
} from "@react-email/components";

interface MagicLinkProps{
  appName:string;
  userName:string;
  supportEmail:string;
  magicLink:string;
}

const MagicLink = ({ appName, userName, supportEmail, magicLink }:MagicLinkProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-200 font-light font-sans">
          <Container className="bg-white px-12 py-5 mx-auto">
            <Heading>Magic link from acme {appName}</Heading>
            <Hr className="my-5" />
            <Text className="text-base">Hello John{userName},</Text>
            <Text className="text-base">
              You've requested a magic link to sign into Acme{appName}. Please
              find it below:
            </Text>
            <Link href={magicLink}>Magic Link</Link>
            <Text className="text-base">
              Clicking on this link will instantly log you into your account.
              For your security, please note that this link will expire in 24
              hours, or once you've used it to log in
            </Text>
            <Hr className="my-5" />
            <Text className="text-base">
              If you didn't request this link or if you have any questions,
              please us at <Link href={supportEmail}>support.acme.co.in</Link>
            </Text>
            <Text className="text-base">Enjoy exploring Acme{appName}!</Text>
            <Text className="text-base">{appName}Acme team</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default MagicLink;
