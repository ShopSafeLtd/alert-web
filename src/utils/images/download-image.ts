const downloadImage = async (imageSrc: string, imageName: string) => {
  const imageBlob = await fetch(imageSrc)
    .then((res) => res.arrayBuffer())
    .then((buffer) => new Blob([buffer]));

  const link = document.createElement('a');
  link.href = URL.createObjectURL(imageBlob);
  const parts = imageSrc.split('?')[0].split('.');
  const imageType = parts[parts.length - 1];
  const fileName = `${imageName}.${imageType}`;

  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();

  // try {
  //   const response = await fetch(imageSrc);
  //   if (!response.ok) {
  //     throw new Error(`Failed to fetch the image. Status: ${response.status}`);
  //   }
  //   const contentType = response.headers.get('content-type');
  //   const imageBlob = await response.blob();
  //   const imageUrl = URL.createObjectURL(imageBlob);

  //   const extension = contentType?.split('/')[1] || 'jpg';
  //   const fileName = `${imageName}.${extension}`;
  //   const link = document.createElement('a');
  //   link.href = imageUrl;
  //   link.download = fileName;

  //   document.body.append(link);
  //   link.click();
  //   link.remove();
  // } catch (error) {
  //   console.error('Error:', error);
  // }
};

export default downloadImage;
