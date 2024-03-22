import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import Image from 'next/image';

const MotionImage = motion(Image);

export const TermsOnboardingDialog = ({
  isOpen,
  isLoading,
  onSubmit,
}: {
  isOpen: boolean;
  onSubmit: (accepted: boolean) => void;
  isLoading: boolean;
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <div className="p-1">
            <DialogTitle className="text-lg">🎉 Welcome Aboard!</DialogTitle>
            <DialogDescription className="text-base mt-0">
              Before diving into Nextbase Ultimate starter kit, please take a
              moment to go through our updated Terms of Service.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div data-testid="accept-terms-onboarding">
          <div>
            These terms and conditions govern the use of Nextbase starter kit’s
            products and services.They're designed to ensure a smooth and secure
            experience for you.
          </div>
          <DialogFooter className="mt-6">
            <Dialog data-testid="dialog-terms">
              <DialogTrigger asChild>
                <Button className="w-full" variant="default">
                  View Terms
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold space-y-4">
                    <p>Terms and conditions</p>
                    <p className="font-bold text-foreground text-sm">
                      Last updated : 24th Feb 2024
                    </p>
                  </DialogTitle>
                </DialogHeader>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit(true);
                  }}
                  data-testid="terms-form"
                  className="p-2 space-y-6"
                >
                  <div className="overflow-auto max-h-64 flex flex-col gap-8 py-8 px-4 ring-1 ring-primary-foreground rounded-md ">
                    <p>Terms and conditions</p>
                    <p className="text-sm bg-gray-200 dark:bg-slate-800 p-4 rounded-lg">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      In sed lorem placerat, finibus nulla vitae, molestie
                      ligula. Praesent viverra elit luctus metus sagittis
                      viverra. In eleifend lacus ut eros mattis bibendum in eu
                      dui. Nunc eu diam mauris. Aliquam auctor, nisi et
                      efficitur rutrum, leo nisi fringilla orci, sit amet semper
                      nibh sem vel libero. Ut tempor quam eget lectus consequat,
                      id egestas nisi semper. Aliquam pharetra tincidunt
                      sagittis. Ut nec gravida tortor. Proin vitae dolor magna.
                      Duis sed pulvinar lectus, et volutpat tortor. Vestibulum
                      ante ipsum primis in faucibus orci luctus et ultrices
                      posuere cubilia curae; Sed eu blandit justo. Sed dapibus
                      tempor luctus.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? 'Accepting terms...' : 'Accept Terms'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
