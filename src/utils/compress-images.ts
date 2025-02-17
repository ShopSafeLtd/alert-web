import Compressor from 'compressorjs';

export async function compressImage(file: File): Promise<File> {
  const blobPromise: Promise<Blob | File> = new Promise((resolve) => {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      convertSize: 2_000_000,
      convertTypes: 'image/webp',
      error: () => resolve(file),
      success: (result) => resolve(result),
    });
  });
  const compressedBlob = await blobPromise;
  return new File([compressedBlob], file.name, {
    lastModified: Date.now(),
    type: compressedBlob.type,
  });
}
export default compressImage;
