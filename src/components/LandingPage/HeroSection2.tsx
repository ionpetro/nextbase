import { Button } from '@/components/ui/button';
import { T } from '@/components/ui/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { LucideIcon } from '../LucideIcon';

type HeroSection2Props = {
  title: string;
  description: string;
  image?: string;
};

const HeroSection2 = ({ title, description, image }: HeroSection2Props) => {
  const imageSrc = image ? image : '/mockups/laptop.jpeg';
  return (
    <section className="mx-auto w-full">
      <div className="md:container mx-auto">
        <div className="relative flex flex-col items-center px-4 md:px-4 lg:px-24 w-full">
          <div className="flex flex-col items-center gap-y-6 mb-16 max-w-5xl">
            <div className="flex flex-col md:items-center gap-4 mt-24 w-full">
              <div className="flex items-center gap-x-4 border-gray-300 dark:border-gray-700 shadow-sm mb-2 p-[2px] pr-2 border rounded-xl w-fit group">
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
              <h1 className="max-w-2xl font-semibold text-4xl text-gray-900 sm:text-4xl md:text-5xl md:text-center xl:text-7xl 2xl:text-7xl dark:text-white leading-[44px] md:leading-[60px] xl:leading-[90px] tracking-tighter">
                {title}
              </h1>
            </div>
            <p className="max-w-xl font-normal text-gray-600 text-xl md:text-center md:text-xl dark:text-slate-400 leading-[30px]">
              {description}
            </p>
            <div className="flex md:flex md:flex-row flex-col justify-center items-center gap-y-3 md:gap-x-3 md:mx-auto mt-4 mr-0 w-full">
              <Link href="/login" className="w-full md:w-fit">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full md:w-fit group"
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
              <Link href="/" className="w-full md:w-fit">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-4 w-full md:w-fit group"
                >
                  Learn More
                  <LucideIcon name="ChevronRight" className="ml-2 transition group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:flex lg:col-span-5 mx-4 lg:mt-0 md:px-0 rounded-lg h-[320px] md:h-[640px] overflow-hidden">
          <Image
            src={imageSrc}
            width={1440}
            height={480}
            alt="mockup"
            className="object-center object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection2;
