import React from "react";
import {
  Html,
  Head,
  Heading,
  Text,
  Tailwind,
  Hr,
  Container,
  Body,
  Button,
} from "@react-email/components";

interface InvitationToJoinProps {
  nameOfOrganisation: string;
  recipientName: string;
  deadLine: Date;
  senderName:string;
}

const InvitationToJoin = ({
  nameOfOrganisation,
  recipientName,
  
  senderName
}: InvitationToJoinProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-200">
          <Container className="shadow-sm rounded-lg bg-white px-12 py-5 font-light font-sans">
            <Heading>
              {" "}
              Invitation to join organisation{nameOfOrganisation}
            </Heading>
            <Hr className="my-5" />

            <Text className="text-base">Dear {recipientName}James,</Text>
            <Text className="text-base">
              Danial{senderName} has invited you to join {nameOfOrganisation}Organisation
            </Text>
            {/* <Text className="text-base">
              At {nameOfOrganisation}organisation, we are committed to
              {descriptionOfOrganisation} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Your skills and expertise align closely with our
              requirements, and we are confident that you would thrive in our
              dynamic work environment.
            </Text> */}
            <Hr className="my-5" />
            <Text className="text-base">
            
                Click the button below to accept the invitation
            
            </Text>
            <Button
              href="#"
              className="text-base bg-black font-semibold text-white px-10 py-3 rounded"
            >
              Accept Invitation
            </Button>
            {/* <Text className="text-base">
              We look forward to meeting you and discussing the potential of you
              joining our organization. Should you have any questions or require
              further information, please do not hesitate to reach out.
            </Text> */}
            {/* <Text className="text-base">
              Thank you for considering this opportunity. We appreciate your
              interest in organisation{nameOfOrganisation}.
            </Text> */}
            <Text className="text-base">Best regards,</Text>
            <Text className="text-base">
              Richard
              <br />
              CEO
              <br />
              Organisation
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InvitationToJoin;
