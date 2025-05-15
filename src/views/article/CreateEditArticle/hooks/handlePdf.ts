import * as pdfjsLib from 'pdfjs-dist';

// Set the PDF.js worker source (ensure this file is served from your public folder)
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

/**
 * Opens a file picker for PDF files, renders each page as an image,
 * and then calls the callback with an HTML string containing a column of images.
 *
 * @param callback - A function that receives the generated HTML string.
 */
const pdfFilePickerCallback = (callback: (content: string) => void): void => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.pdf';

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  input.addEventListener('change', async () => {
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    try {
      // Read the PDF file as an ArrayBuffer.
      const arrayBuffer = await file.arrayBuffer();

      // Load the PDF document from the ArrayBuffer.
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      const { numPages } = pdfDoc;

      // Create a container for the images with a column layout.
      let htmlContent = `<div style="display: flex; flex-direction: column; gap: 10px;">`;

      // Process each page of the PDF.
      for (let i = 1; i <= numPages; i++) {
        const page = await pdfDoc.getPage(i);

        // Define a scale factor to control the quality/size of the rendered image.
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        // Create a canvas for rendering the page.
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d');

        if (context) {
          // Render the PDF page into the canvas context.
          await page.render({ canvasContext: context, viewport }).promise;
          // Convert the canvas to a PNG data URL.
          const dataUrl = canvas.toDataURL('image/png');
          // Append an image element for this page.
          // Note the data-pdf attribute which marks this image as PDF generated.
          htmlContent += `<img src="${dataUrl}" alt="Page ${i}" data-pdf="true" width="700px"     style="max-width: 100%; height: auto;"
   />`;
        }
      }
      htmlContent += `</div>`;

      // Call the callback with the generated HTML.
      callback(htmlContent);
    } catch (error) {
      console.error('Error processing PDF:', error);
    }
  });

  // Trigger the file picker dialog.
  input.click();
};

export default pdfFilePickerCallback;
