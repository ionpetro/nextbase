import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';

interface ConfirmAccountDeletionProps {
  deletionConfirmationLink: string;
  appName: string;
  userName: string;
}

const ConfirmAccountDeletion = ({
  deletionConfirmationLink,
  appName,
  userName,
}: ConfirmAccountDeletionProps) => {
  return (
    <Html>
      <Head />
      <Body className="bg-gray-200 font-sans font-light">
        <Container className="bg-white px-12 py-5 mx-auto">
          <Heading>Confirm Account Deletion</Heading>
          <Hr className="my-5" />
          <Text className="text-base">Dear {userName},</Text>
          <Text className="text-base">
            You have requested to delete your account with {appName}. This
            action is irreversible and will result in the permanent deletion
            of your account and all associated data.
          </Text>
          <Text className="text-base">
            If you did not request this, please ignore this email. Otherwise,
            click the button below to confirm your account deletion:
          </Text>
          <Button
            href={deletionConfirmationLink}
            style={{
              background: '#FF4136',
              color: '#fff',
              borderRadius: '10px 20px',
            }}
          >
            Confirm Account Deletion
          </Button>
          <Text className="text-base mt-5">
            If you have any questions or concerns, please contact our support
            team.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ConfirmAccountDeletion;
