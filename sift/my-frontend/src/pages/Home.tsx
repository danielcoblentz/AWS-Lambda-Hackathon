import SidebarNav from '../components/SidebarNav';
import MainHero from '../components/MainHero';


export default function Home() {
  return (
    <div className="min-h-screen flex text-black bg-white font-sans">
      <SidebarNav />
      <div className="flex-1 flex flex-col">

        <div className="flex-1 flex items-center justify-center">
          <MainHero />
        </div>
      </div>
    </div>
  );
}
