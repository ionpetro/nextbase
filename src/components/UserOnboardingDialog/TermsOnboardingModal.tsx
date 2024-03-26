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
          <DialogTitle className="text-lg">🎉 Welcome Aboard!</DialogTitle>
          <DialogDescription className="space-y-4 text-base">
            <div>
              Before diving into Nextbase Ultimate starter kit, please take a
              moment to go through our updated Terms of Service.
            </div>
            <p className="font-medium">Last updated : 24th Feb 2024</p>
            <div className="text-muted-foreground">
              These terms and conditions govern the use of Nextbase starter
              kit’s products and services.They're designed to ensure a smooth
              and secure experience for you.
            </div>
          </DialogDescription>
        </DialogHeader>
        <div data-testid="accept-terms-onboarding">
          <DialogFooter className="mt-6">
            <Dialog data-testid="dialog-terms">
              <DialogTrigger asChild>
                <Button className="w-full" variant="default">
                  View Terms
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-lg pb-4 space-y-4">
                    <p className="font-medium">Terms and conditions</p>
                    <p className="font-semibold text-muted-foreground text-sm">
                      Last updated : 24th Feb 2024
                    </p>
                  </DialogTitle>
                </DialogHeader>
                <div className="ring-1 ring-foreground/10 rounded-md p-2">
                  <p className="text-muted-foreground">Terms and conditions</p>
                  <div className="overflow-auto max-h-80 flex flex-col gap-8 p-8">
                    <p className="text-sm bg-gray-200 dark:bg-slate-800 p-4 rounded-lg text-foreground/70">
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
                </div>

                <Button
                  type="button"
                  onClick={() => onSubmit(true)}
                  variant="default"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Accepting terms...' : 'Accept Terms'}
                </Button>
              </DialogContent>
            </Dialog>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
