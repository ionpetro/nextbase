import { useRef, useState } from 'react';

import { T } from '@/components/ui/Typography';
import { Label } from '@/components/ui/label';
import { getUserAvatarUrl } from '@/utils/helpers';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '../Button';
import { LucideIcon } from '../LucideIcon';
import { PageHeading } from '../PageHeading';
const MotionImage = motion(Image);

export function UpdateAvatarAndNameBody({
  onSubmit,
  isLoading,
  onFileUpload,
  isUploading,
  profileAvatarUrl,
  profileFullname,
  isNewAvatarImageLoading,
  setIsNewAvatarImageLoading,
  userEmail,
  userId
}: {
  profileAvatarUrl: string | undefined;
  isUploading: boolean;
  onSubmit: (fullName: string) => void;
  isLoading: boolean;
  onFileUpload?: (file: File) => void;
  profileFullname: string | undefined;
  isNewAvatarImageLoading: boolean;
  setIsNewAvatarImageLoading: (value: boolean) => void;
  userEmail: string | undefined;
  userId: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState(profileFullname ?? userEmail ?? `User ${userId}`);
  const avatarURL = getUserAvatarUrl({
    profileAvatarUrl,
    email: userEmail,
  });
  return (
    <div className="space-y-6 max-w-sm">
      <PageHeading
        title="Account Settings"
        titleClassName="text-xl"
        subTitleClassName="text-base -mt-1"
        subTitle="Manage your account settings here."
      />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(fullName);
        }}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <T.P>Avatar</T.P>
            <div className="relative m-0 p-0 group">
              <Label
                className="inline m-0 p-0 text-muted-foreground cursor-pointer"
                htmlFor="file-input"
              >
                <MotionImage
                  animate={{
                    opacity: isNewAvatarImageLoading ? [0.5, 1, 0.5] : 1,
                  }}
                  transition={
                    /* eslint-disable */
                    isNewAvatarImageLoading
                      ? {
                        duration: 1,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }
                      : undefined
                    /* eslint-enable */
                  }
                  onLoad={() => {
                    setIsNewAvatarImageLoading(false);
                  }}
                  onError={() => {
                    setIsNewAvatarImageLoading(false);
                  }}
                  loading="eager"
                  width={64}
                  height={64}
                  className="border-2 border-gray-200 rounded-full w-16 h-16 object-center object-cover"
                  src={avatarURL}
                  alt="avatarUrl"
                />
                <input
                  disabled={isUploading}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      onFileUpload?.(file);
                    }
                  }}
                  ref={fileInputRef}
                  type="file"
                  name="file-input"
                  id="file-input"
                  hidden
                  accept="image/*"
                />
                <div className="group-hover:bg-gray-800 right-[calc(100%-64px)] -bottom-[calc(100%-64px)] absolute border-muted-foreground bg-gray-900 p-1 border rounded-full">
                  <LucideIcon name="Camera" className="group-hover:fill-white/30 w-4 h-4 text-white" />
                </div>
              </Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-muted-foreground">
              Name
            </Label>
            <div className="flex space-x-2">
              <input
                disabled={isLoading}
                className="block bg-gray-50/10 dark:bg-gray-800/20 shadow-sm px-3 py-3 border focus:border-blue-500 rounded-md w-full h-10 sm:text-sm appearance-none placeholder-muted-foreground focus:outline-none focus:ring-blue-500"
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                type="text"
                required
              />
            </div>
          </div>
          <div className="flex justify-start space-x-2">
            <Button
              className="w-full"
              variant={'default'}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
