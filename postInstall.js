const fse = require('fs-extra');
const path = require('path');

const topDir = __dirname;

// Clear and copy TinyMCE assets.
fse.emptyDirSync(path.join(topDir, 'public', 'tinymce'));
fse.copySync(
  path.join(topDir, 'node_modules', 'tinymce'),
  path.join(topDir, 'public', 'tinymce'),
  { overwrite: true }
);

// Copy the PDF.js worker file into the public directory.
fse.copySync(
  path.join(topDir, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.mjs'),
  path.join(topDir, 'public', 'pdf.worker.js'),
  { overwrite: true }
);
