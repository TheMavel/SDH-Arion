// scripts/generate_pages.js
// Optional script to convert Markdown chapters to HTML pages.
// Requires Node.js and npm/yarn.
// Run `npm install marked fs-extra` or `yarn add marked fs-extra` in your terminal first.

const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked'); // Correct import for marked v4+

const chaptersDir = path.join(__dirname, '..', 'chapters');
const outputDir = path.join(__dirname, '..', 'chapters'); // Output HTML next to MD files
const tocFilePath = path.join(__dirname, '..', 'index.html');

// Ensure output directory exists (though in this case it's the same as input)
fs.ensureDirSync(outputDir);

// --- HTML Template --- 
const createHtmlTemplate = (title, content, chapterFileName) => {
    const baseName = path.basename(chapterFileName, '.md');
    const chapterNumberMatch = baseName.match(/\d+/);
    const currentChapterNum = chapterNumberMatch ? parseInt(chapterNumberMatch[0], 10) : null;

    let prevLink = '';
    let nextLink = '';

    if (currentChapterNum && currentChapterNum > 1) {
        prevLink = `<a href="chapter${currentChapterNum - 1}.html">Previous Chapter</a> | `;
    }
    // Basic next link - assumes sequential naming like chapter1, chapter2, etc.
    // A more robust solution would check if the next file actually exists.
    if (currentChapterNum) {
        nextLink = ` | <a href="chapter${currentChapterNum + 1}.html">Next Chapter</a>`;
    }


    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="../styles/main.css"> 
</head>
<body>
    <nav>
        <a href="../index.html">Table of Contents</a>
        ${prevLink}
        ${nextLink}
    </nav>
    <hr>

    ${content}

    <hr>
    <nav>
         <a href="../index.html">Table of Contents</a>
        ${prevLink}
        ${nextLink}
    </nav>
</body>
</html>
    `;
};

// --- Main Generation Logic --- 
async function generatePages() {
    try {
        console.log('Starting HTML generation...');
        const files = await fs.readdir(chaptersDir);
        const mdFiles = files.filter(file => file.endsWith('.md') && file !== 'storyboard.md'); // Exclude storyboard

        const tocEntries = [];

        for (const file of mdFiles.sort()) { // Sort to ensure somewhat logical order
            const mdFilePath = path.join(chaptersDir, file);
            const htmlFileName = file.replace('.md', '.html');
            const htmlFilePath = path.join(outputDir, htmlFileName);

            console.log(`Processing ${file}...`);

            const mdContent = await fs.readFile(mdFilePath, 'utf-8');
            
            // Extract title from the first H1 heading
            const titleMatch = mdContent.match(/^#\s+(.*)/m);
            const title = titleMatch ? titleMatch[1] : path.basename(file, '.md'); // Fallback title
            
            const htmlContent = marked.parse(mdContent); // Use marked.parse

            const finalHtml = createHtmlTemplate(title, htmlContent, file);

            await fs.writeFile(htmlFilePath, finalHtml);
            console.log(` -> Generated ${htmlFileName}`);

            // Prepare TOC entry
            tocEntries.push(`<li><a href="chapters/${htmlFileName}">${title}</a></li>`);
        }

        console.log('\nUpdating Table of Contents in index.html...');
        const indexHtmlContent = await fs.readFile(tocFilePath, 'utf-8');
        
        // Basic TOC replacement - assumes a specific structure in index.html
        const tocMarkerStart = '<!-- Chapter links will be added here -->';
        const tocMarkerEnd = '</ul>'; // Assumes the list ends right after the placeholder
        const tocRegex = new RegExp(`${tocMarkerStart}[\s\S]*?${tocMarkerEnd}`);

        const newIndexHtmlContent = indexHtmlContent.replace(
            tocRegex,
            `${tocMarkerStart}\n        ${tocEntries.join('\n        ')}\n    ${tocMarkerEnd}`
        );

        await fs.writeFile(tocFilePath, newIndexHtmlContent);
        console.log('Table of Contents updated.');

        console.log('\nHTML generation complete!');

    } catch (error) {
        console.error('\nError during HTML generation:', error);
        process.exit(1); // Indicate failure
    }
}

generatePages(); 