import { SiteNavbar } from '@/components/site-navbar';

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SiteNavbar />
    </>
  );
}
