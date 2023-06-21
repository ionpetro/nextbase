export const dynamic = 'force-static';
export const revalidate = 60;
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[1296px] mx-auto py-16">{children}</div>;
}
