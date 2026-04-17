# IMPLEMENTATION_PLAN.md — Illumyna

> **Purpose:** Step-by-step build plan for Illumyna, broken into atomic steps each completable in a single Claude chat session.
> **Current State:** Vite + React 19 + TypeScript. All four screens (Home, Task, Knowledge Base, Profile) exist with mock/placeholder data. SideNav works. Dark mode toggle state exists but CSS is unwired.

---

## ✅ RESOLVED DECISIONS

All decisions are locked. Do not deviate from these choices.

| # | Decision | Choice | Reason |
|---|----------|--------|--------|
| D1 | State management | **Zustand** | Minimal boilerplate, built-in persist middleware |
| D2 | Backend | **FastAPI (Python, local only)** | Local-only, no cloud dependency |
| D3 | Database | **JSON files** | Zero setup, offline-first, no cost |
| D4 | Local LLM runtime | **LM Studio REST API** (`http://localhost:1234`) | User has LM Studio with Gemma |
| D5 | PDF viewer | **iframe embed** | No library needed, zero added weight |
| D6 | YouTube embed | **iframe embed** | No library needed, extract video ID only |
| D7 | Dark mode | **CSS variables on `.dark-mode` class** | Already using plain CSS, no Tailwind |

---

## 🏗️ ARCHITECTURE RULES

These constraints apply to every phase and every step:

```
EXTERNAL API (Gemini)
  → Used ONLY for fetching raw research updates
  → Maximum 1 call per 18 hours (enforced by backend cache)
  → On failure: surface the real error to the user — do NOT silently fall back to mock data

LOCAL LLM (LM Studio / Gemma)
  → ALL intelligence runs here: summarization, scoring, recommendations, doubt-solving
  → Zero cost, zero rate limits, works offline

STORAGE
  → JSON files on backend disk only
  → NO Supabase, NO cloud databases, NO external storage services

FRONTEND LIBRARIES
  → No react-pdf, no react-youtube, no heavy embedding libraries
  → Use native iframe for all media embedding
```

---

## PHASE 1 — Design System & CSS Variables

> Goal: Establish a consistent visual token system and wire up dark mode properly.

---

### Step 1.1: Define CSS Custom Properties (Light Mode)

**Goal:**
Establish all design tokens as CSS variables in a single `:root` block.

**What to implement:**
In `src/index.css`, define CSS variables for:
- Background colors (`--bg-primary`, `--bg-secondary`, `--bg-card`)
- Text colors (`--text-primary`, `--text-secondary`, `--text-muted`)
- Border color (`--border`)
- Accent colors (`--accent`, `--accent-hover`)
- Status colors (`--status-learned`, `--status-in-progress`, `--status-recommended`)
- Spacing scale (`--space-xs` through `--space-xl`)
- Border radius (`--radius-sm`, `--radius-md`, `--radius-lg`)
- Font (`--font-body: 'Work Sans', sans-serif`)

**Expected Output:**
No visual change yet — variables defined for use in later steps.

**How to Test:**
Open DevTools → Elements → `:root` — verify all variables are present.

**Dependencies:**
None.

**Next Step:**
Step 1.2 — Dark mode variable overrides.

---

### Step 1.2: Add Dark Mode CSS Variable Overrides

**Goal:**
Define a `.dark-mode` class that overrides all light-mode variables.

**What to implement:**
In `src/index.css`, add a `.dark-mode` block that overrides `--bg-*`, `--text-*`, `--border` variables with dark palette values (deep grays, near-whites for text). No external libraries.

**Expected Output:**
No visual change yet — dark overrides defined.

**How to Test:**
In DevTools, manually add `dark-mode` class to `<div class="app-container">` — page should visually invert to dark palette.

**Dependencies:**
Step 1.1 complete.

**Next Step:**
Step 1.3 — Wire CSS variables throughout existing component CSS files.

---

### Step 1.3: Replace Hardcoded Colors in All CSS Files

**Goal:**
Replace all hardcoded color values in existing CSS files with CSS variable references.

**What to implement:**
Go through `App.css`, `HomeScreen.css`, `TaskScreen.css`, `KnowledgeBaseScreen.css`, `ProfileScreen.css`, `SideNav.css`, `Header.css` and replace every hardcoded hex/rgb/named color with the appropriate `var(--*)` token from Step 1.1.

**Expected Output:**
App visually unchanged in light mode. Dark mode toggle now actually changes colors.

**How to Test:**
Click the sun/moon icon in the header — app should switch between light and dark palettes cleanly.

**Dependencies:**
Steps 1.1, 1.2 complete.

**Next Step:**
Step 1.4 — Add Google Fonts import for Work Sans.

---

### Step 1.4: Add Work Sans Font

**Goal:**
Load Work Sans from Google Fonts and apply it as the base font.

**What to implement:**
Add the Google Fonts `<link>` to `index.html` for Work Sans (weights 400, 500, 600). Set `font-family: var(--font-body)` on `body` in `index.css`.

**Expected Output:**
App text renders in Work Sans.

**How to Test:**
DevTools → Computed → font-family on any text element should show "Work Sans".

**Dependencies:**
Step 1.1 complete.

**Next Step:**
Step 1.5 — Add global animation utilities.

---

### Step 1.5: Add Global Animation Utilities

**Goal:**
Add reusable CSS animation classes used across all screens.

**What to implement:**
In `index.css`, add:
- `.fade-in` — opacity 0 → 1 over 200ms
- `.slide-up` — translateY(12px) → 0 + fade over 250ms
- `.skeleton` — animated shimmer gradient for loading states

**Expected Output:**
Screens fade in on load (`.fade-in` already applied in components).

**How to Test:**
Navigate between screens — each screen should fade in smoothly.

**Dependencies:**
None.

**Next Step:**
Phase 2 — Data Models.

---

## PHASE 2 — Data Models & TypeScript Types

> Goal: Define all shared TypeScript types before building state or UI that depends on them.

---

### Step 2.1: Define Update Type

**Goal:**
Create the TypeScript type for a fetched update item.

**What to implement:**
Create `src/types/update.ts` with:
```
Update {
  id, title, summary, whyItMatters, tags[], difficulty, estimatedMinutes,
  sources[], resources: { papers[], articles[], videos[] }, addedAt, status,
  refinedSummary?, relevanceScore?, recommendation?
}
```
`status`: `'new' | 'dismissed' | 'converted'`
`recommendation`: `'high' | 'medium' | 'low'`

**Expected Output:**
TypeScript file only — no visual change.

**How to Test:**
`npm run build` — no TypeScript errors.

**Dependencies:**
None.

**Next Step:**
Step 2.2 — Task type.

---

### Step 2.2: Define Task Type

**Goal:**
Create the TypeScript type for a learning task.

**What to implement:**
Create `src/types/task.ts` with:
```
Task {
  id, updateId, title, topic, mediaType: 'pdf' | 'youtube' | 'article',
  mediaUrl, progressPercent, notes, status: 'active' | 'completed' | 'paused',
  timeSpentSeconds, createdAt, completedAt?
}
```

**Expected Output:**
TypeScript file only.

**How to Test:**
`npm run build` — no TypeScript errors.

**Dependencies:**
None.

**Next Step:**
Step 2.3 — ChatMessage type.

---

### Step 2.3: Define ChatMessage Type

**Goal:**
Create the TypeScript type for doubt solver chat messages.

**What to implement:**
Create `src/types/chat.ts` with:
```
ChatMessage { id, taskId, text, role: 'user' | 'assistant', timestamp }
```

**Expected Output:**
TypeScript file only.

**How to Test:**
`npm run build` — no TypeScript errors.

**Dependencies:**
None.

