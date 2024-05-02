import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from "react";

interface recentLoginProps {
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
}: recentLoginProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#E5E7EB', fontFamily: 'sans-serif', fontWeight: 300 }}>
        <Container style={{ backgroundColor: 'white', padding: '48px', margin: 'auto' }}>
          <Heading>New login device detected</Heading>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>Dear {userName},</Text>
          <Text style={{ fontSize: '16px' }}>
            We noticed a recent login to your {appName} account from a
            new device.
            <br />
            We're sending this email to make sure that was you.
          </Text>

          <Text style={{ fontSize: '16px' }}>
            <>
              <b>Device:</b> {deviceType}
              <br />
              <b>Time:</b> {timeOfLogin.toLocaleTimeString()}
              <br />
              <b>Day:</b> {dayOfLogin}
            </>
          </Text>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>
            If this wasn't you, we highly recommend you secure your account
            immediately. You can change your password by clicking the
            following button
          </Text>
          <Button
            style={{ fontSize: '16px', backgroundColor: 'black', fontWeight: 600, color: 'white', padding: '12px 40px', borderRadius: '4px' }}
            href=""
          >
            Change my Password
          </Button>
          <Hr style={{ margin: '20px 0' }} />
          <Text style={{ fontSize: '16px' }}>
            Thank you for using {appName}.
          </Text>
          <Text style={{ fontSize: '16px' }}>Best Regards,</Text>
          <Text style={{ fontSize: '16px' }}>{appName} team</Text>
        </Container>
      </Body>
    </Html>
  );
};
export default RecentlyLogedinDevices;
