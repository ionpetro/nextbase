import React from "react";
import {
  Head,
  Heading,
  Body,
  Tailwind,
  Text,
  Html,
  Container,
  Button,
  Hr,
  Link,
} from "@react-email/components";

interface recenLoginProps {
  userName: string;
  appName: string;
  deviceType: string;
  timeOfLogin: Date;
  dayOfLogin: string;
  supportEmail: string;
}

const RecentlyLogedinDevices = ({
  userName,
  appName,
  deviceType,
  timeOfLogin,
  dayOfLogin,
}: recenLoginProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-200 font-sans font-light">
          <Container className="bg-white px-12 py-5 mx-auto">
            <Heading>New login device detected</Heading>
            <Hr className="my-5" />
            <Text className="text-base">Dear John, {userName}</Text>
            <Text className="font-base">
              We noticed a recent login to your Acme {appName} account from a
              new device.
              <br />
              We're sending this email to make sure that was you.
            </Text>

            <Text className=" text-base">
              <>
                <b>Device:</b> Samsung Galaxy M12 {deviceType}
                <br />
                <b>Time:</b> 2:30am {timeOfLogin}
                <br />
                <b>Day:</b> Monday {dayOfLogin}
              </>
            </Text>
            <Hr className="my-5" />
            <Text className=" text-base">
              If this wasn't you, we highly recommend you secure your account
              immediately. You can change your password by clicking the
              following button
            </Text>
            <Button
              className="text-base bg-black font-semibold text-white px-10 py-3 rounded"
              href=""
            >
              Change my Password
            </Button>
            <Hr className="my-5" />
            {/* <Text className="text-base">
              Keeping your account secure is our top priority. If you need
              further assistance, don't hesitate to contact our support team at{" "}
              <Link href={supportEmail}>support@acme.co.in</Link>.
            </Text> */}
            <Text className="text-base">
              Thank you for using {appName} Acme.
            </Text>
            <Text className="text-base">Best Regards,</Text>
            <Text className="text-base">{appName} Acme team</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default RecentlyLogedinDevices;