**Next Step:**
Step 2.4 — KnowledgeNode type.

---

### Step 2.4: Define KnowledgeNode and KnowledgeEdge Types

**Goal:**
Create TypeScript types for the knowledge graph.

**What to implement:**
Create `src/types/knowledge.ts` with:
```
KnowledgeNode { id, label, status: 'learned' | 'in-progress' | 'recommended', taskId? }
KnowledgeEdge { id, source, target }
```

**Expected Output:**
TypeScript file only.

**How to Test:**
`npm run build` — no TypeScript errors.

**Dependencies:**
None.

**Next Step:**
Step 2.5 — UserProfile type.

---

### Step 2.5: Define UserProfile Type

**Goal:**
Create the TypeScript type for the user profile.

**What to implement:**
Create `src/types/profile.ts` with:
```
UserProfile {
  targetRole, currentLevel: 'Beginner' | 'Intermediate' | 'Advanced',
  interests[], weeklyCommitmentHours, description, generatedPersona?
}
```

**Expected Output:**
TypeScript file only.

**How to Test:**
`npm run build` — no TypeScript errors.

**Dependencies:**
None.

**Next Step:**
Step 2.6 — Barrel export for types.

---

### Step 2.6: Create Types Barrel Export

**Goal:**
Export all types from a single entry point.

**What to implement:**
Create `src/types/index.ts` that re-exports all types from Steps 2.1–2.5.

**Expected Output:**
TypeScript file only.

**How to Test:**
Import `{ Update, Task }` from `'../types'` in any component — no TS errors.

**Dependencies:**
Steps 2.1–2.5 complete.

**Next Step:**
Phase 3 — State Management.

---

## PHASE 3 — State Management (Zustand)

---

### Step 3.1: Install Zustand

**Goal:**
Add Zustand to the project.

**What to implement:**
Run `npm install zustand`. No code changes yet.

**Expected Output:**
`zustand` in `package.json` dependencies.

**How to Test:**
`cat package.json` — zustand present. `npm run dev` — no errors.

**Dependencies:**
None.

**Next Step:**
Step 3.2 — Updates store.

---

### Step 3.2: Create Updates Store

**Goal:**
Create a Zustand store for managing fetched updates.

**What to implement:**
Create `src/store/updatesStore.ts` with state:
- `updates: Update[]`
- `isLoading: boolean`
- `lastFetched: string | null`
- `fetchError: string | null`

Actions:
- `setUpdates(updates, fetchedAt)`
- `dismissUpdate(id)`
- `convertUpdate(id)` — marks as converted
- `setLoading(bool)`
- `setFetchError(message | null)`

Seed with 4 mock `Update` objects matching the type from Step 2.1.

**Expected Output:**
Store file only.

**How to Test:**
Import and use in a temporary console.log — verify store initializes with 4 mock updates.

**Dependencies:**
Steps 2.1, 3.1 complete.

**Next Step:**
Step 3.3 — Tasks store.

---

### Step 3.3: Create Tasks Store

**Goal:**
Create a Zustand store for managing learning tasks.

**What to implement:**
Create `src/store/tasksStore.ts` with state:
- `tasks: Task[]`
- `activeTaskId: string | null`

Actions:
- `addTask(task)`
- `setActiveTask(id)`
- `updateProgress(id, percent)`
- `addTimeSpent(id, seconds)`
- `completeTask(id)`

Seed with 2 mock `Task` objects.

**Expected Output:**
Store file only.

**How to Test:**
`npm run build` — no errors.

**Dependencies:**
Steps 2.2, 3.1 complete.

**Next Step:**
Step 3.4 — Chat store.

---

### Step 3.4: Create Chat Store

**Goal:**
Create a Zustand store for doubt solver chat history per task.

**What to implement:**
Create `src/store/chatStore.ts` with state:
- `messagesByTaskId: Record<string, ChatMessage[]>`

Actions:
- `addMessage(taskId, message)`
- `clearChat(taskId)`

**Expected Output:**
Store file only.

**How to Test:**
`npm run build` — no errors.

**Dependencies:**
Steps 2.3, 3.1 complete.

**Next Step:**
Step 3.5 — Profile store.

---

### Step 3.5: Create Profile Store

**Goal:**
Create a Zustand store for the user profile with localStorage persistence.

**What to implement:**
Create `src/store/profileStore.ts` using Zustand's `persist` middleware. State: `profile: UserProfile`. Action: `updateProfile(partial)`. Default values pre-filled.

**Expected Output:**
Store file only. Profile persists across page refreshes.

**How to Test:**
Change a field in Profile screen (after wiring in Phase 8), refresh — value persists.

**Dependencies:**
Steps 2.5, 3.1 complete.

**Next Step:**
Step 3.6 — Knowledge store.

---

### Step 3.6: Create Knowledge Store

**Goal:**
Create a Zustand store for the knowledge graph data.

**What to implement:**
Create `src/store/knowledgeStore.ts` with state:
- `nodes: KnowledgeNode[]`
- `edges: KnowledgeEdge[]`

Actions:
- `addNode(node)`
- `updateNodeStatus(id, status)`

Seed with the 5 mock nodes from the existing `KnowledgeBaseScreen`.

**Expected Output:**
Store file only.

**How to Test:**
`npm run build` — no errors.

**Dependencies:**
Steps 2.4, 3.1 complete.

**Next Step:**
Phase 4 — Home Screen wiring.

---

## PHASE 4 — Home Screen (Real Structure)

> Goal: Replace lorem ipsum placeholder cards with real typed Update card components.

---

### Step 4.1: Build UpdateCard Component

**Goal:**
Create a reusable `UpdateCard` component that renders one `Update` object.

**What to implement:**
Create `src/components/UpdateCard.tsx` that accepts `update: Update` prop and renders:
- Title (bold)
- Summary text (2–3 lines, CSS line-clamp)
- Tags as small pills
- Difficulty badge
- Estimated time
- "Why it matters" line in italic
- Dismiss / Add to Tasks buttons

Create `src/components/UpdateCard.css` with card styles using CSS variables only.

**Expected Output:**
Component file ready. Not yet used anywhere.

**How to Test:**
Import into `HomeScreen` and render one card with a hardcoded `Update` object — verify it displays correctly.

**Dependencies:**
Steps 2.1, 1.1 complete.

**Next Step:**
Step 4.2 — Wire updates store to HomeScreen.

---

### Step 4.2: Wire Updates Store to HomeScreen

**Goal:**
Replace the 4 hardcoded lorem ipsum cards in HomeScreen with real `UpdateCard` components driven by the updates store.

**What to implement:**
In `HomeScreen.tsx`:
- Import `useUpdatesStore`
- Replace the `.map((item) => ...)` block with `updates.map((update) => <UpdateCard ... />)`
- Pass `onDismiss` and `onAddToTasks` callbacks that call store actions

**Expected Output:**
Home screen renders 4 mock update cards with real content (titles, tags, etc.).

**How to Test:**
Open Home screen — 4 cards with real mock titles/tags/summaries appear. Dismiss button removes a card.

**Dependencies:**
Steps 3.2, 4.1 complete.

**Next Step:**
Step 4.3 — Progress cards wired to tasks store.

---

### Step 4.3: Wire Progress Cards to Tasks Store

**Goal:**
Replace the hardcoded "Prev Task 1 / Prev Task 2" progress cards with real task data.

**What to implement:**
In `HomeScreen.tsx`:
- Import `useTasksStore`
- Replace static progress card JSX with a `.map()` over `tasks` (show max 3)
- Each card shows task title + real `progressPercent` on the bar
- Clicking a card navigates to `/task` and sets `activeTaskId`

**Expected Output:**
Progress section shows real task names and accurate progress bars from mock data.

