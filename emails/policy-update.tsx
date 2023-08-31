import React from "react";
import {
  Head,
  Heading,
  Html,
  Text,
  Tailwind,
  Container,
  Body,
  Hr,
  Button,
} from "@react-email/components";

interface policyUpdateProps {
  userName: string;
  change1: string;
  change2: string;
  change3: string;
  policyLink: string;
}

const PolicyUpdate = ({
  userName,
  change1,
  change2,
  change3,
  policyLink,
}: policyUpdateProps) => {
  //Map from changes array
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-200 font-light font-sans">
          <Container className="px-12 py-5 font-sans font-light bg-white">
            <Heading> Important Policy update - Action required</Heading>
            <Hr className="my-5" />
            <Text className="text-base">Dear Carl{userName},</Text>
            <Text className="text-base mb-0">
              We are writing to inform you about a recent update to our
              {/* organization's policies. These changes reflect our commitment to
              upholding the highest standards of professionalism, compliance,
              and safety. */}
            </Text>
            <Text className="text-base">
              In summary, the key updates include:
            </Text>
            <Text className="text-base mt-2">
              1. Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
              {change1}
              <br />
              2. Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
              {change2}
              <br />
              3. Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
              {change3}
            </Text>
            <Hr className="my-5" />
            <Text className="text-base">
              To access the full updated policy document, please click the
              button below:
            </Text>
            <Button
              className="text-base bg-black font-semibold text-white px-10 py-3 rounded"
              href={policyLink}
            >
              Review Policy
            </Button>
            {/* <Text className="text-base">
              We encourage you to take the time to review the revised policy
              thoroughly. If you have any questions or need further
              clarification, may contact our support team at{" "}
              <Link href={supportEmail}>support@acme.co.in</Link> or reply
              directly to this email.
            </Text> */}
            <Text className="text-base">
              We appreciate your understanding and cooperation as we continue to
              improve our services to meet your needs.
            </Text>
            <Text className="text-base">Acme team</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PolicyUpdate;
