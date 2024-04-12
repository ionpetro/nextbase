import { PageHeading } from "@/components/PageHeading";

function FeedbackLayout({ children }) {
    return (
        <section className="w-full h-screen max-h-screen px-4 py-6 ">
            <main className="max-w-[1296px] h-full max-h-calc[100%-3rem] mx-auto flex flex-col">
                <PageHeading
                    title="Feedback"
                    subTitle="View all feedback your users have submitted."
                ></PageHeading>
                <div className="mt-4 w-full h-full">
                    {children}
                </div>
            </main>
        </section>
    )
}


export default FeedbackLayout;