**How to Test:**
Progress bars reflect the `progressPercent` values from the mock tasks in the store.

**Dependencies:**
Steps 3.3, 4.2 complete.

**Next Step:**
Step 4.4 — Fetch Updates button loading state.

---

### Step 4.4: Add Loading State to Fetch Updates Button

**Goal:**
Show a spinner/loading state on the "Fetch Updates" button while fetching.

**What to implement:**
In `HomeScreen.tsx`:
- Read `isLoading` from updates store
- When `isLoading` is true: disable button, show CSS spinner animation, change label to "Fetching..."
- When false: show normal state

No external spinner libraries — implement spinner with CSS `@keyframes` only.

**Expected Output:**
Button visually indicates loading.

**How to Test:**
Temporarily call `setLoading(true)` on mount — button shows spinner. Reset to false — button returns to normal.

**Dependencies:**
Steps 3.2, 4.2 complete.

**Next Step:**
Phase 5 — Task Screen wiring.

---

## PHASE 5 — Task Screen (Real Structure)

---

### Step 5.1: Wire Active Task to TaskScreen Header

**Goal:**
Show the real active task title and metadata in the Task screen header instead of hardcoded "Task 1".

**What to implement:**
In `TaskScreen.tsx`:
- Import `useTasksStore`
- Read `activeTaskId` and find the matching task
- Display the task's `title` in the header
- Show topic tag and estimated time below the title
- If no active task: show a placeholder state ("No active task — go to Home to pick one")

**Expected Output:**
Task screen header shows real task title from mock data.

**How to Test:**
Navigate to `/task` — header shows the mock active task's title.

**Dependencies:**
Step 3.3 complete.

**Next Step:**
Step 5.2 — Task progress bar.

---

### Step 5.2: Add Task Progress Bar to TaskScreen

**Goal:**
Show a progress bar below the task header indicating completion percentage.

**What to implement:**
In `TaskScreen.tsx`, add a thin progress bar beneath the task title showing `task.progressPercent`. Add a "Mark Complete" button that calls `completeTask(id)`.

**Expected Output:**
Progress bar visible at top of task content area. "Mark Complete" button present.

**How to Test:**
Progress bar fills to the mock task's `progressPercent`. Clicking "Mark Complete" updates the store.

**Dependencies:**
Step 5.1 complete.

**Next Step:**
Step 5.3 — Wire chat store to doubt solver.

---

### Step 5.3: Wire Chat Store to Doubt Solver

**Goal:**
Replace local `useState` for messages with the chat store, scoped to the active task.

**What to implement:**
In `TaskScreen.tsx`:
- Remove local `messages` state
- Read `messagesByTaskId[activeTaskId]` from chat store
- On send: call `addMessage(taskId, newMessage)` on the store
- Keep mock AI response `setTimeout` logic unchanged for now

**Expected Output:**
Chat messages persist when navigating away and back to the task screen.

**How to Test:**
Send a message → navigate to Home → return to Task → messages are still there.

**Dependencies:**
Steps 3.4, 5.1 complete.

**Next Step:**
Step 5.4 — Convert Update to Task flow.

---

### Step 5.4: Implement "Add to Tasks" Flow

**Goal:**
Clicking "Add to Tasks" on an UpdateCard creates a new Task and sets it as active.

**What to implement:**
In the `onAddToTasks` callback (wired in Step 4.2):
- Create a new `Task` object from the `Update` (copy title, topic from tags, set progress to 0, `timeSpentSeconds: 0`)
- Call `addTask(task)` and `setActiveTask(task.id)`
- Call `convertUpdate(update.id)` to mark it converted
- Navigate to `/task`

**Expected Output:**
Clicking "Add to Tasks" on a home card → navigates to Task screen showing that update's task.

**How to Test:**
Click "Add to Tasks" on any card → Task screen header shows correct title → Update card is marked/removed on Home.

**Dependencies:**
Steps 3.2, 3.3, 4.2 complete.

**Next Step:**
Phase 6 — Media Viewer.

---

## PHASE 6 — Media Viewer (iframe embeds only)

> No external libraries. Both PDF and YouTube use native `<iframe>` embeds.

---

### Step 6.1: Build YouTube iframe Embed Component

**Goal:**
Create a component that embeds a YouTube video using a plain `<iframe>`.

**What to implement:**
Create `src/components/YoutubeEmbed.tsx` that:
- Accepts `url: string` prop
- Extracts the video ID from the URL (handle both `youtube.com/watch?v=` and `youtu.be/` formats)
- Renders `<iframe src="https://www.youtube.com/embed/{videoId}" ...>` with `allowFullScreen`
- Styles the iframe to fill the media container (16:9 aspect ratio via CSS padding trick)

No `npm install` required.

**Expected Output:**
Component renders a YouTube video in the media area using only an iframe.

**How to Test:**
Import into TaskScreen and pass a hardcoded YouTube URL — video loads and plays.

**Dependencies:**
None.

**Next Step:**
Step 6.2 — PDF iframe embed component.

---

### Step 6.2: Build PDF iframe Embed Component

**Goal:**
Create a component that displays a PDF using a plain `<iframe>`.

**What to implement:**
Create `src/components/PDFEmbed.tsx` that:
- Accepts `url: string` prop
- Renders `<iframe src={url} type="application/pdf" ...>`
- Styles to fill the media container with a fixed height
- Shows a fallback link ("Open PDF in new tab") below the iframe for browsers that can't embed PDFs

No `npm install` required.

**Expected Output:**
Component renders a PDF in the media area using only an iframe.

**How to Test:**
Import into TaskScreen and pass a hardcoded public PDF URL — PDF renders (or fallback link shows on mobile).

**Dependencies:**
None.

**Next Step:**
Step 6.3 — Wire media viewer to active task.

---

### Step 6.3: Wire Media Components to Active Task

**Goal:**
Show the correct media component based on the active task's `mediaType`.

**What to implement:**
In `TaskScreen.tsx`, replace the `media-placeholder` div with a conditional:
- `mediaType === 'youtube'` → `<YoutubeEmbed url={task.mediaUrl} />`
- `mediaType === 'pdf'` → `<PDFEmbed url={task.mediaUrl} />`
- Otherwise → placeholder text ("Study material not available for this task.")

**Expected Output:**
Task screen shows the right media for the active task type.

**How to Test:**
Set `mediaType: 'youtube'` in a mock task with a valid URL — video embeds. Change to `'pdf'` — PDF iframe renders.

**Dependencies:**
Steps 5.1, 6.1, 6.2 complete.

**Next Step:**
Phase 7 — Knowledge Base.

---

## PHASE 7 — Knowledge Base (Enhanced)

---

### Step 7.1: Wire Knowledge Store to KnowledgeBaseScreen

**Goal:**
Replace hardcoded node/edge arrays in KnowledgeBaseScreen with data from the knowledge store.

**What to implement:**
In `KnowledgeBaseScreen.tsx`:
- Import `useKnowledgeStore`
- Replace `initialNodes` and `initialEdges` constants with store values
- Map `KnowledgeNode` to ReactFlow node format (applying correct `className` from `status`)

**Expected Output:**
Graph renders the same 5 mock nodes, now driven by store data.

**How to Test:**
`npm run dev` — graph looks unchanged. Manually call `updateNodeStatus` in DevTools console — node color updates.

**Dependencies:**
Step 3.6 complete.

**Next Step:**
Step 7.2 — Node click interaction.

---

### Step 7.2: Add Node Click → Task Navigation

**Goal:**
Clicking a knowledge node that has a linked task navigates to the Task screen for that task.

