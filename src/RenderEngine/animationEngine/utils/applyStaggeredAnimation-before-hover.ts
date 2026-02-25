import { animateToVariant, applyVariantAtProgress } from "../animate";

type StaggerDirection = 'ltr' | 'rtl' | 'center';

interface StaggerItem {
  id: string;
  scheduledTime: number;
}

interface ActiveStagger {
  items: StaggerItem[];
  variantName: string;
  startTime: number;
  progress?: { strength: number; variant: string };
  onComplete?: () => void;
  triggeredCount: number;
}

let activeStaggers: ActiveStagger[] = [];

/**
 * Call this in your Lenis RAF loop to process stagger animations
 */
export const rafTick = (now: number) => {
  if (activeStaggers.length === 0) return;

  const toRemove: number[] = [];

  activeStaggers.forEach((stagger, sIndex) => {
    const elapsed = now - stagger.startTime;
    const readyItems = stagger.items
      .slice(stagger.triggeredCount)
      .filter(item => elapsed >= item.scheduledTime);

    readyItems.forEach((item, i) => {
      if (stagger.progress) {
        // 🚨 Progress-driven updates are continuous — apply immediately instead
        // so skip here
      } else {
        animateToVariant(item.id, stagger.variantName, {
          onComplete:
            stagger.triggeredCount + i === stagger.items.length - 1
              ? stagger.onComplete
              : undefined,
        });
      }
    });

    stagger.triggeredCount += readyItems.length;

    if (stagger.triggeredCount === stagger.items.length) {
      toRemove.push(sIndex);
    }
  });

  // Remove finished staggers
  activeStaggers = activeStaggers.filter((_, i) => !toRemove.includes(i));
};

/**
 * Apply staggered animation to a list of elements
 * Automatically cancels any ongoing stagger affecting the same elements
 */
export function applyStaggeredAnimation({
  charIds,
  variantName,
  delay = 0.03,
  direction = 'ltr',
  onComplete,
  progress
}: {
  charIds: string[];
  variantName: string;
  delay?: number;
  direction?: StaggerDirection;
  onComplete?: () => void;
  progress?: { strength: number; variant: string };
}) {
  if (!charIds.length) return;

  // Cancel any active stagger affecting these elements
  activeStaggers = activeStaggers.filter(
    s => !s.items.some(item => charIds.includes(item.id))
  );

  let orderedIds = [...charIds];
  if (direction === 'rtl') orderedIds.reverse();
  else if (direction === 'center') {
    const center = Math.floor(orderedIds.length / 2);
    orderedIds = orderedIds
      .map((id, i) => ({ id, dist: Math.abs(i - center) }))
      .sort((a, b) => a.dist - b.dist)
      .map(x => x.id);
  }

  const items: StaggerItem[] = orderedIds.map((id, i) => ({
    id,
    scheduledTime: i * delay * 1000
  }));

  const stagger: ActiveStagger = {
    items,
    variantName,
    startTime: performance.now(),
    progress,
    onComplete,
    triggeredCount: 0
  };

  // If it's progress-driven, apply immediately instead of waiting for RAF
  if (progress) {
  //   items.forEach((item, i) => {
  //     applyVariantAtProgress(item.id, progress.variant, progress.strength - items[i].scheduledTime)
  // });
  items.forEach((item, i) => {
  const count = items.length;

   const staggerFactor = 1 / (count - 1); // auto distribute

  // Define start and end for this item (normalized to [0,1])
  const start = (i / count) * staggerFactor;   // e.g. 0, 0.2, 0.4...
  const end = Math.min(1, start + (1 - staggerFactor));

  // Remap global progress into local progress
  let localProgress =
    (progress.strength - start) / (end - start);

  // Clamp
  localProgress = Math.max(0, Math.min(1, localProgress));

  applyVariantAtProgress(item.id, progress.variant, localProgress);

});

  } else {
    activeStaggers.push(stagger);
  }
}


