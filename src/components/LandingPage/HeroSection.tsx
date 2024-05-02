import { T } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { LucideIcon } from '../LucideIcon';

type HeroSectionProps = {
  title: string;
  description: string;
  image?: string;
};

export default function HeroSection({
  title,
  description,
  image,
}: HeroSectionProps) {
  const imageSrc = image ? image : '/mockups/laptop.jpeg';
  return (
    <section className="mt-20">
      <div className="lg:gap-8 xl:gap-0 grid lg:grid-cols-12 mx-auto px-4 md:px-6 md:container">
        <div className="space-y-6 lg:col-span-7 mr-auto mb-16 max-w-2xl place-self-center">
          <div className="flex flex-col justify-start items-start gap-4">
            <div className="flex items-center gap-x-2 md:gap-x-3 border-gray-300 dark:border-gray-700 shadow-sm p-[2px] pr-2 border rounded-xl group">
              <div className="flex items-center border-gray-300 dark:border-gray-700 bg-muted dark:bg-slate-800 shadow-sm px-2 py-[2px] border rounded-lg">
                <T.Small className="text-gray-600 text-xs md:text-sm dark:text-slate-400">
                  What's new?
                </T.Small>
              </div>
              <div className="flex items-center">
                <T.Small className="text-gray-600 text-xs md:text-sm dark:text-slate-400">
                  New Feature now available
                </T.Small>
                <LucideIcon name="ChevronRight" className="w-5 h-5 transition group-hover:translate-x-1" />
              </div>
            </div>
            <h1 className="max-w-2xl font-semibold text-4xl text-gray-900 md:text-5xl xl:text-6xl dark:text-slate-50 leading-[44px] xl:leading-[72px] tracking-tight">
              {title}
            </h1>
          </div>
          <p className="lg:mb-8 max-w-xl font-normal text-gray-600 md:text-lg lg:text-xl dark:text-slate-400">
            {description}
          </p>
          <div className="md:space-x-3 space-y-3">
            <Link href="/login" className="w-full lg:w-fit">
              <Button
                variant="default"
                size="lg"
                className="mt-3 w-full md:w-fit group"
              >
                Log In
                <svg
                  className="-mr-1 ml-2 w-5 h-5 transition group-hover:translate-x-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="mt-3 px-6 w-full md:w-fit group"
              >
                Learn More
                <LucideIcon name="ChevronRight" className="ml-2 transition group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:flex lg:col-span-5 lg:mt-0 rounded-lg md:w-full h-[320px] md:h-[640px] overflow-hidden">
          <Image
            src={imageSrc}
            width={640}
            height={960}
            alt="mockup"
            className="object-center object-cover"
          />
        </div>
      </div>
    </section>
  );
}
