import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from "react";
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
      <Body style={{ backgroundColor: '#E5E7EB', fontWeight: 300, fontFamily: 'sans-serif' }}>
        <Container style={{ backgroundColor: 'white', padding: '48px 60px' }}>
          <Heading>Important Policy update - Action required</Heading>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>Dear {userName},</Text>
          <Text style={{ fontSize: '16px', marginBottom: 0 }}>
            We are writing to inform you about a recent update to our
            {/* organization's policies. These changes reflect our commitment to
            upholding the highest standards of professionalism, compliance,
            and safety. */}
          </Text>
          <Text style={{ fontSize: '16px' }}>
            In summary, the key updates include:
          </Text>
          <Text style={{ fontSize: '16px', marginTop: '8px' }}>
            1. {change1}
            <br />
            2. {change2}
            <br />
            3. {change3}
          </Text>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>
            To access the full updated policy document, please click the
            button below:
          </Text>
          <Button
            style={{ fontSize: '16px', backgroundColor: 'black', fontWeight: 600, color: 'white', padding: '12px 40px', borderRadius: '4px' }}
            href={policyLink}
          >
            Review Policy
          </Button>
          {/* <Text style={{ fontSize: '16px' }}>
            We encourage you to take the time to review the revised policy
            thoroughly. If you have any questions or need further
            clarification, may contact our support team at{" "}
            <Link href={supportEmail}>support@acme.co.in</Link> or reply
            directly to this email.
          </Text> */}
          <Text style={{ fontSize: '16px' }}>
            We appreciate your understanding and cooperation as we continue to
            improve our services to meet your needs.
          </Text>
          <Text style={{ fontSize: '16px' }}>Acme team</Text>
        </Container>
      </Body>
    </Html>
  );
};
export default PolicyUpdate;
