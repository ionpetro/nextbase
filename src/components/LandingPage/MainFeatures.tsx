'use client';

import { T } from '@/components/ui/Typography';
import { classNames } from '@/utils/classNames';
import { Transition } from '@headlessui/react';
import { Briefcase, Home, User } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const MainFeatures = () => {
  const [tab, setTab] = useState<number>(1);

  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <section className="relative w-full mb-24">
      <div className="relative md:container px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl pb-12 md:pb-16">
            <div className="mb-4 w-fit px-2 py-[2px] border border-neutral-300 bg-neutral-100 rounded-lg shadow-sm">
              <T.Small className="text-neutral-600">
                Main features
              </T.Small>
            </div>
            <h2 className="mb-5 text-4xl leading-[44px]  font-semibold text-foreground">
              Lorem ipsum dolor sit amets
            </h2>
            <p className="text-muted-foreground sm:text-xl sm:leading-[30px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo
            </p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto my-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <a
                  className="flex items-center text-lg rounded transition group duration-300 ease-in-out"
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div
                    className={classNames(
                      'px-6 py-6 max-w-4xl md:max-w-xl rounded-xl transition duration-300 ease-in-out',
                      tab !== 1
                        ? 'group-hover:cursor-pointer'
                        : 'bg-muted',
                    )}
                  >
                    <div className="flex items-center justify-center border border-neutral-300 bg-muted dark:bg-neutral-800 w-10 h-10 rounded-lg mb-4 bg-primary-100 dark:bg-primary-900">
                      <Home className="size-6" />
                    </div>
                    <T.P className="font-semibold text-xl leading-[30px] mb-2">
                      Lorem ipsum dolor sit amet
                    </T.P>
                    <T.P className="text-neutral-600 dark:text-neutral-400 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </T.P>
                  </div>
                </a>
                <a
                  className="flex items-center text-lg rounded transition group duration-300 ease-in-out"
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div
                    className={classNames(
                      'px-6 py-6 max-w-4xl md:max-w-xl rounded-xl transition duration-300 ease-in-out',
                      tab !== 2
                        ? 'group-hover:cursor-pointer'
                        : 'bg-muted',
                    )}
                  >
                    <div className="flex items-center justify-center border border-neutral-300 dark:border-neutral-700 bg-muted dark:bg-neutral-800 w-10 h-10 rounded-lg mb-4 bg-primary-100 dark:bg-primary-900">
                      <User className="size-6" />
                    </div>
                    <T.P className="font-semibold text-xl leading-[30px] mb-2">
                      Lorem ipsum dolor sit amet
                    </T.P>
                    <T.P className="text-neutral-600 dark:text-neutral-400 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </T.P>
                  </div>
                </a>
                <a
                  className="flex items-center text-lg rounded group transition duration-300 ease-in-out"
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(3);
                  }}
                >
                  <div
                    className={classNames(
                      'px-6 py-6 max-w-4xl md:max-w-xl rounded-xl transition duration-300 ease-in-out',
                      tab !== 3
                        ? 'group-hover:cursor-pointer'
                        : 'bg-muted',
                    )}
                  >
                    <div className="flex items-center justify-center border border-neutral-300 dark:border-neutral-700 bg-muted dark:bg-neutral-800 w-10 h-10 rounded-lg mb-4 bg-primary-100 dark:bg-primary-900">
                      <Briefcase className="size-6" />
                    </div>
                    <T.P className="font-semibold text-xl leading-[30px] mb-2">
                      Lorem ipsum dolor sit amet
                    </T.P>
                    <T.P className="text-neutral-600 dark:text-neutral-400 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </T.P>
                  </div>{' '}
                </a>
              </div>
            </div>

            {/* Tabs items */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <div className="transition-all">
                <div
                  className="relative w-full overflow-hidden rounded-xl flex flex-col text-center lg:text-right"
                  data-aos="zoom-y-out"
                  ref={tabs}
                >
                  {/* Item 1 */}
                  <Transition
                    show={tab === 1}
                    appear={true}
                    className="w-full md:w-[640px] h-[256px] md:h-[640px] rounded-lg overflow-hidden"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className=" md:max-w-none mx-auto object-cover "
                        src="/mockups/laptop.jpeg"
                        width={640}
                        height="640"
                        alt="Features bg"
                      />
                    </div>
                  </Transition>

                  {/* Item 2 */}
                  <Transition
                    show={tab === 2}
                    appear={true}
                    className="w-full md:w-[640px] h-[256px] md:h-[640px] rounded-lg overflow-hidden"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className="md:max-w-none mx-auto object-cover "
                        src="/mockups/office.jpeg"
                        width={640}
                        height={640}
                        alt="Features bg"
                      />
                    </div>
                  </Transition>

                  {/* Item 3 */}
                  <Transition
                    show={tab === 3}
                    appear={true}
                    className="w-full md:w-[640px] h-[256px] md:h-[640px] rounded-lg overflow-hidden"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className="md:max-w-none mx-auto object-cover "
                        src="/mockups/laptop.jpeg"
                        width={640}
                        height={640}
                        alt="Features bg"
                      />
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainFeatures;
