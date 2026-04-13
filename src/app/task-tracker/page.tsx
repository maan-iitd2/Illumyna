import Link from "next/link";

export default function TaskTracker() {
  return (
    <div className="bg-surface-container-lowest min-h-screen overflow-x-hidden w-full">
      {/* TopAppBar */}
      <header className="bg-[#131313] dark:bg-[#131313] flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50 rounded-none border-none">
        <div className="flex items-center space-x-8">
          <span className="text-xl font-bold tracking-tighter text-[#E51920] font-headline">
            SIGNAL OS
          </span>
          <nav className="hidden md:flex space-x-6">
            <Link
              className="text-[#E2E2E2] font-headline uppercase tracking-widest text-xs hover:bg-[#2A2A2A] transition-colors duration-0 px-2 py-1"
              href="#"
            >
              Nodes
            </Link>
            <Link
              className="text-[#E51920] font-bold font-headline uppercase tracking-widest text-xs hover:bg-[#2A2A2A] transition-colors duration-0 px-2 py-1"
              href="#"
            >
              Tactical
            </Link>
            <Link
              className="text-[#E2E2E2] font-headline uppercase tracking-widest text-xs hover:bg-[#2A2A2A] transition-colors duration-0 px-2 py-1"
              href="#"
            >
              Secure
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <input
              className="bg-surface-container-low border-b-2 border-outline-variant text-xs font-label uppercase py-1 px-3 focus:outline-none focus:border-primary-container w-48 text-on-surface"
              placeholder="SYSTEM SEARCH..."
              type="text"
            />
          </div>
          <button className="material-symbols-outlined text-on-surface hover:bg-[#2A2A2A] p-2 transition-colors duration-0">
            settings
          </button>
          <button className="material-symbols-outlined text-on-surface hover:bg-[#2A2A2A] p-2 transition-colors duration-0">
            account_circle
          </button>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col pt-20 bg-[#0E0E0E] dark:bg-[#0E0E0E] w-64 rounded-none z-40 border-none transition-all">
        <div className="px-6 mb-8">
          <h2 className="text-[#E51920] font-black font-headline text-lg">SIGNAL OS</h2>
          <p className="font-headline uppercase text-[10px] tracking-[0.2em] text-on-surface opacity-50">
            V1.0.0-STABLE
          </p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 px-6 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em] hover:bg-[#131313] hover:text-[#FFFAFF] transition-colors duration-0"
            href="/"
          >
            <span className="material-symbols-outlined">terminal</span>
            <span>Command Center</span>
          </Link>
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 px-6 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em] hover:bg-[#131313] hover:text-[#FFFAFF] transition-colors duration-0"
            href="/learning-tree"
          >
            <span className="material-symbols-outlined">account_tree</span>
            <span>Learning Tree</span>
          </Link>
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 px-6 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em] hover:bg-[#131313] hover:text-[#FFFAFF] transition-colors duration-0"
            href="/focus-environment"
          >
            <span className="material-symbols-outlined">center_focus_strong</span>
            <span>Focus Environment</span>
          </Link>
          <Link
            className="bg-[#2A2A2A] text-[#E51920] border-l-4 border-[#E51920] px-6 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em]"
            href="/task-tracker"
          >
            <span className="material-symbols-outlined">checklist</span>
            <span>Task Tracker</span>
          </Link>
        </nav>
        <div className="mt-auto pb-8 space-y-1">
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 px-6 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em] hover:bg-[#131313] hover:text-[#FFFAFF]"
            href="#"
          >
            <span className="material-symbols-outlined">description</span>
            <span>Docs</span>
          </Link>
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 px-6 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em] hover:bg-[#131313] hover:text-[#FFFAFF]"
            href="#"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-24 px-8 pb-12">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-on-surface border-opacity-10 pb-6">
          <div>
            <h1 className="text-6xl font-black font-headline tracking-tighter uppercase leading-none">
              Task<br />Tracker
            </h1>
            <p className="mt-4 font-label uppercase text-xs tracking-widest text-primary-container flex items-center">
              <span className="inline-block w-2 h-2 bg-primary-container mr-2 animate-pulse"></span>
              Live System Environment | Active Node 01
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex space-x-4">
            <button className="bg-primary-container text-on-primary-container px-6 py-3 font-label uppercase text-xs font-bold transition-all hover:bg-white hover:text-black">
              Deploy New Task
            </button>
          </div>
        </div>

        {/* Kanban Board / Task Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Column */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="dot-matrix text-[10px] text-on-surface opacity-50 uppercase font-bold tracking-widest">
                State: Pending [01]
              </h3>
              <span className="material-symbols-outlined text-on-surface opacity-30">
                more_horiz
              </span>
            </div>
            <div className="bg-surface p-6 border border-on-surface border-opacity-10 hover:border-opacity-30 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-primary-container text-on-primary-container text-[10px] px-2 py-1 font-label uppercase font-black">
                  Priority: High
                </span>
                <span className="dot-matrix text-[10px] opacity-40">#ID-9921</span>
              </div>
              <h4 className="text-xl font-headline font-bold uppercase tracking-tight mb-2 group-hover:text-primary-container transition-colors">
                Set up local vector DB
              </h4>
              <p className="text-sm font-body text-on-surface opacity-60 leading-relaxed mb-8">
                Initialize Milvus or Weaviate instance with Docker Compose. Configure indexing for
                HNSW.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-on-surface border-opacity-5">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-surface-container-highest border border-on-surface flex items-center justify-center text-[10px] font-bold">
                    U1
                  </div>
                  <div className="w-6 h-6 bg-surface-container-highest border border-on-surface flex items-center justify-center text-[10px] font-bold">
                    AI
                  </div>
                </div>
                <button className="dot-matrix text-[10px] uppercase text-[#E2E2E2] border border-[#E2E2E2] px-3 py-1 hover:bg-[#E2E2E2] hover:text-black transition-all">
                  Transition: Active
                </button>
              </div>
            </div>
          </section>

          {/* Active Column */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="dot-matrix text-[10px] text-primary-container uppercase font-bold tracking-widest">
                State: Active [02]
              </h3>
              <div className="h-[1px] flex-1 bg-primary-container mx-4 opacity-20"></div>
            </div>
            {/* Active Task 1 */}
            <div className="bg-surface-container-high p-6 border border-primary-container transition-all">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-white text-black text-[10px] px-2 py-1 font-label uppercase font-black">
                  Priority: Critical
                </span>
                <div className="flex items-center text-primary-container">
                  <span className="material-symbols-outlined text-sm animate-pulse mr-1">
                    sensors
                  </span>
                  <span className="dot-matrix text-[10px]">PROCESSING...</span>
                </div>
              </div>
              <h4 className="text-xl font-headline font-bold uppercase tracking-tight mb-2">
                Review RAG architectures
              </h4>
              <p className="text-sm font-body text-on-surface opacity-90 leading-relaxed mb-8">
                Evaluating hybrid search strategies and recursive character splitting for improved
                context retrieval.
              </p>
              <div className="w-full bg-surface-container mb-6 h-1">
                <div className="bg-primary-container h-full w-2/3"></div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-on-surface border-opacity-5">
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-xs">schedule</span>
                  <span className="dot-matrix text-[10px] uppercase">4h remaining</span>
                </div>
                <button className="dot-matrix text-[10px] uppercase bg-primary-container text-on-primary-container px-3 py-1 font-bold">
                  Mark Complete
                </button>
              </div>
            </div>
            {/* Active Task 2 */}
            <div className="bg-surface p-6 border border-on-surface border-opacity-10 hover:border-primary-container transition-all">
              <div className="flex justify-between items-start mb-6">
                <span className="border border-on-surface text-on-surface text-[10px] px-2 py-1 font-label uppercase">
                  Priority: Mid
                </span>
                <span className="dot-matrix text-[10px] opacity-40">#ID-8842</span>
              </div>
              <h4 className="text-xl font-headline font-bold uppercase tracking-tight mb-2">
                Benchmarking Mamba vs Transformer
              </h4>
              <p className="text-sm font-body text-on-surface opacity-60 leading-relaxed mb-8">
                Running inference speed tests on SSM architectures vs standard attention mechanisms
                for long context.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-on-surface border-opacity-5">
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-xs">update</span>
                  <span className="dot-matrix text-[10px] uppercase">In Progress</span>
                </div>
                <button className="dot-matrix text-[10px] uppercase text-[#E2E2E2] border border-[#E2E2E2] px-3 py-1 hover:bg-[#E2E2E2] hover:text-black transition-all">
                  Details
                </button>
              </div>
            </div>
          </section>

          {/* Completed Column */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="dot-matrix text-[10px] text-on-surface opacity-30 uppercase font-bold tracking-widest">
                State: Completed [12]
              </h3>
            </div>
            <div className="bg-surface-container-lowest p-6 border border-on-surface border-opacity-5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined text-green-500">check_circle</span>
                <span className="dot-matrix text-[10px]">#ARCH-110</span>
              </div>
              <h4 className="text-xl font-headline font-bold uppercase tracking-tight mb-2 line-through">
                System Initialization
              </h4>
              <p className="text-sm font-body text-on-surface opacity-60 mb-6">
                Base OS kernel compiled and peripheral drivers mapped to local registry.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-on-surface border-opacity-5">
                <span className="dot-matrix text-[10px] uppercase">Finished 12.04.24</span>
                <span className="material-symbols-outlined text-xs">archive</span>
              </div>
            </div>
          </section>
        </div>

        {/* Asymmetric Data Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 bg-surface p-8 border border-on-surface border-opacity-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="text-[120px] font-black font-headline leading-none">OS</span>
            </div>
            <h2 className="text-4xl font-black font-headline uppercase mb-8 border-l-4 border-primary-container pl-6">
              Resource Allocation Matrix
            </h2>
            <div className="space-y-8">
              <div className="flex items-center">
                <span className="dot-matrix text-xs w-32 uppercase opacity-50">Compute: CPU</span>
                <div className="flex-1 h-2 bg-surface-container-low mx-4">
                  <div className="bg-primary-container h-full w-[45%]"></div>
                </div>
                <span className="dot-matrix text-xs w-12 text-right">45%</span>
              </div>
              <div className="flex items-center">
                <span className="dot-matrix text-xs w-32 uppercase opacity-50">Neural Core</span>
                <div className="flex-1 h-2 bg-surface-container-low mx-4">
                  <div className="bg-white h-full w-[82%]"></div>
                </div>
                <span className="dot-matrix text-xs w-12 text-right">82%</span>
              </div>
              <div className="flex items-center">
                <span className="dot-matrix text-xs w-32 uppercase opacity-50">Storage: SSD</span>
                <div className="flex-1 h-2 bg-surface-container-low mx-4">
                  <div className="bg-primary-container h-full w-[12%]"></div>
                </div>
                <span className="dot-matrix text-xs w-12 text-right">12%</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col space-y-8">
            <div className="bg-primary-container p-6 text-on-primary-container">
              <div className="flex items-center mb-4">
                <span className="material-symbols-outlined mr-2">bolt</span>
                <h3 className="font-headline font-bold uppercase tracking-widest text-sm">
                  System Pulse
                </h3>
              </div>
              <p className="font-body text-2xl font-bold leading-tight uppercase">
                Operational throughput is within nominal parameters.
              </p>
            </div>
            <div className="flex-1 border border-on-surface border-opacity-10 p-6 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 border-2 border-dashed border-primary-container animate-spin-slow mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-container">add</span>
              </div>
              <span className="dot-matrix text-[10px] uppercase opacity-40">
                Queue Task Placeholder
              </span>
            </div>
          </div>
        </div>

        {/* Footer / System Info */}
        <footer className="mt-24 border-t border-on-surface border-opacity-10 pt-8 flex flex-col md:flex-row justify-between items-start opacity-30 hover:opacity-100 transition-opacity">
          <div className="max-w-md">
            <p className="font-label text-[10px] uppercase leading-relaxed mb-4">
              SIGNAL OS uses industrial-grade heuristics to prioritize task execution. All
              operations logged under SESSION-ID-X920. Unauthorized access is recorded.
            </p>
          </div>
          <div className="flex space-x-12 mt-6 md:mt-0">
            <div className="flex flex-col">
              <span className="dot-matrix text-[10px] uppercase">Node Status</span>
              <span className="dot-matrix text-[10px] uppercase text-green-500">
                Encrypted / Active
              </span>
            </div>
            <div className="flex flex-col">
              <span className="dot-matrix text-[10px] uppercase">Latency</span>
              <span className="dot-matrix text-[10px] uppercase">0.04ms</span>
            </div>
            <div className="flex flex-col">
              <span className="dot-matrix text-[10px] uppercase">Environment</span>
              <span className="dot-matrix text-[10px] uppercase">Isolated Shell</span>
            </div>
          </div>
        </footer>
      </main>

      {/* FAB (Suppressed on Details/Settings as per Mandate, but active here for task creation) */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-primary-container text-on-primary-container w-16 h-16 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-75">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </div>
  );
}
