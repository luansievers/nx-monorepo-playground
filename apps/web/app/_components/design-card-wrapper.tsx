import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@ui-kit/ui/lib/ui/card';
import { PropsWithChildren } from 'react';

interface Props {
  title: string;
  description: string;
}

export default function DesginCardWrapper({
  title,
  description,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}