**What to implement:**
In `KnowledgeBaseScreen.tsx`:
- Add `onNodeClick` handler to `<ReactFlow>`
- If clicked node has `taskId`: call `setActiveTask(taskId)` and navigate to `/task`
- If no taskId: show a small inline tooltip below the node with the label text

**Expected Output:**
Clicking a node with a linked task opens that task. Nodes without tasks show a label tooltip.

**How to Test:**
Add `taskId` to a mock knowledge node. Click it — navigates to Task screen with correct task active.

**Dependencies:**
Steps 3.3, 3.6, 7.1 complete.

**Next Step:**
Step 7.3 — Knowledge graph node styling.

---

### Step 7.3: Style Knowledge Graph Nodes

**Goal:**
Style ReactFlow nodes to match Illumyna's visual system with status-appropriate colors.

**What to implement:**
In `KnowledgeBaseScreen.css`, style `.kb-node.learned`, `.kb-node.in-progress`, `.kb-node.recommended` using CSS variables:
- Learned: solid fill using `--status-learned`
- In Progress: dashed border, `--status-in-progress`
- Recommended: ghost/outline style, `--status-recommended`
Override ReactFlow's default node appearance.

**Expected Output:**
Graph nodes have distinct visual styles per status that respect dark mode.

**How to Test:**
Open Knowledge Base — three node types are visually distinct. Toggle dark mode — nodes adapt.

**Dependencies:**
Steps 1.1, 7.1 complete.

**Next Step:**
Phase 8 — Profile Screen.

---

## PHASE 8 — Profile Screen (Polish & Persistence)

---

### Step 8.1: Wire Profile Store to ProfileScreen

**Goal:**
Replace local `useState` in ProfileScreen with the persisted profile store.

**What to implement:**
In `ProfileScreen.tsx`:
- Remove local `profile` state
- Import `useProfileStore`
- Read `profile` from store
- On "Save Profile" click: call `updateProfile(profile)` and show a brief "Saved!" confirmation (CSS-only, no toast library)

**Expected Output:**
Profile form reads from and writes to the store. Changes persist on refresh.

**How to Test:**
Change "Target Role" → Save → Refresh page → value is still changed.

**Dependencies:**
Step 3.5 complete.

**Next Step:**
Step 8.2 — Dropdown for Current Level.

---

### Step 8.2: Add Dropdown for Current Level

**Goal:**
Replace the free-text "Current Level" input with a `<select>` dropdown.

**What to implement:**
In `ProfileScreen.tsx`, replace the `currentLevel` text `<input>` with a `<select>` offering `Beginner / Intermediate / Advanced` options. Style with CSS variables to match other form fields.

**Expected Output:**
Current Level field is a styled dropdown.

**How to Test:**
Select "Advanced" → Save → Refresh — "Advanced" is selected.

**Dependencies:**
Step 8.1 complete.

**Next Step:**
Step 8.3 — Interests tag input.

---

### Step 8.3: Build Interests Tag Input

**Goal:**
Replace the comma-separated interests text input with an interactive tag input.

**What to implement:**
Create `src/components/TagInput.tsx` (no external library):
- Renders existing tags as removable pills (✕ button per pill)
- Input field at the end — pressing Enter or comma adds a new tag
- Clicking the ✕ on a tag removes it

Wire into ProfileScreen replacing the `interests` text input.

**Expected Output:**
Interests displays as pills. User can add/remove individual interests.

**How to Test:**
Type "Machine Learning" + Enter — pill appears. Click ✕ — pill removed. Save — persists.

**Dependencies:**
Step 8.1 complete.

**Next Step:**
Step 8.4 — Stats section real data.

---

### Step 8.4: Wire Stats Cards to Real Data

**Goal:**
Replace hardcoded stat values (12h, 6 tasks, 85%) with computed values from stores.

**What to implement:**
In `ProfileScreen.tsx`, compute:
- Tasks Done: `tasks.filter(t => t.status === 'completed').length`
- Progress: average `progressPercent` across all tasks (0 if no tasks)
- This Week: sum of `timeSpentSeconds` for tasks active this week, converted to hours (1 decimal place)

**Expected Output:**
Stats reflect actual task data from the store.

**How to Test:**
Mark a task complete in the store — "Tasks Done" increments. Modify `timeSpentSeconds` in mock data — "This Week" reflects it.

**Dependencies:**
Steps 3.3, 8.1 complete.

**Next Step:**
Phase 9 — Navigation polish.

---

## PHASE 9 — Navigation & Routing Polish

---

### Step 9.1: Polish Active Route Highlight in SideNav

**Goal:**
Ensure the active nav item is clearly highlighted based on current route.

**What to implement:**
Verify and polish the `.nav-item.active` CSS class:
- Bold or medium-weight text
- Accent-colored left border or subtle background using CSS variables
- Icon color change to accent on active
All styling via CSS variables only.

**Expected Output:**
Active nav item is visually distinct. Changes as routes switch.

**How to Test:**
Navigate to each screen — corresponding nav item is highlighted.

**Dependencies:**
Step 1.1 complete.

**Next Step:**
Step 9.2 — Page transition animation.

---

### Step 9.2: Add Page Transition Animation

**Goal:**
Screens animate in when navigating between routes.

**What to implement:**
Verify `.fade-in` class (from Step 1.5) is applied to all screen root divs. In `App.tsx`, read `useLocation()` and add `key={location.pathname}` to the `<Routes>` wrapper — forces remount on navigation, triggering the fade-in.

**Expected Output:**
Every screen fades in on navigate.

**How to Test:**
Navigate between all 4 screens — each fades in cleanly with no flash.

**Dependencies:**
Step 1.5 complete.

**Next Step:**
Step 9.3 — Fallback route.

---

### Step 9.3: Add Fallback Route

**Goal:**
Unknown routes redirect to Home.

**What to implement:**
In `App.tsx`, add `<Route path="*" element={<Navigate to="/" replace />} />` at the end of `<Routes>`.

**Expected Output:**
Navigating to `/unknown` redirects to Home screen.

**How to Test:**
Manually enter `http://localhost:5173/unknown` in the browser — redirects to Home.

**Dependencies:**
None.

**Next Step:**
Phase 10 — Backend Setup.

---

## PHASE 10 — Backend Setup (FastAPI, local only)

---

### Step 10.1: Scaffold FastAPI Project

**Goal:**
Create a minimal FastAPI backend project structure.

**What to implement:**
Create `/backend` directory with:
- `main.py` — FastAPI app with CORS enabled for `localhost:5173`
- `requirements.txt` — `fastapi`, `uvicorn`, `httpx`, `python-dotenv`
- `.env.example` — `GEMINI_API_KEY=` and `LM_STUDIO_URL=http://localhost:1234`
- `.env` — copy of `.env.example` for local use (add to `.gitignore`)

`GET /health` returns `{"status": "ok"}`.

**Expected Output:**
`uvicorn main:app --reload` starts without errors.

**How to Test:**
Run backend. `curl http://localhost:8000/health` → `{"status":"ok"}`.

**Dependencies:**
None.

**Next Step:**
Step 10.2 — Research endpoint stub.

---

### Step 10.2: Create Research Endpoint Stub

**Goal:**
Create a `POST /research` endpoint that returns mock data (no real Gemini call yet).

**What to implement:**
In `main.py`, add `POST /research` that accepts `{ profile: dict }` body and returns a hardcoded list of 4 mock `Update`-shaped dicts.

**Expected Output:**
`POST /research` returns valid mock JSON.

**How to Test:**
`curl -X POST http://localhost:8000/research -H "Content-Type: application/json" -d '{"profile":{}}' ` — returns mock updates array.

**Dependencies:**
Step 10.1 complete.

