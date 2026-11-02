# Graph Report - nextri-portfolio  (2026-11-02)

## Corpus Check
- 32 files · ~8,432 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 114 nodes · 274 edges · 11 communities (8 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `209f1400`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- src/components/boot/BootScreen.tsx
- useDesktopStore
- Team Window & Avatars
- ContactWindow.tsx
- src/App.tsx
- src/store/desktop.ts
- i18n/index.ts
- i18n.test.tsx
- Turnstile Type Declarations
- Menubar.tsx

## God Nodes (most connected - your core abstractions)
1. `useDesktopStore` - 27 edges
2. `t()` - 23 edges
3. `Desktop()` - 14 edges
4. `TeamWindow()` - 10 edges
5. `BootScreen()` - 9 edges
6. `WindowId` - 8 edges
7. `Dock()` - 7 edges
8. `Menubar()` - 7 edges
9. `App()` - 6 edges
10. `ContactWindow()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `DockItemProps` --references--> `WindowId`  [EXTRACTED]
  src/components/desktop/Dock.tsx → src/types/index.ts
- `Props` --references--> `WindowId`  [EXTRACTED]
  src/components/windows/WindowShell.tsx → src/types/index.ts
- `App()` --calls--> `BootScreen()`  [EXTRACTED]
  src/App.tsx → src/components/boot/BootScreen.tsx
- `App()` --calls--> `Desktop()`  [EXTRACTED]
  src/App.tsx → src/components/desktop/Desktop.tsx
- `App()` --calls--> `useDesktopStore`  [EXTRACTED]
  src/App.tsx → src/store/desktop.ts

## Import Cycles
- None detected.

## Communities (11 total, 3 thin omitted)

### Community 0 - "src/components/boot/BootScreen.tsx"
Cohesion: 0.18
Nodes (12): BootProgress, BootProgressHandle, BootScreen(), LetterSpans(), NEX_LETTERS, sleep(), TRI_LETTERS, BootStrip (+4 more)

### Community 1 - "useDesktopStore"
Cohesion: 0.30
Nodes (12): Desktop(), Dock(), DockItem(), DockItemProps, Hero(), Wallpaper(), AboutWindow(), ServicesWindow() (+4 more)

### Community 2 - "Team Window & Avatars"
Cohesion: 0.20
Nodes (9): ItoAvatar(), Props, LionelAvatar(), Props, Props, SitrakaAvatar(), GithubIcon(), LinkedinIcon() (+1 more)

### Community 3 - "ContactWindow.tsx"
Cohesion: 0.43
Nodes (6): ContactFallback(), ContactForm(), ContactWindow(), SuccessScreen(), TURNSTILE_KEY, WEB3FORMS_KEY

### Community 5 - "src/store/desktop.ts"
Cohesion: 0.35
Nodes (6): Props, DesktopState, skipBoot(), Phase, TeamMode, WindowId

### Community 6 - "i18n/index.ts"
Cohesion: 0.52
Nodes (3): en, fr, Messages

### Community 8 - "Turnstile Type Declarations"
Cohesion: 0.50
Nodes (3): TurnstileInstance, TurnstileRenderOptions, Window

### Community 10 - "Menubar.tsx"
Cohesion: 0.70
Nodes (3): Menubar(), fmt(), useClock()

## Knowledge Gaps
- **14 isolated node(s):** `Frame`, `FrameType`, `Props`, `Props`, `Props` (+9 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 34 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useDesktopStore` connect `useDesktopStore` to `src/components/boot/BootScreen.tsx`, `Team Window & Avatars`, `src/App.tsx`, `src/store/desktop.ts`, `i18n.test.tsx`, `Menubar.tsx`?**
  _High betweenness centrality (0.203) - this node is a cross-community bridge._
- **What connects `Frame`, `FrameType`, `Props` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n.test.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `t()` connect `useDesktopStore` to `Team Window & Avatars`, `ContactWindow.tsx`, `src/store/desktop.ts`, `i18n/index.ts`, `Menubar.tsx`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `TeamWindow()` connect `Team Window & Avatars` to `useDesktopStore`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._