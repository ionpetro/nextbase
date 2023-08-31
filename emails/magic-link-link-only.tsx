import React from "react";
import {
  Html,
  Head,
  Heading,
  Body,
  Tailwind,
  Container,
  Link,
  Text,
  Hr,
} from "@react-email/components";

interface magicLinkOnlyProps{
  appName:string;
  magicLink:string;
  supportEmail:string;
}

const MagicLinkLinkOnly = ({ appName, magicLink, supportEmail }:magicLinkOnlyProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-200 font-light font-sans">
          <Container className="bg-white px-12 py-5">
            <Heading>Your magic link from acme{appName}</Heading>
            <Hr className="my-5" />
            <Text className="text-base">Greetings,</Text>
            <Text className="text-base">
              Here is the magic link you've requested to sign into Acme{" "}
              {appName}:
            </Text>
            <Link href={magicLink}>Magic Link</Link>
            <Text className="text-base">
              Click on this link to instantly log into your account. Please
              note, for your security, this link will expire in 24 hours or
              after you've used it to log in.
            </Text>
            <Hr className="my-5" />
            <Text className="text-base">
              If this request wasn't made by you, or should you have any
              questions, please contact us at <Link href={supportEmail}>support@acme.co.in</Link>
            </Text>
            <Text className="text-base">Enjoy exploring {appName}Acme!</Text>
            <Text className="text-base">Acme team</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default MagicLinkLinkOnly;
