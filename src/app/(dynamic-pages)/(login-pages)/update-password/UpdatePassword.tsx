'use client';
import { Password } from '@/components/Auth/Password';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { updatePasswordAction } from '@/data/user/security';
import { useSAToastMutation } from '@/hooks/useSAToastMutation';
import { useRouter } from 'next/navigation';

export function UpdatePassword() {
  const router = useRouter();
  const updatePasswordMutation = useSAToastMutation(
    async (password: string) => {
      return await updatePasswordAction(password);
    },
    {
      loadingMessage: 'Updating password...',
      successMessage: 'Password updated!',
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to update password ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return 'Failed to update password';
        }
      },
      onSuccess: () => {
        router.push('/auth/callback');
      },
    },
  );

  return (
    <div className="container h-full grid items-center text-left max-w-lg mx-auto overflow-auto">
      <div className="space-y-8 ">
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter your email to recieve a Magic Link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Password
              isLoading={updatePasswordMutation.isLoading}
              onSubmit={(password) => updatePasswordMutation.mutate(password)}
              label="Create your new Password"
              buttonLabel="Confirm Password"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
