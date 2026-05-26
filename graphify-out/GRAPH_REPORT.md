# Graph Report - .  (2026-05-26)

## Corpus Check
- 75 files · ~4,596 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 75 nodes · 120 edges · 11 communities (8 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Boot Animation|Boot Animation]]
- [[_COMMUNITY_Team Avatars|Team Avatars]]
- [[_COMMUNITY_App Windows & Dock|App Windows & Dock]]
- [[_COMMUNITY_Desktop Layout|Desktop Layout]]
- [[_COMMUNITY_State & Window Shell|State & Window Shell]]
- [[_COMMUNITY_App Entry|App Entry]]
- [[_COMMUNITY_Menubar & Clock|Menubar & Clock]]
- [[_COMMUNITY_Boot Tests|Boot Tests]]
- [[_COMMUNITY_Store Tests|Store Tests]]

## God Nodes (most connected - your core abstractions)
1. `useDesktopStore` - 25 edges
2. `useGuide()` - 4 edges
3. `WindowId` - 4 edges
4. `Dock()` - 3 edges
5. `Menubar()` - 3 edges
6. `useClock()` - 3 edges
7. `App()` - 2 edges
8. `BootProgressHandle` - 2 edges
9. `BootScreen()` - 2 edges
10. `BootStripHandle` - 2 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `useDesktopStore`  [EXTRACTED]
  App.tsx → store/desktop.ts
- `BootScreen()` --calls--> `useDesktopStore`  [EXTRACTED]
  components/boot/BootScreen.tsx → store/desktop.ts
- `Hero()` --calls--> `useDesktopStore`  [EXTRACTED]
  components/desktop/Hero.tsx → store/desktop.ts
- `TeamWindow()` --calls--> `useDesktopStore`  [EXTRACTED]
  components/windows/TeamWindow.tsx → store/desktop.ts
- `WindowShell()` --calls--> `useDesktopStore`  [EXTRACTED]
  components/windows/WindowShell.tsx → store/desktop.ts

## Communities (11 total, 3 thin omitted)

### Community 0 - "Boot Animation"
Cohesion: 0.15
Nodes (10): BootProgress, BootProgressHandle, BootScreen(), NEX_LETTERS, TRI_LETTERS, BootStrip, BootStripHandle, Frame (+2 more)

### Community 1 - "Team Avatars"
Cohesion: 0.18
Nodes (4): Props, Props, Props, TeamWindow()

### Community 2 - "App Windows & Dock"
Cohesion: 0.33
Nodes (7): Dock(), DockItem(), DockItemProps, useGuide(), useDesktopStore, AboutWindow(), ServicesWindow()

### Community 4 - "State & Window Shell"
Cohesion: 0.36
Nodes (6): DesktopState, Phase, TeamMode, WindowId, Props, WindowShell()

### Community 5 - "App Entry"
Cohesion: 0.33
Nodes (3): App(), { getByTestId }, { queryByTestId }

### Community 7 - "Boot Tests"
Cohesion: 0.5
Nodes (3): { container }, fills, slots

## Knowledge Gaps
- **19 isolated node(s):** `{ getByTestId }`, `{ queryByTestId }`, `Props`, `Props`, `Props` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useDesktopStore` connect `App Windows & Dock` to `Boot Animation`, `Team Avatars`, `Desktop Layout`, `State & Window Shell`, `App Entry`, `Menubar & Clock`, `Boot Tests`, `Store Tests`?**
  _High betweenness centrality (0.367) - this node is a cross-community bridge._
- **Why does `Menubar()` connect `Menubar & Clock` to `App Windows & Dock`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `{ getByTestId }`, `{ queryByTestId }`, `Props` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._