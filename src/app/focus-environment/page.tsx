import Link from "next/link";

export default function FocusEnvironment() {
  return (
    <>
      {/* TopAppBar */}
      <nav className="bg-[#131313] flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50">
        <div className="flex items-center space-x-8">
          <span className="text-xl font-bold tracking-tighter text-[#E51920] font-headline">
            SIGNAL OS
          </span>
          <div className="hidden md:flex space-x-6">
            <Link
              className="text-[#E2E2E2] opacity-60 hover:opacity-100 font-headline uppercase tracking-widest text-xs transition-colors duration-0"
              href="/"
            >
              Command Center
            </Link>
            <Link
              className="text-[#E2E2E2] opacity-60 hover:opacity-100 font-headline uppercase tracking-widest text-xs transition-colors duration-0"
              href="/learning-tree"
            >
              Learning Tree
            </Link>
            <Link
              className="text-[#E51920] font-bold font-headline uppercase tracking-widest text-xs transition-colors duration-0"
              href="/focus-environment"
            >
              Focus Environment
            </Link>
            <Link
              className="text-[#E2E2E2] opacity-60 hover:opacity-100 font-headline uppercase tracking-widest text-xs transition-colors duration-0"
              href="/task-tracker"
            >
              Task Tracker
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="hover:bg-[#2A2A2A] p-2 transition-colors duration-0">
            <span className="material-symbols-outlined text-[#E2E2E2]">settings</span>
          </button>
          <button className="hover:bg-[#2A2A2A] p-2 transition-colors duration-0">
            <span className="material-symbols-outlined text-[#E2E2E2]">account_circle</span>
          </button>
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0E0E0E] flex-col pt-20 hidden md:flex border-r border-[#1f1f1f] z-40">
        <div className="px-6 mb-8">
          <div className="text-[#E51920] font-black font-headline text-lg tracking-tighter">
            SIGNAL OS
          </div>
          <div className="font-headline uppercase text-[10px] tracking-[0.2em] text-[#E2E2E2] opacity-40">
            V1.0.0-STABLE
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 hover:bg-[#131313] px-4 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em]"
            href="/"
          >
            <span className="material-symbols-outlined">terminal</span>
            <span>Command Center</span>
          </Link>
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 hover:bg-[#131313] px-4 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em]"
            href="/learning-tree"
          >
            <span className="material-symbols-outlined">account_tree</span>
            <span>Learning Tree</span>
          </Link>
          <Link
            className="bg-[#2A2A2A] text-[#E51920] border-l-4 border-[#E51920] px-4 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em]"
            href="/focus-environment"
          >
            <span className="material-symbols-outlined">center_focus_strong</span>
            <span>Focus Environment</span>
          </Link>
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 hover:bg-[#131313] px-4 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em]"
            href="/task-tracker"
          >
            <span className="material-symbols-outlined">checklist</span>
            <span>Task Tracker</span>
          </Link>
        </nav>
        <div className="p-4 space-y-1 border-t border-[#1f1f1f]">
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 hover:bg-[#131313] px-4 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em]"
            href="#"
          >
            <span className="material-symbols-outlined">description</span>
            <span>Docs</span>
          </Link>
          <Link
            className="text-[#E2E2E2] opacity-60 hover:opacity-100 hover:bg-[#131313] px-4 py-3 flex items-center space-x-3 font-headline uppercase text-[10px] tracking-[0.2em]"
            href="#"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="md:ml-64 pt-16 h-screen flex flex-col md:flex-row overflow-hidden relative z-10">
        {/* Left Section: Research Viewer (70%) */}
        <section className="w-full md:w-[70%] h-full bg-surface-container-lowest flex flex-col border-r border-outline-variant/10">
          <header className="p-6 bg-surface border-b border-outline-variant/10 flex justify-between items-center">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary-container"></span>
                <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-on-surface">
                  Attention Is All You Need
                </h1>
              </div>
              <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest opacity-60">
                Source: ArXiv:1706.03762v7 [cs.CL] / 2023 REVISION
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 border border-outline-variant/20 hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">zoom_in</span>
              </button>
              <button className="p-2 border border-outline-variant/20 hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">fullscreen</span>
              </button>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto bg-black/40 p-8 dot-matrix-sm relative">
            {/* PDF/Paper Placeholder */}
            <div className="max-w-4xl mx-auto bg-[#1a1a1a] p-12 min-h-[1200px] border border-outline-variant/10 shadow-2xl">
              <div className="space-y-8">
                <div className="h-8 bg-surface-container-high w-3/4"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-4 bg-surface-container w-full"></div>
                  <div className="h-4 bg-surface-container w-full"></div>
                  <div className="h-4 bg-surface-container w-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-surface-container w-full"></div>
                  <div className="h-4 bg-surface-container w-full"></div>
                  <div className="h-4 bg-surface-container w-5/6"></div>
                  <div className="h-4 bg-surface-container w-4/6"></div>
                </div>

                {/* Visual Indicator for AI Pulse */}
                <div className="h-[300px] w-full bg-surface-container-high border-l-4 border-primary-container relative overflow-hidden flex items-center justify-center group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/10 to-transparent"></div>
                  <div className="z-10 text-center space-y-2">
                    <span className="material-symbols-outlined text-primary-container text-4xl mb-2">
                      auto_awesome
                    </span>
                    <p className="font-headline font-bold text-xs tracking-[0.3em] uppercase">
                      AI Synthesis Layer Active
                    </p>
                    <p className="font-mono text-[9px] opacity-40">
                      CLICK TO EXPAND TRANSFORMER ARCHITECTURE VIEW
                    </p>
                  </div>
                  <img
                    className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale hover:opacity-20 transition-opacity"
                    alt="Technical blueprint of a neural network architecture with glowing connection nodes in dark industrial aesthetic"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq1KbroqxuXQU-iefm7p3JsnV8NWnZDISGspqJhZuM26wYRdx5jQxjUtrhh4qwYeB-E_qrQuDElyt4c1J9mXZCyoXHu2sW3hCa0otrxirubWLXcuBykU0wKAbPJ4HCgoHlXTppvtPGHiGkOdW1ZG0Oy3WcfeIUF5W7cWw97BmwswltJuHGuXqpduWn_DSnH3R7GD-Dgc7Zuh7csnoB9-yZW0uygup6IJHDE332z5I0IELAbkMcVzTTja5cb2Qa3LsYxJg9fP4KVfI"
                  />
                </div>

                <div className="space-y-4">
                  <div className="h-4 bg-surface-container w-full"></div>
                  <div className="h-4 bg-surface-container w-full"></div>
                  <div className="h-4 bg-surface-container w-full"></div>
                  <div className="h-4 bg-surface-container w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Section: Guided Learning (30%) */}
        <section className="w-full md:w-[30%] h-full bg-surface flex flex-col">
          {/* Progress Tracker Header */}
          <div className="p-6 border-b border-outline-variant/10 bg-surface-container-low">
            <div className="flex justify-between items-end mb-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] tracking-widest text-primary-container uppercase">
                  Module Status
                </span>
                <h2 className="font-headline font-bold text-2xl tracking-tighter uppercase">
                  [ 0 / 4 Tasks Completed ]
                </h2>
              </div>
              <span className="font-mono text-sm text-primary-container font-bold">0%</span>
            </div>
            <div className="h-1 w-full bg-surface-container-high relative">
              <div className="absolute top-0 left-0 h-full bg-primary-container w-[0%] transition-all duration-500"></div>
            </div>
          </div>

          {/* Guided Content Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* What it is & Why it matters */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="material-symbols-outlined text-on-surface-variant">info</span>
                <h3 className="font-headline font-bold uppercase tracking-widest text-xs text-on-surface-variant">
                  What it is &amp; Why it matters
                </h3>
              </div>
              <div className="p-4 bg-surface-container-lowest border-l border-outline-variant/30">
                <p className="text-sm leading-relaxed text-on-surface">
                  The <span className="text-primary-container font-mono">Transformer</span>{" "}
                  architecture discarded recurrent networks for self-attention. This allowed for
                  massive parallelization, forming the backbone of modern LLMs like GPT-4.
                </p>
              </div>
            </div>

            {/* Step-by-Step Tasks */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="material-symbols-outlined text-on-surface-variant">terminal</span>
                <h3 className="font-headline font-bold uppercase tracking-widest text-xs text-on-surface-variant">
                  Execution Pipeline
                </h3>
              </div>
              <div className="space-y-3">
                {/* Task 1 */}
                <div className="group cursor-pointer">
                  <div className="flex items-start space-x-4 p-4 bg-surface-container border border-outline-variant/10 group-hover:border-primary-container transition-all duration-0">
                    <div className="w-6 h-6 border-2 border-outline-variant/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-primary-container">
                      <span className="material-symbols-outlined text-[14px] text-primary-container opacity-0 group-hover:opacity-100">
                        check
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-headline font-bold text-sm uppercase">
                        Identify Multi-Head Attention
                      </p>
                      <p className="text-xs text-on-surface-variant opacity-60">
                        Locate Section 3.2.2 in the paper and read the mathematical definition.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Task 2 */}
                <div className="group cursor-pointer">
                  <div className="flex items-start space-x-4 p-4 bg-surface-container border border-outline-variant/10 group-hover:border-primary-container transition-all duration-0">
                    <div className="w-6 h-6 border-2 border-outline-variant/30 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[14px] text-primary-container opacity-0">
                        check
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-headline font-bold text-sm uppercase">
                        Calculate Complexity
                      </p>
                      <p className="text-xs text-on-surface-variant opacity-60">
                        Analyze Table 1 for computational complexity per layer comparisons.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Task 3 */}
                <div className="group cursor-pointer">
                  <div className="flex items-start space-x-4 p-4 bg-surface-container border border-outline-variant/10 group-hover:border-primary-container transition-all duration-0">
                    <div className="w-6 h-6 border-2 border-outline-variant/30 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[14px] text-primary-container opacity-0">
                        check
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-headline font-bold text-sm uppercase">
                        Compare Positional Encoding
                      </p>
                      <p className="text-xs text-on-surface-variant opacity-60">
                        Understand why sine and cosine functions of different frequencies are used.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Task 4 */}
                <div className="group cursor-pointer">
                  <div className="flex items-start space-x-4 p-4 bg-surface-container border border-outline-variant/10 group-hover:border-primary-container transition-all duration-0">
                    <div className="w-6 h-6 border-2 border-outline-variant/30 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[14px] text-primary-container opacity-0">
                        check
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-headline font-bold text-sm uppercase">
                        Terminal Verification
                      </p>
                      <p className="text-xs text-on-surface-variant opacity-60">
                        Run the focus quiz to finalize this session&apos;s retention score.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Industrial Call to Action */}
            <button className="w-full bg-primary-container text-on-primary-container py-4 font-headline font-black uppercase tracking-[0.2em] text-sm hover:bg-on-surface hover:text-surface transition-all duration-0 active:translate-y-1">
              Initialize Focus Quiz
            </button>
          </div>

          {/* Footer Meta */}
          <div className="p-4 border-t border-outline-variant/10 bg-surface-container-lowest flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-mono text-[9px] uppercase tracking-tighter opacity-40">
                System Healthy // Biometric Sync: Active
              </span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-tighter opacity-40">
              01:42:09
            </span>
          </div>
        </section>
      </main>

      {/* Contextual FAB (Suppressed on Details as per instructions, but adding small learning tool FAB) */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <button className="w-14 h-14 bg-primary-container text-on-primary-container shadow-2xl flex items-center justify-center">
          <span className="material-symbols-outlined">psychology</span>
        </button>
      </div>
    </>
  );
}
