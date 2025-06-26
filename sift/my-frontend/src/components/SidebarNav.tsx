const links = ["Scan", "overview", "integrations", "settings"  ];

export default function SidebarNav() {
  return (
    <aside className="w-48 p-6 space-y-4">
      {links.map(link => (
        <a key={link} href="#" className="block text-sm text-gray-400 hover:text-white transition">
          {link}
        </a>
      ))}
    </aside>
  );
}
