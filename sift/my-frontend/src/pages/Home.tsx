import SidebarNav from '../components/SidebarNav';
import MainHero from '../components/MainHero';
import TopNavBar from '../components/TopNavBar';

export default function Home() {
  return (
    <div className="min-h-screen flex text-black bg-white font-sans">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <TopNavBar />
        <div className="flex-1 flex items-center justify-center">
          <MainHero />
        </div>
      </div>
    </div>
  );
}
