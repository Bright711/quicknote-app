# QuickNotes

QuickNotes is a lightweight, responsive note-taking web app that helps you capture short thoughts and organize them into Personal, Work, and Study categories. Notes are saved in your browser, so they remain available after a refresh without needing an account or a server.

## Features

- Add notes with Personal, Work, or Study categories.
- Validate empty notes and notes longer than 200 characters.
- Search note text without case sensitivity.
- Delete individual notes or clear all notes after confirmation.
- Display a note count and a readable creation date and time.
- Save notes in `localStorage` so they persist across page refreshes.
- Responsive layout with category-coloured note cards.

## Run locally

1. Clone or download this repository.
2. Open the `quicknotes-app` folder.
3. Open `index.html` in a modern web browser.

No package installation or build step is required. For a local development server, you can use the VS Code Live Server extension.

## What I learned

- How semantic HTML and correctly associated labels make forms more accessible.
- How CSS Flexbox and media queries create layouts that adapt to smaller screens.
- How to use DOM methods such as `querySelector`, `createElement`, and `textContent` to render user content safely.
- How arrays, objects, event listeners, and filtering can power add, delete, and search features.
- How `JSON.stringify`, `JSON.parse`, and `localStorage` preserve data between visits.
- How small, focused Git commits document the development process.
