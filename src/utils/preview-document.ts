import { FileType } from '#/graphql/types';

export type PreviewMethod = 'lightbox' | 'media' | 'newTab' | 'office';

export interface PreviewStrategy {
  method: PreviewMethod;
  url: string;
}

/**
 * Determines the best preview strategy for a document based on its file type
 * @param fileName - The name of the file
 * @param url - The document URL
 * @param fileType - Optional FileType enum from GraphQL
 * @returns Preview strategy object
 */
export const getPreviewStrategy = (
  fileName: string,
  url: string,
  fileType?: FileType | null
): PreviewStrategy => {
  const lowerFileName = fileName.toLowerCase();

  // Handle by FileType enum if available
  if (fileType) {
    switch (fileType) {
      case FileType.Image: {
        return { method: 'lightbox', url };
      }
      case FileType.Video:
      case FileType.Audio: {
        return { method: 'media', url };
      }
      default: {
        break;
      }
    }
  }

  // PDF files - open in new tab
  if (lowerFileName.endsWith('.pdf')) {
    return { method: 'newTab', url };
  }

  // Office documents - use Microsoft viewer
  if (
    lowerFileName.endsWith('.doc') ||
    lowerFileName.endsWith('.docx') ||
    lowerFileName.endsWith('.xls') ||
    lowerFileName.endsWith('.xlsx') ||
    lowerFileName.endsWith('.ppt') ||
    lowerFileName.endsWith('.pptx') ||
    lowerFileName.endsWith('.odt') ||
    lowerFileName.endsWith('.ods') ||
    lowerFileName.endsWith('.odp')
  ) {
    return { method: 'office', url };
  }

  // Image files - use lightbox
  if (
    lowerFileName.endsWith('.jpg') ||
    lowerFileName.endsWith('.jpeg') ||
    lowerFileName.endsWith('.png') ||
    lowerFileName.endsWith('.gif') ||
    lowerFileName.endsWith('.bmp') ||
    lowerFileName.endsWith('.svg') ||
    lowerFileName.endsWith('.webp')
  ) {
    return { method: 'lightbox', url };
  }

  // Video files - use media player
  if (
    lowerFileName.endsWith('.mp4') ||
    lowerFileName.endsWith('.avi') ||
    lowerFileName.endsWith('.mov') ||
    lowerFileName.endsWith('.wmv') ||
    lowerFileName.endsWith('.flv') ||
    lowerFileName.endsWith('.webm') ||
    lowerFileName.endsWith('.mkv')
  ) {
    return { method: 'media', url };
  }

  // Audio files - use media player
  if (
    lowerFileName.endsWith('.mp3') ||
    lowerFileName.endsWith('.wav') ||
    lowerFileName.endsWith('.flac') ||
    lowerFileName.endsWith('.aac') ||
    lowerFileName.endsWith('.ogg') ||
    lowerFileName.endsWith('.wma') ||
    lowerFileName.endsWith('.m4a')
  ) {
    return { method: 'media', url };
  }

  // Default: open in new tab
  return { method: 'newTab', url };
};

/**
 * Opens a document in a new browser tab
 * @param url - The document URL
 */
export const openInNewTab = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Generates Microsoft Office Online viewer URL
 * @param documentUrl - The URL of the Office document
 * @returns Encoded viewer URL
 */
export const getMicrosoftViewerUrl = (documentUrl: string): string => {
  const encodedUrl = encodeURIComponent(documentUrl);
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`;
};