**Next Step:**
Step 10.3 — Connect frontend Fetch Updates button to backend stub.

---

### Step 10.3: Connect Frontend to Backend Research Endpoint

**Goal:**
Clicking "Fetch Updates" on Home screen calls the backend stub and populates the store.

**What to implement:**
Create `src/api/research.ts` with a `fetchUpdates(profile)` function that POSTs to `http://localhost:8000/research`.

In `HomeScreen.tsx`, wire the "Fetch Updates" button:
- On click: call `setLoading(true)`, `setFetchError(null)`, call `fetchUpdates(profile)`, call `setUpdates(result, now)`, `setLoading(false)`

**Expected Output:**
Clicking "Fetch Updates" → loading spinner → cards update with backend stub data.

**How to Test:**
Start backend. Click Fetch Updates — network tab shows POST request, cards update with backend data.

**Dependencies:**
Steps 3.2, 3.5, 10.2, 4.4 complete.

**Next Step:**
Step 10.4 — Error display for failed fetch.

---

### Step 10.4: Add Descriptive Error Display to Fetch Updates

**Goal:**
Show the actual error reason when the research request fails — not a generic message, not mock data.

**What to implement:**
In `HomeScreen.tsx`:
- Wrap the fetch call in try/catch
- On error: call `setFetchError(error.message)` on the store
- Render a visible error card below the header when `fetchError !== null` showing the exact error message
- Include a "Retry" button that re-triggers the fetch
- Error card stays visible until dismissed or a successful fetch replaces it

**Expected Output:**
If backend is offline: error card shows the specific error. User can retry.

**How to Test:**
Stop the backend. Click Fetch Updates — error card shows "Failed to fetch" (or actual error). Restart backend. Click Retry — succeeds.

**Dependencies:**
Step 10.3 complete.

**Next Step:**
Phase 11 — Gemini Integration.

---

## PHASE 11 — Gemini Integration (Fetch-Only, Rate-Limited)

> Gemini is used ONLY to fetch raw research updates.
> ALL processing (summarization, scoring, recommendations) is handled by the local LLM in Phase 12.
> Rate limit: 1 real call per 18 hours. Cache stored in `updates.json`.

---

### Step 11.1: Set Up Gemini Client in Backend

**Goal:**
Initialize the Gemini API client in the backend.

**What to implement:**
In `backend/`:
- Add `google-generativeai` to `requirements.txt`
- In `main.py`, load `GEMINI_API_KEY` from `.env` on startup
- Initialize `genai.configure(api_key=...)` and `model = genai.GenerativeModel('gemini-1.5-flash')`
- Add `GET /gemini-test` endpoint that sends "Say hello in one sentence" and returns the text response

**Expected Output:**
`GET /gemini-test` returns Gemini's response text.

**How to Test:**
With a valid API key in `.env`: `curl http://localhost:8000/gemini-test` → short Gemini response.

**Dependencies:**
Step 10.1 complete.

**Next Step:**
Step 11.2 — Data directory and cache setup.

---

### Step 11.2: Create Data Directory and Cache File

**Goal:**
Set up the JSON file storage that will hold cached research results and the cache timestamp.

**What to implement:**
Create `/backend/data/` directory with:
- `updates.json` → `{ "lastFetched": null, "updates": [] }`
- `tasks.json` → `[]`
- `profile.json` → default `UserProfile` dict
- `knowledge.json` → `{ "nodes": [], "edges": [] }`

Create `backend/db.py` with:
- `read_json(filename) -> dict | list`
- `write_json(filename, data)`
- `get_updates_cache() -> dict` — reads `updates.json`
- `set_updates_cache(updates: list, fetched_at: str)` — writes to `updates.json`

**Expected Output:**
Data directory created. Helper functions work.

**How to Test:**
`python -c "from db import get_updates_cache; print(get_updates_cache())"` → `{"lastFetched": null, "updates": []}`.

**Dependencies:**
Step 10.1 complete.

**Next Step:**
Step 11.3 — 18-hour cache guard.

---

### Step 11.3: Implement 18-Hour Cache Guard

**Goal:**
Before calling Gemini, check if cached results are still fresh (< 18 hours old). Return cache if fresh.

**What to implement:**
Create `backend/cache.py` with:
- `is_cache_fresh(last_fetched_iso: str | None) -> bool` — returns `True` if `lastFetched` is set and < 18 hours ago
- `get_cached_updates() -> list | None` — returns cached updates if fresh, else `None`

Update `POST /research` in `main.py`:
1. Call `get_cached_updates()`
2. If result is not None: return `{ "updates": result, "source": "cache", "cachedAt": lastFetched }`
3. If None: proceed to call Gemini (next steps)

**Expected Output:**
Calling `POST /research` within 18 hours of a previous call returns cached data immediately without hitting Gemini.

**How to Test:**
Manually set `lastFetched` in `updates.json` to current time. Call `POST /research` — returns `"source": "cache"` without calling Gemini.

**Dependencies:**
Steps 11.1, 11.2 complete.

**Next Step:**
Step 11.4 — Design research prompt.

---

### Step 11.4: Design the Research Prompt Template

**Goal:**
Create the prompt that instructs Gemini to return structured raw update data.

**What to implement:**
Create `backend/prompts/research_prompt.py` with `build_research_prompt(profile: dict) -> str` that:
- Injects user's `targetRole`, `currentLevel`, `interests`, `weeklyCommitmentHours`
- Instructs Gemini to return exactly 5 updates as a JSON array
- Specifies the exact JSON schema per update: `title`, `summary`, `whyItMatters`, `tags[]`, `difficulty`, `estimatedMinutes`, `sources[]`, `resources: { papers[], articles[], videos[] }`
- Instructs Gemini to match difficulty to user's level and topics to interests

**Expected Output:**
Function returns a well-formed prompt string.

**How to Test:**
`python -c "from prompts.research_prompt import build_research_prompt; print(build_research_prompt({'targetRole':'ML Engineer', 'currentLevel':'Advanced', 'interests':['transformers']}))"` — prints prompt.

**Dependencies:**
Step 10.1 complete.

**Next Step:**
Step 11.5 — Call Gemini with research prompt.

---

### Step 11.5: Call Gemini and Parse the Response

**Goal:**
Wire the prompt to Gemini, call it, and parse the response into structured JSON.

**What to implement:**
Create `backend/parsers/update_parser.py` with `parse_updates(raw_text: str) -> list[dict]` that:
- Strips markdown code fences if present (` ```json ... ``` `)
- Parses the JSON
- Validates each item has required fields; fills missing optional fields with defaults
- Returns a clean list

Update `POST /research` to:
1. Build prompt with `build_research_prompt(profile)`
2. Call `model.generate_content(prompt)`
3. Call `parse_updates(response.text)`
4. Return the parsed list

**Expected Output:**
`POST /research` returns a clean JSON array of 5 update objects from Gemini.

**How to Test:**
Call endpoint with a profile — response is valid parseable JSON. Feed directly into frontend — cards render.

**Dependencies:**
Steps 11.1, 11.3, 11.4 complete.

**Next Step:**
Step 11.6 — Persist results to cache after fetch.

---

### Step 11.6: Persist Gemini Results to Cache

**Goal:**
After a successful Gemini call, save results and timestamp to `updates.json`.

**What to implement:**
After `parse_updates` succeeds in `POST /research`:
- Call `set_updates_cache(updates, datetime.utcnow().isoformat())`
- Return `{ "updates": updates, "source": "gemini", "fetchedAt": timestamp }`

**Expected Output:**
After a real Gemini fetch, `updates.json` is populated with results and `lastFetched` is set.

**How to Test:**
Call `POST /research` with no cache. Check `data/updates.json` — file populated with real results and a timestamp. Call again immediately — returns `"source": "cache"`.

