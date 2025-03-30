1. Overview
We want a digital book application that uses:

Markdown-based chapters (easy to create/edit, each as a separate .md file).

Minimal multi-page HTML output (one HTML file per chapter).

Images (stored in a dedicated folder, referenced in chapters).

Background music toggle and volume control (files in a /music/ folder).

Storyboard file (storyboard.md) to maintain coherence across the narrative.

Special Markdown formatting in chapters so that certain references or tags can be easily located for future editing.

2. Project Structure
A recommended folder layout for clarity:

less
Copy
my-book-project/
├── .cursorrules             // Project-wide rules for Cursor AI
├── index.html               // Main landing page (table of contents, background music)
├── chapters/
│   ├── chapter1.md
│   ├── chapter2.md
│   └── ...
├── images/
│   ├── ...
│   └── ...
├── music/
│   ├── track1.mp3
│   └── ...
├── storyboard.md            // Outlines plot arcs, key scenes, or open threads
├── styles/
│   └── main.css             // Optional separate stylesheet
└── scripts/
    └── generate_pages.js    // Optional Node.js script to convert MD -> HTML
.cursorrules: Defines how Cursor AI should handle writing style, continuity, and references.

index.html: Entry point, showing a table of contents, background music controls, and linking to chapter pages.

chapters/: Contains all book chapters as .md files.

images/: Holds any images referenced in the text (e.g., scene illustrations).

music/: Stores audio tracks for optional background music.

storyboard.md: Maintains an overview of the plot, characters, and planned or open story points.

scripts/: May contain a Node.js script for Markdown-to-HTML conversion.

3. Special Markdown Formatting
To easily find or update specific references across the book, use a consistent tagging or heading structure. The developer can later parse these tags via scripts or text search. Some suggestions:

Section Headings

Use distinct headings for scenes or major events in each chapter:

markdown
Copy
# Chapter 1: Introduction
## Scene 1.1 [SCENE-ID: 1-1]
Some text describing the scene...

## Scene 1.2 [SCENE-ID: 1-2]
Further text...
This ensures each scene is clearly labeled (Scene 1.1 or Scene 1.2).

[SCENE-ID: x-y] is a custom token that can be searched easily.

Character References

Embed tokens or brackets around character names the first time they appear in each scene:

markdown
Copy
The hero [CHAR:John] enters the room...
A future script can quickly locate all appearances of [CHAR:John] if the name changes or if additional notes need to be inserted.

Locations / Important Items

Similar bracket format for places or items:

markdown
Copy
At [PLACE:GreenCastle], they discovered [ITEM:AncientKey].
Inline Comments (Optional)

For developer/author notes, consider using HTML comments in Markdown:

markdown
Copy
<!-- NOTE: Double-check John's motivation in scene 1.2 -->
These won’t appear in the rendered text but remain searchable.

By following a consistent labeling scheme ([CHAR:Name], [PLACE:Name], [ITEM:Name], [SCENE-ID: x-y]), you can rapidly find and update details across all .md files.

4. Storyboard File
storyboard.md is crucial for big-picture coherence. It can contain:

Chapter Summaries

A short paragraph summarizing each chapter’s events.

Pointers to unresolved plot threads or character arcs.

Character Arcs

Brief descriptions of each main character’s goals, conflicts, and progress over time.

Plot Threads & Foreshadowing

List any planted clues, future reveals, or major turning points you plan to address.

This reduces the risk of forgetting or contradicting earlier hints.

The developer doesn’t need to parse storyboard.md for the final build unless you want additional automation (e.g., generating a “Story Overview” page). However, it’s recommended to keep it in the same project for easy reference.

5. Key Components
5.1. Minimal HTML & Audio Controls
index.html:

Table of Contents: Links to each generated .html chapter file.

Audio Element:

html
Copy
<audio id="bgMusic" src="music/track1.mp3" loop></audio>
<button id="toggleBtn">Play Music</button>
<input type="range" id="volumeRange" min="0" max="1" step="0.01" value="1" />
JavaScript for toggling play()/pause() and adjusting volume.

5.2. Chapter HTML Pages
Either hand-coded or generated from Markdown.

Each includes navigation (Back to index.html, Next Chapter link) and references to images if needed.

5.3. Optional Markdown-to-HTML Script
A Node.js script (e.g., generate_pages.js) can parse each .md in /chapters/ and create a corresponding .html with a template header/footer.

Highlighted tasks:

Retain or replicate headings and tags like [SCENE-ID: 1-1] in the final HTML for easy scanning.

Output file names in a consistent manner (e.g., chapter1.html for chapter1.md).

6. Cursor AI Integration
.cursorrules

High-level instructions for Cursor on how to write (style, perspective, consistency, referencing the storyboard, etc.).

Local Context

The developer ensures the .md files are in a location Cursor can access.

The author can open each .md in Cursor, apply .cursorrules, and systematically update text with consistent tagging.

Note: No direct AI coding is required from the developer. The .cursorrules file is enough to guide Cursor AI whenever it’s used.

7. Testing & Maintenance
Check Tag Consistency

Periodically run a text search (or script) on tags like [CHAR:...], [PLACE:...], etc. to confirm uniform usage and find references quickly.

HTML Verification

Open each chapter .html in a browser to confirm formatting, images, and references display correctly.

Storyboard Alignment

Ensure storyboard.md accurately reflects any new arcs or changes introduced in chapters.

Audio Behavior

Each page reload restarts music in a standard multi-page approach. If continuous audio is desired across page transitions, a single-page application method would be needed (not currently in scope).

8. Summary
Markdown Chapters: Use special tags (characters, places, items, scene IDs) to simplify future editing.

Storyboard (storyboard.md): Maintains coherence and references for the entire narrative.

Multi-Page HTML: Each chapter is its own page, indexed by index.html.

Optional Scripts: A Node.js generator can convert .md to .html automatically.

Cursor AI: Guided by .cursorrules, enabling a consistent writing style with easy referencing of past chapters.

The project’s structure and tagging approach will ensure that you (and Cursor AI) can find and modify passages efficiently, maintain continuity via the storyboard, and present a simple, minimalistic reading experience with images and background music.

End of Technical Brief