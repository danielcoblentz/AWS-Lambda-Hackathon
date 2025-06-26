import SidebarNav from '../components/SidebarNav';
import MainHero from '../components/MainHero';


export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex">
      <SidebarNav />
      <main className="flex-1 flex flex-col justify-center items-center px-6">
        <MainHero />

      </main>
    </div>
  );
}
