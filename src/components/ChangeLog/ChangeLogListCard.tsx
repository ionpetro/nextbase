import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ReactNode } from 'react';
type ChangeLogListCardProps = {
  date: string;
  title: string;
  children: ReactNode;
};

export default function ChangeLogListCard({
  date,
  title,
  children,
}: ChangeLogListCardProps) {
  return (
    <Card className="rounded-xl shadow-sm w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
