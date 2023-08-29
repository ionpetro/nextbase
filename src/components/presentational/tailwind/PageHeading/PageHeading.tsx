import { Anchor } from '@/components/Anchor';
import { T } from '@/components/ui/Typography';

type PageHeadingProps = {
  title: string;
  subTitle?: string;
  actions?: React.ReactNode;
  titleHref?: string;
};

export function PageHeading({
  title,
  subTitle,
  titleHref,
  actions,
}: PageHeadingProps) {
  const titleElement = <T.H2>{title}</T.H2>;
  const subTitleElement = (
    <T.P className="text-muted-foreground leading-6">{subTitle}</T.P>
  );
  const wrappedTitleElement = titleHref ? (
    <Anchor href={titleHref}>{titleElement}</Anchor>
  ) : (
    <div className="w-[480px]">
      {titleElement}
      {subTitleElement}
    </div>
  );
  return (
    <div className="md:flex md:items-start md:justify-between">
      <div className="min-w-0 flex-1">{wrappedTitleElement}</div>
      <div className="mt-2">{actions}</div>
    </div>
  );
}
