'use client';
import { Email } from '@/components/Auth/Email';
import { EmailConfirmationPendingCard } from '@/components/Auth/EmailConfirmationPendingCard';
import { T } from '@/components/ui/Typography';
import { Card } from '@/components/ui/card';
import { resetPassword } from '@/data/auth/auth';
import { useSAToastMutation } from '@/hooks/useSAToastMutation';
import { useState } from 'react';

export function ForgotPassword() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const magicLinkMutation = useSAToastMutation(
    async (email: string) => {
      return await resetPassword(email);
    },
    {
      loadingMessage: 'Sending password reset link...',
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to send password reset link ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return 'Failed to send password reset link';
        }
      },
      successMessage: 'Password reset link sent!',
      onSuccess: () => {
        setSuccessMessage(
          'A password reset link has been sent to your email!',
        );
      },
    },
  );

  return (
    <>
      {successMessage ? (
        <EmailConfirmationPendingCard
          message={successMessage}
          heading="Reset password link sent"
          type="reset-password"
          resetSuccessMessage={setSuccessMessage}
        />
      ) : (
        <Card className="container h-full grid items-center text-left max-w-lg mx-auto overflow-auto">
          <div className="space-y-4">
            {/* <Auth providers={['twitter']} supabaseClient={supabase} /> */}
            <T.H4>Forgot Password</T.H4>
            <T.P className="text-muted-foreground">
              Enter your email to recieve a Magic Link to reset your password.
            </T.P>

            <Email
              onSubmit={(email) => magicLinkMutation.mutate(email)}
              isLoading={magicLinkMutation.isLoading}
              view="forgot-password"
            />
          </div>
        </Card>
      )}
    </>
  );
}