**Dependencies:**
Steps 11.2, 11.5 complete.

**Next Step:**
Step 11.7 — Gemini failure: surface real error.

---

### Step 11.7: Surface Gemini Errors to the Frontend

**Goal:**
When Gemini fails, return the actual error details so the user knows exactly what went wrong and how to fix it.

**What to implement:**
Wrap the Gemini call in `POST /research` with try/except. On exception:
- Do NOT return mock/fallback data
- Return HTTP 200 with body: `{ "error": true, "errorType": str, "errorMessage": str, "updates": [] }`

Map known error types to actionable messages:
- `INVALID_ARGUMENT` / auth error → "Invalid API key. Check GEMINI_API_KEY in backend/.env"
- `RESOURCE_EXHAUSTED` / quota → "Gemini daily quota exceeded. Try again tomorrow or check your quota at Google AI Studio."
- `UNAVAILABLE` / network → "Could not reach Gemini. Check your internet connection."
- Unknown → include the raw exception message

**Expected Output:**
Frontend receives a structured error with a human-readable, actionable message.

**How to Test:**
Set `GEMINI_API_KEY=invalid` in `.env`. Call `POST /research` — response includes `error: true` and message about invalid key.

**Dependencies:**
Step 11.5 complete.

**Next Step:**
Step 11.8 — Wire error display in frontend.

---

### Step 11.8: Wire Gemini Error Display in HomeScreen

**Goal:**
When `fetchUpdates` returns `error: true`, display the specific Gemini error message to the user.

**What to implement:**
In `src/api/research.ts`, update `fetchUpdates` to check the response for `error: true` and throw an error with `errorMessage` as the message string.

The existing error display from Step 10.4 already shows `error.message` — this step ensures the Gemini-specific message propagates correctly.

**Expected Output:**
On Gemini auth failure: error card says "Invalid API key. Check GEMINI_API_KEY in backend/.env". On quota: "Gemini daily quota exceeded. Try again tomorrow."

**How to Test:**
Use invalid API key. Click Fetch Updates — error card shows the specific actionable message.

**Dependencies:**
Steps 10.4, 11.7 complete.

**Next Step:**
Phase 12 — Local LLM.

---

## PHASE 12 — Local LLM Integration (LM Studio / Gemma)

> ALL core intelligence runs here. LM Studio must be running with a model loaded on `http://localhost:1234`.
> Responsibilities: summarization, relevance scoring, recommendations, doubt-solving.

---

### Step 12.1: Verify LM Studio Connection from Backend

**Goal:**
Confirm the backend can communicate with the local LLM via the OpenAI-compatible REST API.

**What to implement:**
Create `backend/llm/lm_studio.py` with:
- `chat_completion(messages: list[dict], system_prompt: str) -> str`
- POSTs to `{LM_STUDIO_URL}/v1/chat/completions` (reads URL from env)
- Uses `model: "local-model"` (LM Studio ignores the model name)
- Returns the assistant response content string
- Raises descriptive exception if LM Studio is unreachable

Add `GET /llm-test` endpoint that sends "Say hello in one sentence" and returns the response.

**Expected Output:**
`GET /llm-test` returns the local LLM's response.

**How to Test:**
Start LM Studio with a model loaded. `curl http://localhost:8000/llm-test` → local LLM response text.

**Dependencies:**
Step 10.1 complete.

**Next Step:**
Step 12.2 — Summarization prompt.

---

### Step 12.2: Design Summarization and Scoring Prompt

**Goal:**
Create the prompt that instructs the local LLM to refine a raw Gemini update and score its relevance.

**What to implement:**
Create `backend/prompts/summarize_prompt.py` with `build_summarize_prompt(raw_update: dict, profile: dict) -> str` that instructs the LLM to:
- Rewrite the summary in plain language appropriate to the user's `currentLevel`
- Score relevance 0–10 based on `targetRole` and `interests`
- Assign `recommendation: 'high' | 'medium' | 'low'`
- Return JSON only: `{ "refinedSummary": str, "relevanceScore": int, "recommendation": str }`

Keep the prompt concise — local models have limited context.

**Expected Output:**
Function returns a valid, concise prompt string.

**How to Test:**
Print the prompt output — verify it includes profile details and JSON output instructions.

**Dependencies:**
Step 12.1 complete.

**Next Step:**
Step 12.3 — Summarization endpoint.

---

### Step 12.3: Create Summarization Endpoint

**Goal:**
Expose a backend endpoint that refines a single update using the local LLM.

**What to implement:**
Add `POST /summarize` to `main.py`:
- Accepts `{ "update": {...}, "profile": {...} }`
- Builds prompt with `build_summarize_prompt`
- Calls `chat_completion`
- Parses JSON from response
- Returns `{ "refinedSummary": str, "relevanceScore": int, "recommendation": str }`

**Expected Output:**
Endpoint returns refined summary and relevance score for a given update.

**How to Test:**
POST a mock update — response includes `relevanceScore` (0–10) and `refinedSummary`.

**Dependencies:**
Steps 12.1, 12.2 complete.

**Next Step:**
Step 12.4 — Chain Gemini fetch with LLM processing.

---

### Step 12.4: Chain Gemini Fetch with Local LLM Processing

**Goal:**
After Gemini returns raw updates, pass each through the local LLM for refinement and sorting. This is where all intelligence happens.

**What to implement:**
Update `POST /research` to, after successful Gemini parse:
1. For each of the 5 raw updates: call `build_summarize_prompt` + `chat_completion` + parse result
2. Merge `refinedSummary`, `relevanceScore`, `recommendation` into each update object
3. Sort updates by `relevanceScore` descending
4. Cache the enriched updates (not the raw ones)
5. Return the enriched, sorted list

**Expected Output:**
`POST /research` returns updates sorted by relevance, each with `refinedSummary` and `relevanceScore` from the local LLM.

**How to Test:**
Call research endpoint with both services running — response includes `relevanceScore` on each update, sorted high-to-low.

**Dependencies:**
Steps 11.5, 11.6, 12.3 complete.

**Next Step:**
Step 12.5 — Recommendation prompt.

---

### Step 12.5: Create "What to Learn Next" Recommendation Endpoint

**Goal:**
Use the local LLM to suggest which update to add to tasks next, based on completed tasks and the user profile.

**What to implement:**
Create `backend/prompts/recommend_prompt.py` with `build_recommend_prompt(updates: list, completed_tasks: list, profile: dict) -> str`.

Add `POST /recommend` to `main.py`:
- Accepts `{ "updates": [...], "completedTasks": [...], "profile": {...} }`
- Calls local LLM with the recommendation prompt
- Returns `{ "recommendedUpdateId": str, "reason": str }`

**Expected Output:**
Endpoint returns the ID of the most appropriate update to work on next.

**How to Test:**
POST with a mix of updates and 1–2 completed tasks — response includes a `recommendedUpdateId` and short reason.

**Dependencies:**
Steps 12.1 complete.

**Next Step:**
Step 12.6 — Doubt solver endpoint.

---

### Step 12.6: Create Doubt Solver Endpoint

**Goal:**
Create a backend endpoint that answers task-specific user questions using the local LLM.

**What to implement:**
Create `backend/prompts/doubt_prompt.py` with `build_doubt_prompt(task_title: str, task_topic: str) -> str` that sets the system context.

Add `POST /doubt-solver` to `main.py`:
- Accepts `{ "taskTitle": str, "taskTopic": str, "chatHistory": [...], "question": str }`
- Builds system prompt from task context
- Passes history as `messages` array (role/content format)
- Returns `{ "answer": str }`

**Expected Output:**
Endpoint returns a context-aware answer to the user's question.

