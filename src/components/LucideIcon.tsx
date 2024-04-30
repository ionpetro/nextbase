import { LucideProps, icons } from 'lucide-react';

export interface LucideIconProps extends LucideProps {
  name: keyof typeof icons;
}

export const LucideIcon = ({ name, ...props }: LucideIconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon {...props} />;
};

