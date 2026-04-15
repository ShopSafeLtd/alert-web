import type { AvailableDashboardElements } from '#/state/dashboard-model';

import { useCallback, useEffect, useRef } from 'react';

interface UseAdminWidgetAutoHeightResult {
  isAdminWidget: (elementType: AvailableDashboardElements) => boolean;
  registerRef: (itemId: string) => (el: HTMLDivElement | null) => void;
}

/**
 * Overrides react-grid-layout item heights when admin widget content
 * exceeds the grid-assigned height, then shifts items below to prevent overlap.
 *
 * Works by placing a measurement div (flexShrink: 0) inside the grid item wrapper.
 * This div cannot be compressed by the flex container, so its offsetHeight always
 * reflects the true content height — even when the grid item is smaller.
 */
export const useAdminWidgetAutoHeight = (
  adminWidgetTypes: ReadonlySet<string>
): UseAdminWidgetAutoHeightResult => {
  const refsMap = useRef<Map<string, HTMLDivElement>>(new Map());
  const observerRef = useRef<ResizeObserver | null>(null);
  const rafId = useRef<number>(0);

  const isAdminWidget = useCallback(
    (elementType: AvailableDashboardElements): boolean =>
      adminWidgetTypes.has(elementType),
    [adminWidgetTypes]
  );

  useEffect(() => {
    const adjustAllItems = () => {
      const anyEl = refsMap.current.values().next().value;
      if (!anyEl) return;

      const container = anyEl.closest('.react-grid-layout');
      if (!container) return;

      const gridItems = [
        ...container.querySelectorAll<HTMLElement>(':scope > .react-grid-item'),
      ];

      // Reset all manual height/top overrides so we measure from RGL originals
      for (const item of gridItems) {
        if (item.dataset.originalTop !== undefined) {
          item.style.top = item.dataset.originalTop;
        }
        if (item.dataset.originalHeight !== undefined) {
          item.style.height = item.dataset.originalHeight;
        }
      }

      const itemData = gridItems.map((item) => {
        if (item.dataset.originalTop === undefined) {
          item.dataset.originalTop = item.style.top;
        }
        if (item.dataset.originalHeight === undefined) {
          item.dataset.originalHeight = item.style.height;
        }
        return {
          el: item,
          originalTop: Number.parseFloat(item.dataset.originalTop || '0'),
        };
      });

      itemData.sort((a, b) => a.originalTop - b.originalTop);

      // First pass: grow admin widget grid items to fit content.
      // The measurement div has flexShrink:0, so its offsetHeight is the
      // true content height regardless of the grid item's size.
      // Compare against the grid item's CSS height (content-box value).
      for (const { el } of itemData) {
        const measureDiv = el.querySelector<HTMLElement>(
          '[data-admin-auto-height]'
        );
        if (!measureDiv) continue;

        const contentHeight = measureDiv.offsetHeight;
        const availableHeight = Number.parseInt(el.style.height || '0', 10);

        // Small buffer so cards don't sit flush against the grid item edge.
        const neededHeight = contentHeight + 10;
        if (neededHeight > availableHeight) {
          el.style.height = `${neededHeight}px`;
        }
      }

      // Second pass: shift items down to prevent overlap, preserving
      // the original gap between items from the RGL layout.
      for (let i = 0; i < itemData.length; i++) {
        const current = itemData[i];
        let maxShift = 0;

        for (let j = 0; j < i; j++) {
          const above = itemData[j];

          // Only shift if items share horizontal space
          const aboveLeft = above.el.offsetLeft;
          const aboveRight = aboveLeft + above.el.offsetWidth;
          const currentLeft = current.el.offsetLeft;
          const currentRight = currentLeft + current.el.offsetWidth;

          if (currentLeft >= aboveRight || currentRight <= aboveLeft) continue;

          // Calculate the original gap between these two items
          const aboveOriginalHeight = Number.parseInt(
            above.el.dataset.originalHeight || '0',
            10
          );
          const originalGap =
            current.originalTop - (above.originalTop + aboveOriginalHeight);

          // Calculate where this item should be to preserve that gap
          const aboveCurrentTop = Number.parseFloat(above.el.style.top || '0');
          const aboveCurrentHeight = Number.parseInt(
            above.el.style.height || '0',
            10
          );
          const aboveCurrentBottom = aboveCurrentTop + aboveCurrentHeight;
          const desiredTop = aboveCurrentBottom + originalGap;
          const neededShift = desiredTop - current.originalTop;

          if (neededShift > 0) {
            maxShift = Math.max(maxShift, neededShift);
          }
        }

        if (maxShift > 0) {
          current.el.style.top = `${current.originalTop + maxShift}px`;
        }
      }
    };

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(adjustAllItems);
    });

    observerRef.current = observer;

    for (const [, el] of refsMap.current) {
      observer.observe(el);
    }

    return () => {
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
      observerRef.current = null;
    };
  }, []);

  const registerRef = useCallback(
    (itemId: string) => (el: HTMLDivElement | null) => {
      if (el) {
        el.dataset.adminAutoHeight = 'true';
        refsMap.current.set(itemId, el);
        observerRef.current?.observe(el);
      } else {
        const existing = refsMap.current.get(itemId);
        if (existing) {
          observerRef.current?.unobserve(existing);
          refsMap.current.delete(itemId);
        }
      }
    },
    []
  );

  return { isAdminWidget, registerRef };
};