**How to Test:**
POST with `taskTitle: "Transformers"`, `question: "What is self-attention?"` — get a relevant, contextual answer.

**Dependencies:**
Step 12.1 complete.

**Next Step:**
Step 12.7 — Wire doubt solver to TaskScreen.

---

### Step 12.7: Wire Doubt Solver Endpoint to TaskScreen

**Goal:**
Replace the mock `setTimeout` AI response in TaskScreen with a real call to the local LLM.

**What to implement:**
Create `src/api/doubtSolver.ts` with `askDoubt(taskTitle, topic, history, question): Promise<string>` that POSTs to `/doubt-solver`.

In `TaskScreen.tsx`, replace the `setTimeout` mock in `handleSendMessage` with:
- Call `askDoubt(...)`
- Keep typing indicator active during the request
- On response: add the answer as an assistant message to the chat store
- On error: add an error message ("Could not reach the doubt solver. Is LM Studio running?")

**Expected Output:**
User types a question → typing indicator → real local LLM answer appears.

**How to Test:**
Start backend + LM Studio. Ask a question — real answer returns. Stop LM Studio — error message appears in chat.

**Dependencies:**
Steps 12.6, 5.3 complete.

**Next Step:**
Phase 13 — Data Persistence.

---

## PHASE 13 — Data Persistence (JSON files)

---

### Step 13.1: Add GET /updates Endpoint

**Goal:**
Allow the frontend to load previously cached updates on app startup, without triggering a new Gemini fetch.

**What to implement:**
Add `GET /updates` to `main.py`:
- Reads `updates.json` using `get_updates_cache()`
- Returns `{ "updates": [...], "lastFetched": str | null }`

**Expected Output:**
`GET /updates` returns cached updates array and timestamp.

**How to Test:**
After a research fetch, call `GET /updates` — returns same data without triggering Gemini.

**Dependencies:**
Steps 11.2, 11.6 complete.

**Next Step:**
Step 13.2 — Load cached updates on app start.

---

### Step 13.2: Load Cached Updates on App Start

**Goal:**
When the frontend loads, fetch previously cached updates from the backend instead of showing empty state.

**What to implement:**
In `src/api/research.ts`, add `getCachedUpdates(): Promise<{ updates: Update[], lastFetched: string | null }>`.

In `src/store/updatesStore.ts`, add `loadCachedUpdates()` action that calls this and hydrates the store.

In `App.tsx`, call `loadCachedUpdates()` on mount.

**Expected Output:**
On app load, previously fetched updates appear immediately without clicking "Fetch Updates".

**How to Test:**
Fetch updates. Refresh the page — updates are still visible without re-fetching.

**Dependencies:**
Steps 3.2, 13.1 complete.

**Next Step:**
Step 13.3 — Persist tasks.

---

### Step 13.3: Persist Tasks to JSON

**Goal:**
Save and retrieve tasks from `tasks.json`.

**What to implement:**
Add to `main.py`:
- `POST /tasks` — appends a `Task` dict to `tasks.json`
- `GET /tasks` — returns all tasks from `tasks.json`
- `PATCH /tasks/{id}` — finds task by id, updates `progressPercent`, `status`, or `timeSpentSeconds`

**Expected Output:**
Tasks saved to disk. Survive backend restarts.

**How to Test:**
POST a task, GET tasks — persisted. Restart backend — GET tasks still returns it.

**Dependencies:**
Step 11.2 complete.

**Next Step:**
Step 13.4 — Sync frontend task store with backend.

---

### Step 13.4: Sync Frontend Tasks Store with Backend

**Goal:**
Frontend loads tasks from backend on app start and writes changes back.

**What to implement:**
Create `src/api/tasks.ts` with `getTasks()`, `createTask(task)`, `updateTask(id, patch)`.

In `tasksStore.ts`, add `fetchTasks()` action that calls `getTasks()` and hydrates the store.

Update `addTask` to also call `createTask`. Update `updateProgress`, `addTimeSpent`, `completeTask` to also call `updateTask`.

Call `fetchTasks()` in `App.tsx` on mount (after `loadCachedUpdates`).

**Expected Output:**
Tasks load from backend on startup. Progress and completion persist.

**How to Test:**
Create a task, refresh — task still appears. Update progress — persists on refresh.

**Dependencies:**
Steps 3.3, 13.3 complete.

**Next Step:**
Step 13.5 — Persist profile to backend.

---

### Step 13.5: Persist Profile to Backend

**Goal:**
Save user profile to `profile.json` in addition to localStorage.

**What to implement:**
Add `GET /profile` and `PUT /profile` to `main.py`.

Create `src/api/profile.ts` with `getProfile()` and `saveProfile(profile)`.

Update `profileStore.ts`: on `updateProfile` call `saveProfile` in the background. On init, call `getProfile()` and merge with localStorage value (backend wins on conflict).

**Expected Output:**
Profile persists to disk. Survives clearing localStorage.

**How to Test:**
Save profile. Clear localStorage in DevTools. Refresh — profile still loaded from backend.

**Dependencies:**
Steps 3.5, 11.2 complete.

**Next Step:**
Phase 14 — Offline Mode.

---

## PHASE 14 — Offline Mode

> Show last cached updates and disable fetch when no internet. App remains usable for studying existing tasks.

---

### Step 14.1: Detect Network Status in Frontend

**Goal:**
Track whether the browser is online or offline using the native Network Information API.

**What to implement:**
Create `src/hooks/useOnlineStatus.ts`:
- Returns `isOnline: boolean`
- Uses `navigator.onLine` as initial value
- Listens to `window` `online` and `offline` events to update state

**Expected Output:**
Hook correctly reflects network status.

**How to Test:**
Use the hook in a temporary debug component. DevTools → Network → set Offline — hook returns `false`. Remove throttle — returns `true`.

**Dependencies:**
None.

**Next Step:**
Step 14.2 — Offline banner on Home screen.

---

### Step 14.2: Show Offline Banner on Home Screen

**Goal:**
Display a non-intrusive offline indicator on the Home screen when the user has no internet.

**What to implement:**
In `HomeScreen.tsx`:
- Import `useOnlineStatus`
- When `!isOnline`: render a small banner below the header: "You're offline — showing last fetched updates."
- When online: banner is hidden
- "Fetch Updates" button is disabled when offline (with tooltip: "Connect to the internet to fetch updates")

**Expected Output:**
Banner appears immediately when network goes offline. Disappears when back online. Fetch button is disabled offline.

**How to Test:**
DevTools → Network → Offline. Home screen shows banner and disabled Fetch button. Remove throttle — banner disappears, button re-enables.

**Dependencies:**
Steps 14.1, 4.4 complete.

**Next Step:**
Step 14.3 — Serve cached updates when offline.

---

### Step 14.3: Serve Cached Updates When Offline (Backend)

**Goal:**
If `POST /research` is called while offline (or Gemini is unreachable), always return the cached updates rather than failing.

**What to implement:**
Update the `POST /research` error handler in `main.py` (from Step 11.7):
- Before returning the Gemini error response, check if `updates.json` has non-empty cached updates
- If yes: return `{ "updates": cached, "source": "cache-fallback", "error": true, "errorMessage": "..." }`
- If no cached data exists: return `{ "updates": [], "error": true, "errorMessage": "..." }`

This ensures the frontend always has data to show if it exists, even when Gemini fails.

**Expected Output:**
Gemini failure returns cached data + error details in one response.

**How to Test:**
Have cached data in `updates.json`. Set invalid API key. Call `POST /research` — returns both `error: true` AND populated `updates` array.

**Dependencies:**
Steps 11.2, 11.7 complete.

