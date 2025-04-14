const downloadImage = async (imageSrc: string, imageName: string) => {
  try {
    const response = await fetch(imageSrc);
    if (!response.ok) {
      throw new Error(`Failed to fetch the image. Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    const imageBlob = await response.blob();

    let downloadBlob = imageBlob;
    let extension = contentType.split('/')[1] || 'jpg';

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
        const mimeString = jpegDataUrl
          .split(',')[0]
          .split(':')[1]
          .split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = <number>byteString.codePointAt(i);
        }
        downloadBlob = new Blob([ab], { type: mimeString });
        extension = 'jpeg';
      } catch (conversionError) {
        console.warn(
          'Failed to convert webp to jpeg. Falling back to original blob.',
          conversionError
        );
        downloadBlob = imageBlob;
        extension = 'webp';
      }
    }

    const fileName = `${imageName}.${extension}`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(downloadBlob);
    link.download = fileName;

    document.body.append(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};

export default downloadImage;
