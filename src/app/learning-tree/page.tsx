import Link from "next/link";

export default function LearningTree() {
  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 z-50 flex justify-between items-center w-full px-6 py-4 bg-[#131313] border-none">
        <div className="flex items-center space-x-8">
          <span className="text-xl font-bold tracking-tighter text-[#E51920] font-headline uppercase">
            SIGNAL OS
          </span>
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              className="font-headline uppercase tracking-widest text-xs text-[#E2E2E2] hover:bg-[#2A2A2A] px-2 py-1 transition-colors duration-0"
              href="/"
            >
              Dashboard
            </Link>
            <Link
              className="font-headline uppercase tracking-widest text-xs text-[#E51920] font-bold hover:bg-[#2A2A2A] px-2 py-1 transition-colors duration-0"
              href="#"
            >
              Roadmap
            </Link>
            <Link
              className="font-headline uppercase tracking-widest text-xs text-[#E2E2E2] hover:bg-[#2A2A2A] px-2 py-1 transition-colors duration-0"
              href="#"
            >
              Terminal
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">search</span>
            </span>
            <input
              className="bg-surface-container-high border-none text-xs font-label uppercase tracking-widest pl-10 pr-4 py-2 w-64 focus:ring-1 focus:ring-primary-container"
              placeholder="SEARCH_SYSTEM..."
              type="text"
            />
          </div>
          <button className="p-2 hover:bg-[#2A2A2A] transition-colors duration-0">
            <span className="material-symbols-outlined text-[#E2E2E2]">settings</span>
          </button>
          <button className="p-2 hover:bg-[#2A2A2A] transition-colors duration-0">
            <span className="material-symbols-outlined text-[#E2E2E2]">account_circle</span>
          </button>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0E0E0E] flex flex-col pt-20 border-r border-outline-variant/10 z-40">
        <div className="px-6 py-4 mb-4">
          <div className="text-[#E51920] font-black font-headline text-lg tracking-tighter">
            SIGNAL OS
          </div>
          <div className="font-headline uppercase text-[10px] tracking-[0.2em] text-on-surface-variant">
            V1.0.0-STABLE
          </div>
        </div>
        <nav className="flex-1">
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 px-6 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em] hover:bg-[#131313] transition-colors duration-0"
            href="/"
          >
            <span className="material-symbols-outlined text-sm">terminal</span>
            <span>Command Center</span>
          </Link>
          <Link
            className="bg-[#2A2A2A] text-[#E51920] border-l-4 border-[#E51920] px-6 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em]"
            href="/learning-tree"
          >
            <span className="material-symbols-outlined text-sm">account_tree</span>
            <span>Learning Tree</span>
          </Link>
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 px-6 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em] hover:bg-[#131313] transition-colors duration-0"
            href="/focus-environment"
          >
            <span className="material-symbols-outlined text-sm">center_focus_strong</span>
            <span>Focus Environment</span>
          </Link>
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 px-6 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em] hover:bg-[#131313] transition-colors duration-0"
            href="/task-tracker"
          >
            <span className="material-symbols-outlined text-sm">checklist</span>
            <span>Task Tracker</span>
          </Link>
        </nav>
        <div className="mt-auto border-t border-outline-variant/10 pb-6">
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 px-6 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em] hover:bg-[#131313] transition-colors duration-0"
            href="#"
          >
            <span className="material-symbols-outlined text-sm">description</span>
            <span>Docs</span>
          </Link>
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 px-6 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em] hover:bg-[#131313] transition-colors duration-0"
            href="#"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-24 min-h-screen blueprint-grid relative">
        {/* Floating HUD Element */}
        <div className="fixed top-24 right-8 z-30 bg-surface-container-high border border-outline-variant/20 p-4 w-64 backdrop-blur-xl">
          <div className="font-headline text-[10px] uppercase tracking-widest text-primary-container mb-2 flex justify-between">
            <span>System Status</span>
            <span className="animate-pulse">● LIVE</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[10px] font-label text-on-surface-variant mb-1 uppercase">
                <span>Node Synch</span>
                <span>84%</span>
              </div>
              <div className="h-[2px] w-full bg-surface-container-highest">
                <div className="h-full bg-primary-container" style={{ width: "84%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-label text-on-surface-variant mb-1 uppercase">
                <span>Learning Velocity</span>
                <span>12.4x</span>
              </div>
              <div className="h-[2px] w-full bg-surface-container-highest">
                <div className="h-full bg-primary-container" style={{ width: "65%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-12 pb-20">
          <header className="mb-12 border-l-4 border-primary-container pl-6">
            <h1 className="font-headline text-5xl font-black uppercase tracking-tighter leading-none mb-2">
              Dynamic Learning Tree
            </h1>
            <p className="font-label text-on-surface-variant text-sm tracking-widest uppercase">
              System Path Optimization // V1.0.0
            </p>
          </header>

          {/* Learning Tree Grid Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-outline-variant/20 bg-surface/50 backdrop-blur-sm">
            {/* Category: High Impact */}
            <div className="border-r border-outline-variant/20">
              <div className="bg-surface-container-high p-4 flex items-center justify-between border-b border-outline-variant/20">
                <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary-container">
                  01 // HIGH IMPACT
                </span>
                <span className="material-symbols-outlined text-sm text-primary-container">
                  priority_high
                </span>
              </div>
              <div className="p-6 space-y-8 dot-matrix-bg min-h-[600px]">
                {/* Active Node */}
                <div className="relative group">
                  <div className="absolute -left-6 top-1/2 w-4 h-[1px] bg-primary-container"></div>
                  <div className="bg-surface border-2 border-primary-container p-5 transition-all duration-0 hover:bg-primary-container/5 cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-primary-container text-on-primary-container px-2 py-0.5 text-[9px] font-bold font-label uppercase">
                        ACTIVE_SIGNAL
                      </span>
                      <span className="text-on-surface-variant font-label text-[10px]">
                        ID: 882-RAG
                      </span>
                    </div>
                    <h3 className="font-headline text-lg font-bold leading-tight mb-2 uppercase">
                      Building Local RAG Systems
                    </h3>
                    <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                      Implement private vector database architectures with specialized retrieval
                      pipelines for proprietary data synthesis.
                    </p>
                    <div className="flex gap-2">
                      <span className="border border-outline-variant px-2 py-1 text-[8px] font-label uppercase tracking-tighter">
                        Vector DB
                      </span>
                      <span className="border border-outline-variant px-2 py-1 text-[8px] font-label uppercase tracking-tighter">
                        Python
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dependency Line (Visual Only) */}
                <div className="ml-10 h-12 w-[1px] bg-primary-container/30 relative">
                  <div className="absolute bottom-0 -left-1 w-2 h-2 border-b border-l border-primary-container/30"></div>
                </div>

                {/* Standard Node */}
                <div className="bg-surface-container border border-outline-variant/30 p-5 hover:border-on-surface transition-all duration-0 cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-on-surface-variant font-label text-[10px] uppercase">
                      LOCKED_NODE
                    </span>
                    <span className="material-symbols-outlined text-sm opacity-20 group-hover:opacity-100 transition-opacity">
                      lock
                    </span>
                  </div>
                  <h3 className="font-headline text-lg font-bold leading-tight mb-2 uppercase opacity-60 group-hover:opacity-100">
                    Optimizing LLMs for Algorithmic Trading
                  </h3>
                  <div className="h-1 w-full bg-surface-container-highest mt-4">
                    <div className="h-full bg-primary-container opacity-20" style={{ width: "0%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category: Medium Relevance */}
            <div className="border-r border-outline-variant/20">
              <div className="bg-surface-container-high p-4 flex items-center justify-between border-b border-outline-variant/20">
                <span className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface">
                  02 // MEDIUM RELEVANCE
                </span>
                <span className="material-symbols-outlined text-sm">trending_up</span>
              </div>
              <div className="p-6 space-y-8 min-h-[600px] bg-surface-container-lowest/50">
                {/* Standard Node */}
                <div className="bg-surface border border-outline-variant/30 p-5 hover:border-on-surface transition-all duration-0 cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-on-surface-variant font-label text-[10px] uppercase">
                      SEQUENTIAL_PATH
                    </span>
                    <span className="text-on-surface-variant font-label text-[10px]">
                      ID: 441-SSM
                    </span>
                  </div>
                  <h3 className="font-headline text-lg font-bold leading-tight mb-2 uppercase">
                    State Space Models vs Transformers
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                    Theoretical analysis of linear complexity models and their efficiency in
                    long-context sequences compared to attention mechanisms.
                  </p>
                  <div className="flex gap-2">
                    <span className="border border-outline-variant px-2 py-1 text-[8px] font-label uppercase tracking-tighter">
                      Architecture
                    </span>
                    <span className="border border-outline-variant px-2 py-1 text-[8px] font-label uppercase tracking-tighter">
                      Theory
                    </span>
                  </div>
                </div>

                {/* Info Card / Module */}
                <div className="bg-primary-container/5 border border-primary-container/20 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined text-primary-container text-lg">
                      info
                    </span>
                    <span className="font-headline text-[10px] font-bold uppercase tracking-[0.2em]">
                      Contextual Sync
                    </span>
                  </div>
                  <p className="text-[10px] font-body text-on-surface-variant uppercase leading-tight">
                    These modules are currently deprioritized based on your recent activity in
                    high-frequency trading simulations.
                  </p>
                </div>

                {/* Standard Node */}
                <div className="bg-surface border border-outline-variant/30 p-5 hover:border-on-surface transition-all duration-0 cursor-pointer">
                  <h3 className="font-headline text-lg font-bold leading-tight mb-2 uppercase">
                    Advanced Prompt Engineering
                  </h3>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 bg-surface-container-highest border border-outline-variant"></div>
                      <div className="w-6 h-6 bg-surface-container-highest border border-outline-variant"></div>
                      <div className="w-6 h-6 bg-surface-container-highest border border-outline-variant"></div>
                    </div>
                    <span className="text-[10px] font-label uppercase text-on-surface-variant">
                      14 Participants
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category: Low Relevance */}
            <div>
              <div className="bg-surface-container-high p-4 flex items-center justify-between border-b border-outline-variant/20">
                <span className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  03 // LOW RELEVANCE
                </span>
                <span className="material-symbols-outlined text-sm opacity-50">low_priority</span>
              </div>
              <div className="p-6 space-y-8 min-h-[600px] bg-surface-container-lowest/80 dot-matrix-bg">
                {/* Muted Node */}
                <div className="border border-outline-variant/10 p-5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                  <h3 className="font-headline text-lg font-bold leading-tight mb-2 uppercase">
                    History of Neural Networks
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-4 uppercase tracking-tighter">
                    Archived Theory // Background Context
                  </p>
                </div>

                {/* Muted Node */}
                <div className="border border-outline-variant/10 p-5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                  <h3 className="font-headline text-lg font-bold leading-tight mb-2 uppercase">
                    Basic Data Visualization
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-4 uppercase tracking-tighter">
                    Skipped: Mastery Detected
                  </p>
                </div>

                {/* Dynamic Signal Component */}
                <div className="mt-12 h-32 flex flex-col items-center justify-center border-t border-outline-variant/20 pt-8">
                  <div className="w-full max-w-[120px] h-12 flex items-end gap-1 mb-2">
                    <div className="w-2 bg-primary-container/20 h-4"></div>
                    <div className="w-2 bg-primary-container h-10"></div>
                    <div className="w-2 bg-primary-container/40 h-6"></div>
                    <div className="w-2 bg-primary-container h-8"></div>
                    <div className="w-2 bg-primary-container/10 h-2"></div>
                    <div className="w-2 bg-primary-container/60 h-7"></div>
                  </div>
                  <span className="font-label text-[8px] uppercase tracking-[0.4em] text-primary-container">
                    AI_SIGNAL_PULSE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Global Roadmap Visualizers */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Progress Grid */}
            <div className="bg-surface p-8 border border-outline-variant/20">
              <h2 className="font-headline text-sm font-bold uppercase tracking-widest mb-6 border-b border-outline-variant/10 pb-2">
                Skill Saturation
              </h2>
              <div className="grid grid-cols-5 gap-2">
                {/* Repetitive blocks for industrial feel */}
                <div className="aspect-square bg-primary-container"></div>
                <div className="aspect-square bg-primary-container"></div>
                <div className="aspect-square bg-primary-container"></div>
                <div className="aspect-square bg-primary-container/40"></div>
                <div className="aspect-square bg-surface-container-highest"></div>
                <div className="aspect-square bg-primary-container"></div>
                <div className="aspect-square bg-primary-container/60"></div>
                <div className="aspect-square bg-surface-container-highest"></div>
                <div className="aspect-square bg-surface-container-highest"></div>
                <div className="aspect-square bg-surface-container-highest"></div>
              </div>
            </div>

            {/* Dependency Map Info */}
            <div className="bg-surface-container-high p-8 border border-outline-variant/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-9xl">analytics</span>
              </div>
              <h2 className="font-headline text-sm font-bold uppercase tracking-widest mb-6">
                Optimization Vector
              </h2>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
                System has identified a potential shortcut through the{" "}
                <span className="text-primary-container font-bold">Algorithmic Trading</span>{" "}
                module by leveraging your existing knowledge in{" "}
                <span className="text-on-surface font-bold">Stochastic Calculus</span>.
              </p>
              <button className="w-full bg-primary-container text-on-primary-container font-headline font-bold uppercase py-4 tracking-widest text-xs hover:bg-on-surface hover:text-surface transition-colors duration-0">
                RECALIBRATE TREE
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Meta-Bar */}
      <footer className="ml-64 bg-surface border-t border-outline-variant/10 py-3 px-12 flex justify-between items-center text-[10px] font-label text-on-surface-variant uppercase tracking-widest z-30">
        <div className="flex items-center gap-6">
          <span>LOCAL_TIME: 14:02:22</span>
          <span>LATENCY: 12ms</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-primary-container">SIGNAL_STRENGTH: OPTIMAL</span>
          <span>© SIGNAL OS MMXXIV</span>
        </div>
      </footer>
    </>
  );
}
