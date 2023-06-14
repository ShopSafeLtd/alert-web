function extracted(html: string | undefined): string {
  const doc = new DOMParser().parseFromString(html || '', 'text/html');
  const imgs = doc.getElementsByTagName('img');
  // eslint-disable-next-line no-restricted-syntax, @typescript-eslint/naming-convention,no-underscore-dangle
  for (const img_ of imgs) {
    img_.setAttribute('style', 'max-width: 100%; height: auto;');
    if (!img_.hasAttribute('width')) {
      img_.setAttribute('width', '500');
    }
    if (!img_.hasAttribute('height')) {
      img_.setAttribute('height', 'auto');
    }
  }

  // remove head
  const head = doc.getElementsByTagName('head');
  if (head.length > 0) {
    head[0].remove();
  }
  // add style to body tag giving it a max-width
  const body = doc.getElementsByTagName('body');
  if (body.length > 0) {
    body[0].setAttribute('style', 'max-width: 90vw;');
  }

  return doc.documentElement.innerHTML;
}
export default extracted;
