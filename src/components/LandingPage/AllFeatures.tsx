import { T } from '@/components/ui/Typography';
import { LucideIcon } from '../LucideIcon';

const features = [
  {
    name: 'Lorem Ipsum Dolor',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: <LucideIcon name="File" className="group-hover:-8" />,
  },
  {
    name: 'Sit Amet Consectetur',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    icon: <LucideIcon name="Users" className="group-hover:-8" />,
  },
  {
    name: 'Adipiscing Elit Sed',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    icon: <LucideIcon name="Layers" className="group-hover:-8" />,
  },
  {
    name: 'Eiusmod Tempor Incididunt',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

    icon: <LucideIcon name="Book" className="group-hover:-8" />,
  },
  {
    name: 'Ut Labore et Dolore',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: <LucideIcon name="TrafficCone" className="group-hover:-8" />,
  },
  {
    name: 'Magna Aliqua Ut',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

    icon: <LucideIcon name="FileText" className="group-hover:-8" />,
  },
  {
    name: 'Enim Ad Minim',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    icon: <LucideIcon name="File" className="group-hover:-8" />,
  },
  {
    name: 'Veniam Quis Nostrud',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    icon: <LucideIcon name="Clock3" className="group-hover:-8" />,
  },
  {
    name: 'Exercitation Ullamco',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: <LucideIcon name="CircleDollarSign" className="group-hover:-8" />,
  },
  {
    name: 'Laboris Nisi Ut',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    icon: <LucideIcon name="SmartphoneNfc" className="group-hover:-8" />,
  },
  {
    name: 'Aliquip Ex Ea',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    icon: <LucideIcon name="UserRound" className="group-hover:-8" />,
  },
  {
    name: 'Commodo Consequat',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    icon: <LucideIcon name="ShieldCheck" className="group-hover:-8" />,
  },
  {
    name: 'Duis Aute Irure',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: <LucideIcon name="Undo2" className="group-hover:-8" />,
  },
  {
    name: 'Dolor in Reprehenderit',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    icon: <LucideIcon name="Store" className="group-hover:-8" />,
  },
  {
    name: 'In Voluptate Velit',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    icon: <LucideIcon name="Building" className="group-hover:-8" />,
  },
  {
    name: 'Esse Cillum Dolore',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    icon: <LucideIcon name="HeartHandshake" className="group-hover:-8" />,
  },
  {
    name: 'Eu Fugiat Nulla',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: <LucideIcon name="LineChart" className="group-hover:-8" />,
  },
];

const AllFeatures = () => {
  return (
    <section>
      <div className="mx-auto px-4 md:px-6 lg:px-6 py-8 md:container sm:pb-24">
        <div className="mx-auto mb-8 lg:mb-16 w-full max-w-3xl">
          <div className="flex justify-start md:justify-center items-center w-full">
            <div className="border-gray-300 dark:border-gray-700 bg-muted dark:bg-slate-800 shadow-sm mb-4 px-2 py-[2px] border rounded-lg">
              <T.Small className="text-gray-600 dark:text-slate-400">
                Features
              </T.Small>
            </div>
          </div>
          <h2 className="mb-5 font-semibold text-4xl text-gray-900 md:text-center dark:text-white leading-[44px]">
            Lorem ipsum dolor sit amet
          </h2>
          <p className="text-gray-500 sm:text-xl md:text-center dark:text-slate-400 sm:leading-[30px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="gap-12 md:gap-12 md:space-y-0 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            return (
              <div key={feature.name} className="group">
                <div className="group-hover:bg-gray-50 group-hover:dark:bg-gray-700 flex justify-center items-center border-gray-300 dark:border-slate-700 bg-muted bg-primary-100 dark:bg-slate-800 dark:bg-primary-900 group-hover:shadow-xl border rounded-lg w-12 h-12">
                  {feature.icon}
                </div>
                <T.H3 className="mt-5 mb-2 font-bold text-xl dark:text-slate-50 leading-[30px] tracking-normal">
                  {feature.name}
                </T.H3>
                <T.P className="font-normal text-gray-600 dark:text-slate-400">
                  {feature.description}
                </T.P>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AllFeatures;
