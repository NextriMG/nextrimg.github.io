# Graph Report - nextri-portfolio  (2026-11-02)

## Corpus Check
- 31 files · ~7,673 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 102 nodes · 253 edges · 9 communities (7 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a26287b4`
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
- Turnstile Type Declarations

## God Nodes (most connected - your core abstractions)
1. `useDesktopStore` - 26 edges
2. `t()` - 23 edges
3. `Desktop()` - 13 edges
4. `TeamWindow()` - 10 edges
5. `BootScreen()` - 9 edges
6. `WindowId` - 8 edges
7. `Dock()` - 7 edges
8. `Menubar()` - 6 edges
9. `ContactWindow()` - 6 edges
10. `App()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Menubar()` --calls--> `useClock()`  [EXTRACTED]
  src/components/desktop/Menubar.tsx → src/hooks/useClock.ts
- `ContactFallback()` --calls--> `t()`  [EXTRACTED]
  src/components/windows/ContactWindow.tsx → src/i18n/index.ts
- `ContactForm()` --calls--> `t()`  [EXTRACTED]
  src/components/windows/ContactWindow.tsx → src/i18n/index.ts
- `SuccessScreen()` --calls--> `t()`  [EXTRACTED]
  src/components/windows/ContactWindow.tsx → src/i18n/index.ts
- `TeamWindow()` --calls--> `t()`  [EXTRACTED]
  src/components/windows/TeamWindow.tsx → src/i18n/index.ts

## Import Cycles
- None detected.

## Communities (9 total, 2 thin omitted)

### Community 0 - "src/components/boot/BootScreen.tsx"
Cohesion: 0.18
Nodes (12): BootProgress, BootProgressHandle, BootScreen(), LetterSpans(), NEX_LETTERS, sleep(), TRI_LETTERS, BootStrip (+4 more)

### Community 1 - "useDesktopStore"
Cohesion: 0.32
Nodes (12): Desktop(), Dock(), DockItem(), Hero(), Menubar(), Wallpaper(), AboutWindow(), ServicesWindow() (+4 more)

### Community 2 - "Team Window & Avatars"
Cohesion: 0.20
Nodes (9): ItoAvatar(), Props, LionelAvatar(), Props, Props, SitrakaAvatar(), GithubIcon(), LinkedinIcon() (+1 more)

### Community 3 - "ContactWindow.tsx"
Cohesion: 0.27
Nodes (6): ContactFallback(), ContactForm(), ContactWindow(), SuccessScreen(), TURNSTILE_KEY, WEB3FORMS_KEY

### Community 5 - "src/store/desktop.ts"
Cohesion: 0.23
Nodes (9): DockItemProps, Props, fmt(), useClock(), DesktopState, skipBoot(), Phase, TeamMode (+1 more)

### Community 6 - "i18n/index.ts"
Cohesion: 0.52
Nodes (3): en, fr, Messages

### Community 8 - "Turnstile Type Declarations"
Cohesion: 0.50
Nodes (3): TurnstileInstance, TurnstileRenderOptions, Window

## Knowledge Gaps
- **13 isolated node(s):** `Frame`, `FrameType`, `Props`, `Props`, `Props` (+8 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 23 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useDesktopStore` connect `useDesktopStore` to `src/components/boot/BootScreen.tsx`, `Team Window & Avatars`, `ContactWindow.tsx`, `src/App.tsx`, `src/store/desktop.ts`?**
  _High betweenness centrality (0.196) - this node is a cross-community bridge._
- **What connects `Frame`, `FrameType`, `Props` to the rest of the system?**
  _13 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `t()` connect `useDesktopStore` to `Team Window & Avatars`, `ContactWindow.tsx`, `src/store/desktop.ts`, `i18n/index.ts`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `TeamWindow()` connect `Team Window & Avatars` to `useDesktopStore`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._