import {
  Html,
  Head,
  Heading,
  Body,
  Button,
  Text,
  Container,
  Tailwind,
  Hr,
  Link,
} from "@react-email/components";
import React from "react";

interface welcomeEmailProps{
  appName:string;
  userName:string;
  purposeOfApp:string;
  makerName:string;
  positionInTeam:string;
  linkToApp:string;
  supportEmail:string;
  socialMediaLinks:string;
}

const WelcomeEmail = ({
  appName,
  userName,
  purposeOfApp,
  makerName,
  positionInTeam,
  linkToApp,
  supportEmail,
  socialMediaLinks,
}:welcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 font-sans font-light">
          <Container className="bg-white py-5 px-12 mx-auto">
            <Heading>Welcome to {appName} acme</Heading>
            <Hr className="my-5" />
            <Text className="text-base">Dear John {userName},</Text>
            <Text className="text-base">Greetings!</Text>
            <Text className="text-base">
              We're thrilled to welcome you to {appName} acme. Your account has
              been successfully created and is ready to use.
            </Text>
            <Text className="text-base">
              Through {appName} acme, our goal is to help you Lorem ipsum dolor
              sit amet consectetur adipisicing elit. {purposeOfApp}.
            </Text>
            <Text className="text-base">Click the button to get stated</Text>

            <Button
              href={linkToApp}
              className=" w-11/12 font-semibold text-center bg-black text-white p-2.5 rounded-lg"
            >
              Get Started
            </Button>
            <Hr className="my-5" />
            <Text className="text-base">
              Should you need any assistance or further information, feel free
              to reach out to our support team at{" "}
              <Link href={supportEmail}>support@acme.co.in</Link> or visit our
              FAQ section.
            </Text>
            <Text className="text-base">
              Stay connected with us on our social media platforms for the
              latest updates: {socialMediaLinks}{" "}
              <Link href={socialMediaLinks}>Twitter</Link>,{" "}
              <Link href={socialMediaLinks}>FaceBook</Link>.
            </Text>
            {/* <Text className="text-base">
              Your opinions matter to us. To share your thoughts and experience
              with acme, please follow this link: [Link to Feedback Form]. We
              appreciate your input and look forward to hearing from you.
            </Text> */}
            <Text className="text-base">
              Thank you for choosing acme. We're excited to have you on board!
            </Text>
            <Text className="text-base">Best Regards,</Text>
            <Text className="mb-0 text-base">Dany{makerName}</Text>
            <Text className="my-0 text-base">CEO {positionInTeam}</Text>
            <Text className="my-0 text-base">Acme {appName}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
