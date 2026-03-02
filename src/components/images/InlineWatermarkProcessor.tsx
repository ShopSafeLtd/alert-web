import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useAtomValue } from 'jotai';
import React, { useEffect, useMemo, useRef } from 'react';

interface Props {
  className?: string;
  htmlContent: string;
  onImageClick?: (imageSrc: string, index: number) => void;
}

const InlineWatermarkProcessor: React.FC<Props> = ({
  className,
  htmlContent,
  onImageClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const userReference = useAtomValue(currentUserAtom)?.reference || '';

  const processedHtml = useMemo(() => {
    if (!htmlContent) return htmlContent;
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html');

    // Convert data-align attributes to inline styles (new articles post-backend-fix).
    // Keep the attribute so CSS attribute-selector rules in ViewArticle can also apply.
    const aligned = doc.body.querySelectorAll<HTMLElement>('[data-align]');
    for (const el of aligned) {
      const align = el.dataset.align;
      if (align) {
        const existing = el.getAttribute('style') || '';
        const existingSuffix = existing ? ` ${existing}` : '';
        el.setAttribute('style', `text-align: ${align};${existingSuffix}`);
      }
    }

    // Also convert legacy mce-align-* classes to inline styles (old articles where
    // the backend preserved the class rather than stripping it).
    const alignClassMap: Record<string, string> = {
      'mce-align-center': 'center',
      'mce-align-justify': 'justify',
      'mce-align-left': 'left',
      'mce-align-right': 'right',
    };
    for (const [cls, value] of Object.entries(alignClassMap)) {
      for (const el of doc.body.querySelectorAll<HTMLElement>(`.${cls}`)) {
        const existing = el.getAttribute('style') || '';
        const existingSuffix = existing ? ` ${existing}` : '';
        el.setAttribute('style', `text-align: ${value};${existingSuffix}`);
      }
    }

    return doc.body.innerHTML;
  }, [htmlContent]);

  useEffect(() => {
    console.log('InlineWatermarkProcessor: userReference =', userReference);

    if (!containerRef.current) {
      console.log('InlineWatermarkProcessor: No container ref');
      return;
    }

    if (!userReference) {
      console.log('InlineWatermarkProcessor: No user reference');
      return;
    }

    const container = containerRef.current;

    // Use a timeout to ensure DOM is fully rendered
    const timeout = setTimeout(() => {
      const images = container.querySelectorAll('img');
      console.log('InlineWatermarkProcessor: Found', images.length, 'images');

      for (const [index, img] of images.entries()) {
        if (img.parentElement?.dataset.watermarked === 'true') {
          console.log(`Image ${index} already processed, skipping`);
          continue;
        }

        const processImage = () => {
          // Create wrapper
          const wrapper = document.createElement('div');
          wrapper.dataset.watermarked = 'true';
          console.log(`Adding watermark with text: "${userReference}"`);
          wrapper.style.cssText = `
            position: relative;
            display: inline-block;
            max-width: 100%;
          `;

          // Create watermark overlay
          const overlay = document.createElement('div');
          overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            overflow: hidden;
            z-index: 1;
          `;

          // Add multiple watermark instances in a grid pattern
          for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
              const watermark = document.createElement('span');
              watermark.textContent = userReference.toString();
              watermark.style.cssText = `
                position: absolute;
                left: ${20 + col * 30}%;
                top: ${20 + row * 30}%;
                color: rgba(255, 255, 255, 0.4);
                font-size: 16px;
                font-weight: bold;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
                user-select: none;
                white-space: nowrap;
                transform: rotate(-45deg);
                transform-origin: center center;
                pointer-events: none;
                z-index: 2;
              `;
              overlay.append(watermark);
            }
          }

          // Replace image with wrapped version
          if (img.parentNode) {
            img.parentNode.insertBefore(wrapper, img);
            wrapper.append(img);
            wrapper.append(overlay);

            console.log(`Watermark applied to image ${index}`);
          }

          // Maintain click functionality
          if (onImageClick) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
              onImageClick(img.src, index);
            });
          }
        };

        // Process immediately if image is loaded, otherwise wait for load
        if (img.complete) {
          processImage();
        } else {
          img.addEventListener('load', processImage);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [htmlContent, userReference, onImageClick]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
      ref={containerRef}
    />
  );
};

export default InlineWatermarkProcessor;