**Next Step:**
Step 14.4 — Display last-fetched timestamp on Home screen.

---

### Step 14.4: Display Last-Fetched Timestamp

**Goal:**
Show when the current updates were last fetched so the user knows how fresh the data is.

**What to implement:**
In `updatesStore.ts`, `lastFetched` already exists. In `HomeScreen.tsx`, display it below the updates feed header:
- If `lastFetched` is set: "Last fetched: 3 hours ago" (relative time, computed with plain JS `Date` math — no library)
- If null: "Never fetched"

**Expected Output:**
Home screen shows relative time of last fetch.

**How to Test:**
Fetch updates — timestamp shows. Refresh — timestamp still accurate.

**Dependencies:**
Steps 3.2, 4.2 complete.

**Next Step:**
Phase 15 — Polish & PWA.

---

## PHASE 15 — Polish & PWA

---

### Step 15.1: Skeleton Loading States for Update Cards

**Goal:**
Show skeleton loaders while updates are being fetched.

**What to implement:**
Create `src/components/UpdateCardSkeleton.tsx` — a card-shaped div using the `.skeleton` shimmer class (Step 1.5). In HomeScreen, when `isLoading` is true, render 4 `UpdateCardSkeleton` components instead of real cards.

**Expected Output:**
While fetching, 4 shimmer placeholder cards appear.

**How to Test:**
Click Fetch Updates — skeletons shimmer while loading. Real cards replace them on completion.

**Dependencies:**
Steps 1.5, 4.4 complete.

**Next Step:**
Step 15.2 — Empty states.

---

### Step 15.2: Add Empty States

**Goal:**
Show meaningful empty states when data lists are empty.

**What to implement:**
- Home Screen: if `updates.length === 0` and not loading → "Nothing here yet. Fetch your first updates."
- Task Screen: if no active task → "No active task. Pick one from Home."
- Knowledge Base: if `nodes.length === 0` → "Your knowledge graph is empty. Complete a task to grow it."

All empty state UI uses inline CSS, no library.

**Expected Output:**
All screens handle empty state gracefully with clear messaging.

**How to Test:**
Clear each store. Navigate to each screen — empty state message displays.

**Dependencies:**
Steps 4.2, 5.1, 7.1 complete.

**Next Step:**
Step 15.3 — Time tracking.

---

### Step 15.3: Add Time Tracking to Tasks

**Goal:**
Track time spent on each task and show weekly hours in the Profile.

**What to implement:**
In `TaskScreen.tsx`:
- On mount with active task: start `setInterval` every second, increment a local counter
- On unmount: call `addTimeSpent(taskId, elapsedSeconds)` on the store

`timeSpentSeconds` is already in the `Task` type (Step 2.2).

In `ProfileScreen.tsx`, compute "This Week": sum `timeSpentSeconds` of tasks whose `createdAt` is within the last 7 days. Display as hours to 1 decimal place.

**Expected Output:**
"This Week" stat increments as you spend time on Task screen.

**How to Test:**
Open Task screen 30 seconds. Go to Profile — "This Week" shows ~0.0h (small but non-zero).

**Dependencies:**
Steps 2.2, 3.3, 8.4 complete.

**Next Step:**
Step 15.4 — PWA configuration.

---

### Step 15.4: Configure PWA Manifest

**Goal:**
Make Illumyna installable as a PWA on mobile.

**What to implement:**
In `vite.config.ts`, configure `vite-plugin-pwa` (already installed) with:
- `name: 'Illumyna'`, `short_name: 'Illumyna'`
- `theme_color` set to the light mode `--bg-primary` hex value
- Icons: create two simple solid-color PNG icons (`192x192`, `512x512`) in `public/icons/`
- `display: 'standalone'`
- `start_url: '/'`

**Expected Output:**
Browser shows "Install" prompt. App opens without browser chrome when installed.

**How to Test:**
`npm run build && npm run preview`. Open in Chrome — address bar shows install icon. Install — opens standalone.

**Dependencies:**
Step 1.1 complete.

**Next Step:**
Step 15.5 — Mobile responsive audit.

---

### Step 15.5: Mobile Responsive Layout Audit

**Goal:**
Verify the app is fully usable at 375px wide (iPhone SE).

**What to implement:**
Open DevTools device emulator at 375×812. For each screen, fix any layout issues:
- Text truncation / overflow
- Buttons smaller than 44px touch target
- Horizontal scroll
- Cards clipped at edges
- Chat input covering message history

**Expected Output:**
All 4 screens are fully functional at 375px.

**How to Test:**
Test every screen at 375×812. No horizontal scroll. All buttons are tappable.

**Dependencies:**
All UI phases complete.

**Next Step:**
Step 15.6 — Final dark mode audit.

---

### Step 15.6: Dark Mode Full Audit

**Goal:**
Ensure every element in the app respects dark mode correctly.

**What to implement:**
Toggle dark mode and visit every screen. Fix any elements that:
- Show hardcoded colors
- Have poor contrast
- Are not using CSS variables

Update affected CSS files.

**Expected Output:**
Full dark mode with no visual regressions.

**How to Test:**
Enable dark mode. Navigate all 4 screens. No element appears broken or hard to read.

**Dependencies:**
Steps 1.2, 1.3 complete. All screen phases complete.

**Next Step:**
Done.

---

## APPENDIX: Phase Dependency Map

```
Phase 1 (Design System)
    └── Phase 2 (Types)
            └── Phase 3 (Stores)
                    ├── Phase 4 (Home Screen)
                    │       └── Phase 5 (Task Screen)
                    │               └── Phase 6 (Media Viewer)
                    ├── Phase 7 (Knowledge Base)
                    └── Phase 8 (Profile)
                            └── Phase 9 (Navigation)
                                    └── Phase 10 (Backend Setup)
                                            ├── Phase 11 (Gemini — fetch + cache + error)
                                            │       └── Phase 12 (Local LLM — all intelligence)
                                            │               └── Phase 13 (Persistence)
                                            │                       └── Phase 14 (Offline Mode)
                                            │                               └── Phase 15 (Polish + PWA)
                                            └── (Phase 12 also connects directly to Phase 10)
```

---

## APPENDIX: Step Count Summary

| Phase | Steps | Est. Claude Sessions |
|-------|-------|---------------------|
| 1 — Design System | 5 | 5 |
| 2 — Types | 6 | 3 |
| 3 — State Management (Zustand) | 6 | 4 |
| 4 — Home Screen | 4 | 4 |
| 5 — Task Screen | 4 | 4 |
| 6 — Media Viewer (iframe only) | 3 | 3 |
| 7 — Knowledge Base | 3 | 3 |
| 8 — Profile | 4 | 4 |
| 9 — Navigation | 3 | 2 |
| 10 — Backend Setup (FastAPI) | 4 | 4 |
| 11 — Gemini (rate-limited, cached, error-surfaced) | 8 | 8 |
| 12 — Local LLM (LM Studio, all intelligence) | 7 | 7 |
| 13 — Persistence (JSON files) | 5 | 5 |
| 14 — Offline Mode | 4 | 4 |
| 15 — Polish & PWA | 6 | 6 |
| **Total** | **72** | **~66** |

---

## APPENDIX: Cost Breakdown

| Component | Cost |
|-----------|------|
| Gemini 1.5 Flash | Free tier (15 requests/day, 1 million tokens/day) — 1 call per 18h = ~1–2 calls/day, well within free tier |
| LM Studio + Gemma | $0 — runs locally |
| FastAPI backend | $0 — runs locally |
| JSON file storage | $0 — local disk |
| Vite PWA | $0 — open source |
| **Total** | **$0** |

---

*End of IMPLEMENTATION_PLAN.md*
