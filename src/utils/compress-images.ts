import Compressor from 'compressorjs';

export async function compressImage(file: File): Promise<File> {
  const blobPromise: Promise<Blob | File> = new Promise((resolve) => {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      convertSize: 1, // size of file to exceed before converting from convertTypes
      convertTypes: 'image/webp', // files to convert
      error: () => resolve(file),
      quality: 0.6,
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
