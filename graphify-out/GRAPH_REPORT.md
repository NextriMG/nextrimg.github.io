# Graph Report - nextri-portfolio  (2026-10-29)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 101 nodes · 218 edges · 12 communities (8 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 32,498 input · 165 output

## Graph Freshness
- Built from commit: `a0dcbe5d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Boot Sequence Animation
- Desktop Shell & Hero
- Team Window & Avatars
- Contact Form & Tests
- Dock & Onboarding Guide
- Window State Store
- App Entry Tests
- Menubar Clock
- Turnstile Type Declarations

## God Nodes (most connected - your core abstractions)
1. `useDesktopStore` - 26 edges
2. `Desktop()` - 12 edges
3. `BootScreen()` - 9 edges
4. `TeamWindow()` - 9 edges
5. `WindowId` - 8 edges
6. `App()` - 7 edges
7. `ContactWindow()` - 6 edges
8. `Dock()` - 6 edges
9. `Menubar()` - 5 edges
10. `DesktopState` - 4 edges

## Surprising Connections (you probably didn't know these)
- `DockItemProps` --references--> `WindowId`  [EXTRACTED]
  src/components/desktop/Dock.tsx → src/types/index.ts
- `Props` --references--> `WindowId`  [EXTRACTED]
  src/components/windows/WindowShell.tsx → src/types/index.ts
- `App()` --calls--> `BootScreen()`  [EXTRACTED]
  src/App.tsx → src/components/boot/BootScreen.tsx
- `BootScreen()` --calls--> `useDesktopStore`  [EXTRACTED]
  src/components/boot/BootScreen.tsx → src/store/desktop.ts
- `Desktop()` --calls--> `Dock()`  [EXTRACTED]
  src/components/desktop/Desktop.tsx → src/components/desktop/Dock.tsx

## Import Cycles
- None detected.

## Communities (12 total, 4 thin omitted)

### Community 0 - "Boot Sequence Animation"
Cohesion: 0.19
Nodes (12): BootProgress, BootProgressHandle, BootScreen(), LetterSpans(), NEX_LETTERS, sleep(), TRI_LETTERS, BootStrip (+4 more)

### Community 1 - "Desktop Shell & Hero"
Cohesion: 0.32
Nodes (8): App(), Desktop(), Hero(), Wallpaper(), AboutWindow(), ServicesWindow(), WindowShell(), useDesktopStore

### Community 2 - "Team Window & Avatars"
Cohesion: 0.23
Nodes (9): ItoAvatar(), Props, LionelAvatar(), Props, Props, SitrakaAvatar(), GithubIcon(), LinkedinIcon() (+1 more)

### Community 3 - "Contact Form & Tests"
Cohesion: 0.22
Nodes (6): ContactFallback(), ContactForm(), ContactWindow(), SuccessScreen(), TURNSTILE_KEY, WEB3FORMS_KEY

### Community 4 - "Dock & Onboarding Guide"
Cohesion: 0.24
Nodes (4): Dock(), DockItem(), DockItemProps, useGuide()

### Community 5 - "Window State Store"
Cohesion: 0.35
Nodes (6): Props, DesktopState, skipBoot(), Phase, TeamMode, WindowId

### Community 7 - "Menubar Clock"
Cohesion: 0.70
Nodes (3): Menubar(), fmt(), useClock()

### Community 8 - "Turnstile Type Declarations"
Cohesion: 0.50
Nodes (3): TurnstileInstance, TurnstileRenderOptions, Window

## Knowledge Gaps
- **15 isolated node(s):** `Frame`, `FrameType`, `Props`, `Props`, `Props` (+10 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 27 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useDesktopStore` connect `Desktop Shell & Hero` to `Boot Sequence Animation`, `Team Window & Avatars`, `Contact Form & Tests`, `Dock & Onboarding Guide`, `Window State Store`, `Menubar Clock`?**
  _High betweenness centrality (0.235) - this node is a cross-community bridge._
- **What connects `Frame`, `FrameType`, `Props` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `App()` connect `Desktop Shell & Hero` to `Boot Sequence Animation`, `Contact Form & Tests`, `Dock & Onboarding Guide`, `App Entry Tests`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Why does `TeamWindow()` connect `Team Window & Avatars` to `Desktop Shell & Hero`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._