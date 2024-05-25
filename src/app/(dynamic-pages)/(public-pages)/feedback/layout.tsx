import { PageHeading } from '@/components/PageHeading';
import { Button } from '@/components/ui/button';
import { GiveFeedbackDialog } from './[feedbackId]/GiveFeedbackDialog';

function FeedbackLayout({ children }) {
  return (
    <section className="w-full h-screen max-h-screen px-4 py-6 ">
      <main className="max-w-[1296px] h-full max-h-[calc(100%-3rem)] mx-auto flex flex-col">
        <div className="flex justify-between items-center">
          <PageHeading
            title="Explore Feedback"
            subTitle="Browse the collection of feedback from your users."
          />
          <GiveFeedbackDialog className='w-fit'>
            <Button variant="secondary">Create Feedback</Button>
          </GiveFeedbackDialog>
        </div>

        <div className="mt-4 w-full h-full max-h-[88vh]">{children}</div>
      </main>
    </section>
  );
}

export default FeedbackLayout;
