function extracted(html: string | undefined): string {
  const doc = new DOMParser().parseFromString(html || '', 'text/html');
  const links = doc.getElementsByTagName('a');
  const currentUrl = window.location.href;

  const currentUrlSplit = currentUrl.split('/app/');
  if (currentUrlSplit.length > 1) {
    currentUrlSplit[0] = `${currentUrlSplit[0]}/app`;
  }

  // Process anchor links
  // eslint-disable-next-line no-underscore-dangle
  for (const link_ of links) {
    const href = link_.getAttribute('href');
    if (
      href &&
      (href.startsWith('../../offenders/') ||
        href.startsWith('../../incidents/') ||
        href.startsWith('../offenders/') ||
        href.startsWith('../incidents/'))
    ) {
      if (href.startsWith('../..'))
        link_.setAttribute('href', href.replace('../..', currentUrlSplit[0]));
      else link_.setAttribute('href', href.replace('..', currentUrlSplit[0]));
    }
  }

  // Process images
  const imgs = doc.getElementsByTagName('img');
  // eslint-disable-next-line no-underscore-dangle
  for (const img_ of imgs) {
    // If the image is generated from a PDF, skip the default width addition.
    if (Object.hasOwn(img_.dataset, 'pdf')) {
      continue;
    }
    // For non-PDF images, apply the default styling.
    img_.setAttribute('style', 'max-width: 100%; height: auto;');
    if (!img_.hasAttribute('width')) {
      img_.setAttribute('width', '300');
    }
    if (!img_.hasAttribute('height')) {
      img_.setAttribute('height', 'auto');
    }
  }

  // Normalise alignment for server round-trip.
  // The server strips both style= and class= attributes (XSS protection),
  // but preserves data-* attributes. Encode alignment in data-align so it
  // survives the sanitiser, then decode it client-side for display/editing.
  const alignClasses = [
    'mce-align-center',
    'mce-align-left',
    'mce-align-right',
    'mce-align-justify',
  ] as const;
  const alignClassToValue: Record<string, string> = {
    'mce-align-center': 'center',
    'mce-align-justify': 'justify',
    'mce-align-left': 'left',
    'mce-align-right': 'right',
  };

  // Class-based alignment (TinyMCE formats override working correctly)
  for (const cls of alignClasses) {
    const elements = doc.body.querySelectorAll<HTMLElement>(`.${cls}`);
    for (const el of elements) {
      el.dataset.align = alignClassToValue[cls];
      el.classList.remove(...alignClasses);
    }
  }

  // Style-based alignment (TinyMCE fallback in some edge cases)
  const allStyleEls = doc.body.querySelectorAll<HTMLElement>('[style]');
  for (const el of allStyleEls) {
    const style = el.getAttribute('style') || '';
    const match = /text-align\s*:\s*(center|left|right|justify)/i.exec(style);
    if (match) {
      el.dataset.align = match[1].toLowerCase();
      const newStyle = style
        .replaceAll(/text-align\s*:\s*\w+\s*;?\s*/gi, '')
        .trim();
      if (newStyle) {
        el.setAttribute('style', newStyle);
      } else {
        el.removeAttribute('style');
      }
    }
  }

  // Remove head.
  const head = doc.getElementsByTagName('head');
  if (head.length > 0) {
    head[0].remove();
  }

  return doc.body.innerHTML;
}
export default extracted;

/**
 * Converts data-align attributes back to mce-align-* classes so TinyMCE
 * can show the correct alignment state when re-opening an article for editing.
 */
export function prepareHtmlForEditor(html: string): string {
  const doc = new DOMParser().parseFromString(html || '', 'text/html');
  const elements = doc.body.querySelectorAll<HTMLElement>('[data-align]');
  for (const el of elements) {
    const align = el.dataset.align;
    if (align && ['center', 'justify', 'left', 'right'].includes(align)) {
      el.classList.add(`mce-align-${align}`);
      delete el.dataset.align;
    }
  }
  return doc.body.innerHTML;
}
