import React from "react";
import {
  Head,
  Heading,
  Html,
  Body,
  Text,
  Tailwind,
  Container,
  Button,
  Hr,
} from "@react-email/components";
interface userLeftAReviewProps{
  reviewLink:string;
  appName:string;
  makerName:string;
  nameOfReviewer:string;
  rating:string;
}
const UserLeftAReview = ({
  reviewLink,
  appName,
  makerName,
  nameOfReviewer,
  rating,
}:userLeftAReviewProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-200">
          <Container className="px-12 py-5 font-sans font-light bg-white ">
            <Heading>New review on acme{appName}</Heading>
            <Hr className="my-5"/>
            <Text className="text-base">Dear {makerName}Albert,</Text>
            <Text className="text-base">
              We would like to inform you that a user has recently reviewed your
              app, {appName}Acme.
            </Text>
            <Text className="text-base">
              <b>Reviewer:</b> {nameOfReviewer}Bob Walter
              <br />
              <b>Rating:</b> {rating}⭐️ ⭐️ ⭐️ ⭐️ ⭐️
            </Text>
            <Text className="text-base">
              To view the full review, please click below:
            </Text>
            <Button
              className="text-base bg-black font-semibold text-white px-10 py-3 rounded"
              href={reviewLink}
            >
              View Review
            </Button>
            <Text className="text-base mt-10">
              Thank you for your attention to user feedback.
            </Text>
            <Text className="text-base">Best regards,</Text>
            <Text className="text-base">Company Team</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default UserLeftAReview;
