const downloadImage = async (imageSrc: string, imageName: string) => {
  try {
    const response = await fetch(imageSrc);
    if (!response.ok) {
      throw new Error(`Failed to fetch the image. Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const imageBlob = await response.blob();

    let downloadBlob = imageBlob;
    let extension = 'jpg'; // default fallback

    // Infer extension from content-type
    const typeParts = contentType.split('/');
    if (typeParts.length === 2) {
      extension = typeParts[1].split(';')[0]; // remove any charset info
    }

    // Force fallback if octet-stream or something invalid
    if (extension === 'octet-stream' || extension === '') {
      // Try to parse from the URL as fallback
      const urlExtensionMatch = imageSrc.match(
        /\.(jpg|jpeg|png|webp|gif)(\?|$)/i
      );
      extension = urlExtensionMatch?.[1] ?? 'jpg';
    }

    // If it's webp, convert to jpeg
    if (extension === 'webp') {
      try {
        const bitmap = await createImageBitmap(imageBlob);
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(bitmap, 0, 0);
        const jpegDataUrl = canvas.toDataURL('image/jpeg');

        const byteString = atob(jpegDataUrl.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = <number>byteString.codePointAt(i);
        }
        downloadBlob = new Blob([ab], { type: 'image/jpeg' });
        extension = 'jpeg';
      } catch (error) {
        console.warn(
          'WebP to JPEG conversion failed, fallback to original blob',
          error
        );
        extension = 'webp';
      }
    }

    const fileName = `${imageName}.${extension}`;
    const blobUrl = URL.createObjectURL(downloadBlob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};
export default downloadImage;
