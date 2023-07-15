import './layout.css';
import { Header } from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="relative mx-auto max-w-8xl sm:px-2 lg:px-8 xl:px-12 space-x-4 sm:space-x-6 lg:space-x-8 xl:space-x-12">
        <div className="py-8 sm:py-12 lg:py-16 xl:py-20">{children}</div>
      </div>
    </div>
  );
}
