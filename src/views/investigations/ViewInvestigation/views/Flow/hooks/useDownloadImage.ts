import { toPng } from 'html-to-image';

interface Return {
  downloadImage: () => void;
}

const downloadImageFunction = (dataUrl: string) => {
  const a = document.createElement('a');
  a.setAttribute('download', 'investigation-flow.png');
  a.setAttribute('href', dataUrl);
  a.click();
};

const downloadImage = () => {
  const element: HTMLElement | null = document.querySelector('.react-flow');
  if (element)
    toPng(element, {
      filter: (node) =>
        !(
          node?.classList?.contains('react-flow__minimap') ||
          node?.classList?.contains('react-flow__controls') ||
          node?.classList?.contains('react-flow__background')
        ),
      skipAutoScale: true,
    }).then(downloadImageFunction);
};

const useDownloadImage = (): Return => ({ downloadImage });

export default useDownloadImage;
