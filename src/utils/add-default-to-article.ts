function extracted(html: string | undefined): string {
  const doc = new DOMParser().parseFromString(html || '', 'text/html');
  const imgs = doc.getElementsByTagName('img');
  // eslint-disable-next-line no-restricted-syntax, @typescript-eslint/naming-convention,no-underscore-dangle
  for (const img_ of imgs) {
    if (!img_.hasAttribute('width')) {
      img_.setAttribute('width', '300');
    }
    if (!img_.hasAttribute('height')) {
      img_.setAttribute('height', 'auto');
    }
  }
  return doc.documentElement.innerHTML;
}
export default extracted;
