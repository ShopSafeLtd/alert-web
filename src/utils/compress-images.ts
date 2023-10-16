import Compressor from 'compressorjs';

export async function compressImage(file: File): Promise<File> {
  const blobPromise: Promise<File | Blob> = new Promise((resolve) => {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      convertSize: 2_000_000,
      success: (result) => resolve(result),
      error: () => resolve(file),
    });
  });
  const compressedBlob = await blobPromise;
  return new File([compressedBlob], file.name, {
    type: compressedBlob.type,
    lastModified: Date.now(),
  });
}
export default compressImage;
