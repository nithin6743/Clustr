# Clustr

A customizable bookmark workspace that transforms the browser's new tab page into an organized dashboard for managing bookmarks.

Clustr automatically imports browser bookmarks and allows users to organize them into boards, move links with drag-and-drop, search instantly, and customize the experience with themes, animations, and layouts.

---

## Features

### Bookmark Management

* Automatic bookmark import on installation
* Automatic import of newly created browser bookmarks
* Independent bookmark organization
* Browser bookmarks remain untouched when links are edited or deleted inside Clustr

### Boards

* Create unlimited boards
* Edit board titles
* Delete boards
* Drag & drop boards within columns
* Move boards across columns
* Empty-column board drop support

### Links

* Add custom links
* Edit link titles and URLs
* Delete links
* Drag & drop links within boards
* Move links between boards
* Automatic favicon support

### Search

* Global bookmark search
* Prioritized search results
* Instant filtering while typing

### Customization

* Dark Mode
* Light Mode
* Animated backgrounds
* Static backgrounds
* Quick access settings panel

### User Experience

* Interactive onboarding experience
* Toast notifications
* Keyboard shortcuts
* Smooth animations
* Empty-state guidance
* Responsive drag overlays

---

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS Modules

### Libraries

* @dnd-kit/core
* @dnd-kit/sortable
* Framer Motion
* Swiper

### Browser APIs

* Chrome Bookmarks API
* Chrome Storage API

---

## Installation

### Chromium-Based Browsers

Supported browsers:

* Google Chrome
* Microsoft Edge
* Brave
* Opera
* Vivaldi
* Arc

#### Install from Source

1. Clone the repository

```bash
git clone <repository-url>
```

2. Install dependencies

```bash
npm install
```

3. Build the extension

```bash
npm run build
```

4. Open:

```text
chrome://extensions
```

5. Enable:

```text
Developer Mode
```

6. Click:

```text
Load Unpacked
```

7. Select the generated build folder.

---

## How It Works

When Clustr is installed:

1. Browser bookmarks are imported into the **Imported** board.
2. Users can organize bookmarks into custom boards.
3. Links can be moved freely without affecting browser bookmarks.
4. Newly created browser bookmarks can be imported automatically while Clustr is open.

---

## Screenshot

<img width="1917" height="942" alt="image" src="https://github.com/user-attachments/assets/8d4cebfd-3ec1-43c3-b067-7c335a5e4a02" />

---

## Current Limitations

* Chromium-based browsers only
* Local storage only
* No cloud synchronization
* No multi-device sync

---

## Version History

### v2.0.0

* Added board drag & drop
* Added cross-column board movement
* Added onboarding experience
* Added improved drag overlays
* Added animations and visual refinements
* Improved bookmark importing
* Added keyboard shortcuts
* Enhanced search and settings experience

### v1.0.0

* Initial release
  
---

Built by Nithin.
