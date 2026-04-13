import Link from "next/link";

export default function CommandCenter() {
  return (
    <>
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full flex flex-col pt-20 bg-[#0E0E0E] w-64 border-r border-white/5 z-50">
        <div className="px-6 mb-12">
          <h1 className="text-[#E51920] font-black text-xl tracking-tighter">SIGNAL OS</h1>
          <p className="font-headline uppercase text-[10px] tracking-[0.2em] opacity-40">
            V1.0.0-STABLE
          </p>
        </div>
        <nav className="flex-grow">
          {/* Active: Command Center */}
          <Link
            className="bg-[#2A2A2A] text-[#E51920] border-l-4 border-[#E51920] px-6 py-4 flex items-center space-x-3 transition-colors duration-0"
            href="/"
          >
            <span className="material-symbols-outlined">terminal</span>
            <span className="font-headline uppercase text-[10px] tracking-[0.2em]">
              Command Center
            </span>
          </Link>
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 hover:bg-[#131313] px-6 py-4 flex items-center space-x-3 transition-colors duration-0"
            href="/learning-tree"
          >
            <span className="material-symbols-outlined">account_tree</span>
            <span className="font-headline uppercase text-[10px] tracking-[0.2em]">
              Learning Tree
            </span>
          </Link>
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 hover:bg-[#131313] px-6 py-4 flex items-center space-x-3 transition-colors duration-0"
            href="/focus-environment"
          >
            <span className="material-symbols-outlined">center_focus_strong</span>
            <span className="font-headline uppercase text-[10px] tracking-[0.2em]">
              Focus Environment
            </span>
          </Link>
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 hover:bg-[#131313] px-6 py-4 flex items-center space-x-3 transition-colors duration-0"
            href="/task-tracker"
          >
            <span className="material-symbols-outlined">checklist</span>
            <span className="font-headline uppercase text-[10px] tracking-[0.2em]">
              Task Tracker
            </span>
          </Link>
        </nav>
        <div className="mt-auto border-t border-white/5">
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 hover:bg-[#131313] px-6 py-4 flex items-center space-x-3 transition-colors duration-0"
            href="#"
          >
            <span className="material-symbols-outlined">description</span>
            <span className="font-headline uppercase text-[10px] tracking-[0.2em]">Docs</span>
          </Link>
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 hover:bg-[#131313] px-6 py-4 flex items-center space-x-3 transition-colors duration-0"
            href="#"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-headline uppercase text-[10px] tracking-[0.2em]">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Top App Bar */}
      <header className="fixed top-0 left-64 right-0 bg-[#131313] px-8 py-4 flex justify-between items-center z-40">
        <div className="flex items-center space-x-8">
          <span className="font-headline uppercase tracking-widest text-[10px] text-[#E51920] font-bold">
            Session Active
          </span>
          <div className="h-1 w-1 bg-[#E51920] animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex space-x-4">
            <span className="material-symbols-outlined text-[#E2E2E2] hover:bg-[#2A2A2A] p-2 cursor-pointer transition-colors duration-0">
              settings
            </span>
            <span className="material-symbols-outlined text-[#E2E2E2] hover:bg-[#2A2A2A] p-2 cursor-pointer transition-colors duration-0">
              account_circle
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-24 min-h-screen bg-[#000000] relative overflow-hidden">
        {/* Background Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        <div className="max-w-6xl mx-auto px-12 py-12 relative z-10">
          {/* Hero Header Section */}
          <div className="flex flex-col mb-24">
            <span className="text-[#E51920] font-headline text-xs tracking-[0.4em] mb-4 uppercase">
              System Control
            </span>
            <h2 className="text-7xl font-headline font-bold text-on-surface tracking-tighter max-w-2xl uppercase leading-none">
              Initialize Deep <span className="text-white/20">Learning Protocol</span>
            </h2>
          </div>

          {/* Central Action Module */}
          <div className="grid grid-cols-12 gap-0 border border-white/10 bg-[#0E0E0E]">
            {/* Main Action (Large Button) */}
            <div className="col-span-8 p-16 border-r border-white/10 flex flex-col justify-center items-center relative group overflow-hidden">
              <div className="absolute top-4 left-4 font-mono text-[10px] opacity-20 uppercase tracking-widest">
                Action_ID: 0092-X
              </div>
              <button className="bg-primary-container text-on-primary-container px-12 py-6 font-headline font-bold text-2xl uppercase tracking-tighter hover:invert transition-all duration-0 active:scale-95 z-10">
                Run Deep Research
              </button>
              <div className="mt-8 flex flex-col items-center">
                <span className="dot-matrix text-[10px] opacity-40">Last Sync</span>
                <span className="dot-matrix text-lg text-white font-mono mt-1">
                  2024.05.21 // 14:32:05 UTC
                </span>
              </div>
              {/* Subtle Signal Gradient */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-50"></div>
            </div>

            {/* Status Panel */}
            <div className="col-span-4 p-8 flex flex-col justify-between bg-[#131313]">
              <div>
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-2">
                  <span className="font-headline uppercase text-[10px] tracking-widest opacity-50">
                    Signal Status
                  </span>
                  <span className="text-[#E51920] text-[10px] font-bold uppercase">Optimal</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[11px] opacity-40 uppercase">Bandwidth</span>
                    <span className="text-[11px] font-mono">1.2 GB/S</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[11px] opacity-40 uppercase">Nodes</span>
                    <span className="text-[11px] font-mono">14 ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[11px] opacity-40 uppercase">Latency</span>
                    <span className="text-[11px] font-mono">22MS</span>
                  </div>
                </div>
              </div>
              <div className="mt-12 bg-white/5 p-4 border border-white/10">
                <p className="text-[10px] leading-relaxed opacity-60 font-mono italic">
                  &quot;The efficiency of knowledge acquisition is directly proportional to the density
                  of the signal processing environment.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Terminal Mockup Section (Mocked 'Clicked' State) */}
          <div className="mt-12 border border-white/10 bg-[#0E0E0E] p-8 font-mono">
            <div className="flex items-center space-x-2 mb-6 text-[10px] opacity-50 border-b border-white/5 pb-4">
              <span className="material-symbols-outlined text-[14px]">terminal</span>
              <span className="uppercase tracking-[0.2em]">Signal_Process_Log.v.1.1</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex space-x-4">
                <span className="text-[#E51920] opacity-50">[09:21:44]</span>
                <span className="text-white">
                  INIT_SCRAPER :: Connecting to arXiv global repository...
                </span>
              </div>
              <div className="flex space-x-4">
                <span className="text-[#E51920] opacity-50">[09:21:45]</span>
                <span className="text-[#E51920] font-bold">AUTH_SUCCESS</span>
                <span className="text-white/40">
                  :: Handshake completed with Node 01, 04, 07.
                </span>
              </div>
              <div className="flex space-x-4">
                <span className="text-[#E51920] opacity-50">[09:21:47]</span>
                <span className="text-white">
                  FETCH_MODE :: Querying &quot;Quantum Neural Architectures&quot;...
                </span>
              </div>
              <div className="flex space-x-4">
                <span className="text-[#E51920] opacity-50">[09:21:48]</span>
                <span className="text-[#E51920]">AGGREGATING</span>
                <span className="text-white">
                  :: 4,204 papers identified. Filtering by relevance &gt; 0.94...
                </span>
              </div>
              <div className="flex space-x-4">
                <span className="text-[#E51920] opacity-50">[09:21:50]</span>
                <span className="text-white">COMPRESSING :: Vectorizing semantic embeddings...</span>
              </div>
              <div className="pt-4 flex items-center space-x-2 animate-pulse">
                <span className="text-[#E51920]">&gt;</span>
                <span className="w-2 h-4 bg-[#E51920]"></span>
              </div>
            </div>
          </div>

          {/* Bottom Asymmetric Info Grid */}
          <div className="mt-12 grid grid-cols-12 gap-8">
            <div className="col-span-3 border border-white/10 p-6 bg-[#131313]">
              <div className="w-8 h-8 bg-[#E51920] mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">bolt</span>
              </div>
              <h4 className="font-headline font-bold text-xs uppercase tracking-widest mb-2">
                High-Speed Logic
              </h4>
              <p className="text-[10px] opacity-50 leading-relaxed uppercase">
                Real-time synthesis across 400+ technical journals and private data pools.
              </p>
            </div>
            <div className="col-span-6 border border-white/10 p-0 overflow-hidden relative min-h-[200px]">
              <img
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 hover:grayscale-0 transition-all duration-500"
                alt="Abstract visualization of complex data networks with glowing red and white nodes against a dark structural background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzx4u35x9nHct1K43IxRBnD22XkkEe5k4UAOxXCKxiit9eitTgalyyCZrUnoBJKViFABTRwthS4WRtgOqsw7yareGEbJz5c0iyduhMHQt7mAqEQ7OS3GL9DHaVyOTc1U32ybk2J4SHjxjYgQBLFTuGCaJutHCSnYATXROPhfqG-yXiyPXcsdpOIVPvGd0WSZljlxldPx72_SS60WU-Ok1PkJR_svkcVXv0Nm7-ag452mZLwkTVTSlITUz92l8VjDgezWqH0X9f3W4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="text-white font-headline font-bold text-xl uppercase tracking-tighter">
                  Neural Network Visualization
                </span>
              </div>
            </div>
            <div className="col-span-3 border border-white/10 p-6 bg-[#131313]">
              <div className="w-8 h-8 border border-white/20 mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">shield</span>
              </div>
              <h4 className="font-headline font-bold text-xs uppercase tracking-widest mb-2">
                Encrypted Core
              </h4>
              <p className="text-[10px] opacity-50 leading-relaxed uppercase">
                Signal OS operates on an air-gapped architecture for sensitive research data.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
