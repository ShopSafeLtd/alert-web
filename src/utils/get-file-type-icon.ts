import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { FileType } from '#/graphql/types';
import {
  faFile,
  faFileAudio,
  faFileExcel,
  faFileImage,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
} from '@fortawesome/pro-light-svg-icons';

/**
 * Returns the appropriate FontAwesome icon for a given file type
 * @param fileName - The name of the file (used for extension detection)
 * @param fileType - Optional FileType enum from GraphQL
 * @returns FontAwesome icon definition
 */
export const getFileTypeIcon = (
  fileName: string,
  fileType?: FileType | null
): IconDefinition => {
  // First, try to determine by FileType enum if provided
  if (fileType) {
    switch (fileType) {
      case FileType.Image: {
        return faFileImage;
      }
      case FileType.Video: {
        return faFileVideo;
      }
      case FileType.Audio: {
        return faFileAudio;
      }
      case FileType.Document: {
        // Fall through to extension-based detection for documents
        break;
      }
      default: {
        // Fall through to extension-based detection
        break;
      }
    }
  }

  // Extension-based detection
  const lowerFileName = fileName.toLowerCase();

  // PDF files
  if (lowerFileName.endsWith('.pdf')) {
    return faFilePdf;
  }

  // Word documents
  if (
    lowerFileName.endsWith('.doc') ||
    lowerFileName.endsWith('.docx') ||
    lowerFileName.endsWith('.odt')
  ) {
    return faFileWord;
  }

  // Excel spreadsheets
  if (
    lowerFileName.endsWith('.xls') ||
    lowerFileName.endsWith('.xlsx') ||
    lowerFileName.endsWith('.ods') ||
    lowerFileName.endsWith('.csv')
  ) {
    return faFileExcel;
  }

  // PowerPoint presentations
  if (
    lowerFileName.endsWith('.ppt') ||
    lowerFileName.endsWith('.pptx') ||
    lowerFileName.endsWith('.odp')
  ) {
    return faFilePowerpoint;
  }

  // Image files
  if (
    lowerFileName.endsWith('.jpg') ||
    lowerFileName.endsWith('.jpeg') ||
    lowerFileName.endsWith('.png') ||
    lowerFileName.endsWith('.gif') ||
    lowerFileName.endsWith('.bmp') ||
    lowerFileName.endsWith('.svg') ||
    lowerFileName.endsWith('.webp')
  ) {
    return faFileImage;
  }

  // Video files
  if (
    lowerFileName.endsWith('.mp4') ||
    lowerFileName.endsWith('.avi') ||
    lowerFileName.endsWith('.mov') ||
    lowerFileName.endsWith('.wmv') ||
    lowerFileName.endsWith('.flv') ||
    lowerFileName.endsWith('.webm') ||
    lowerFileName.endsWith('.mkv')
  ) {
    return faFileVideo;
  }

  // Audio files
  if (
    lowerFileName.endsWith('.mp3') ||
    lowerFileName.endsWith('.wav') ||
    lowerFileName.endsWith('.flac') ||
    lowerFileName.endsWith('.aac') ||
    lowerFileName.endsWith('.ogg') ||
    lowerFileName.endsWith('.wma') ||
    lowerFileName.endsWith('.m4a')
  ) {
    return faFileAudio;
  }

  // Default file icon
  return faFile;
};
