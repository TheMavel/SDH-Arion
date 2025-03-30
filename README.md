# Digital Book Application

This is a simple digital book application that uses markdown files for chapter content, with special formatting for characters, places, items, and scenes.

## Setup and Usage

1. **Important: This application needs to be run on a local web server** due to browser security restrictions when loading local files.

   You can use:
   - VS Code with the "Live Server" extension
   - Node.js with a simple server like `http-server`
   - Python's built-in server: `python -m http.server`

2. **Open the application**: Navigate to the index.html file through your local server to start the application.

3. **Navigate chapters**: Use the sidebar to select chapters, or the arrow buttons at the top to move sequentially.

4. **Background music**: Click the play button to toggle background music. Use the volume slider to adjust the volume.

## Adding Content

1. **Create chapter files**: Add markdown files to the `chapters/` directory, following the naming convention `chapterX.md`.

2. **Update chapter list**: Add new chapters to the `chapters` array in `index.html`.

3. **Use special formatting tags**:
   - Characters: `[CHAR:Name]`
   - Places: `[PLACE:Location]`
   - Items: `[ITEM:Object]`
   - Scene IDs: `[SCENE-ID: X-Y]`

4. **Add images**: Place images in the `images/` directory and reference them in markdown with `![Alt text](/images/image.jpg)`.

5. **Add music**: Place audio files in the `music/` directory and update the audio source in `index.html`.

6. **Update storyboard**: Keep track of your narrative, characters, and plot threads in `storyboard.md`.

## Requirements

- A modern web browser (Chrome, Firefox, Edge, Safari)
- A local web server for development

## File Structure

```
digital-book/
├── .cursorrules           # Rules for AI assistance
├── index.html             # Main application
├── README.md              # This file
├── storyboard.md          # Story planning document
├── chapters/              # Markdown chapter files
│   ├── chapter1.md
│   ├── chapter2.md
│   └── ...
├── images/                # Image files
│   └── ...
├── music/                 # Audio files
│   └── track1.mp3
├── styles/                # CSS stylesheets
│   └── main.css
└── scripts/               # JavaScript files
    └── generate_pages.js  # Optional script for MD to HTML conversion
``` 