export default function MainHero() {
  return (
    <section className="text-center max-w-xl w-full">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">What can I help with?</h1>
      
      <input
        type="text"
        placeholder="Compare business strategies for transitioning from budget to luxury"
        className="w-full px-5 py-4 bg-[#2a2a2a] text-white placeholder-gray-400 rounded-xl border border-[#333] mb-6 focus:outline-none"
      />

      <div className="flex flex-wrap gap-3 justify-center">
        {["Search with ChatGPT", "Talk with ChatGPT", "Research", "Sora", "More"].map(label => (
          <button
            key={label}
            className="px-4 py-2 rounded-full border border-gray-600 text-sm hover:bg-white hover:text-black transition"
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
