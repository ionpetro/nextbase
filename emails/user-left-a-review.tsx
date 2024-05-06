import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from "react";
interface UserLeftAReviewProps {
  reviewLink: string;
  appName: string;
  makerName: string;
  nameOfReviewer: string;
  rating: string;
}

const UserLeftAReview = ({
  reviewLink,
  appName,
  makerName,
  nameOfReviewer,
  rating,
}: UserLeftAReviewProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f0f0f0', fontFamily: 'Arial, sans-serif', fontWeight: 'lighter' }}>
        <Container style={{ backgroundColor: '#ffffff', padding: '48px', maxWidth: '600px', margin: '0 auto' }}>
          <Heading>New review on {appName}</Heading>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>Dear {makerName},</Text>
          <Text style={{ fontSize: '16px' }}>
            We would like to inform you that a user has recently reviewed your app, {appName}.
          </Text>
          <Text style={{ fontSize: '16px' }}>
            <strong>Reviewer:</strong> {nameOfReviewer}
            <br />
            <strong>Rating:</strong> {rating}
          </Text>
          <Text style={{ fontSize: '16px' }}>
            To view the full review, please click below:
          </Text>
          <Button style={{ backgroundColor: '#000000', color: '#ffffff', padding: '12px 20px', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold' }} href={reviewLink}>
            View Review
          </Button>
          <Text style={{ fontSize: '16px', marginTop: '20px' }}>
            Thank you for your attention to user feedback.
          </Text>
          <Text style={{ fontSize: '16px' }}>Best regards,</Text>
          <Text style={{ fontSize: '16px' }}>The Company Team</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default UserLeftAReview;
