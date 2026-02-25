/**
 * Calculate the card width that aligns with the grid background.
 */
export function getAlignedCardWidth(wrapperWidth, cardsPerRow, cellWidth = 12, gap = 2) {
  if (!wrapperWidth || wrapperWidth <= 0) return 0;

  const step = cellWidth + gap;

  // Total grid columns that fit in wrapper
  const totalCols = Math.floor(wrapperWidth / step);

  // Columns per card
  const colsPerCard = Math.floor(totalCols / cardsPerRow);

  // Add the final right-side half-gap correction
  const cardWidth = colsPerCard * step - gap + 1;

  return cardWidth;
}

/**
 * Calculate a grid-aligned card layout with no cumulative rounding drift.
 */
export function calculateCardLayout(
  wrapperWidth,
  cardsPerRow,
  cardGap = 14,
) {
  if (!wrapperWidth || wrapperWidth <= 0 || cardsPerRow <= 0) {
    return { cardWidth: 0, colsPerCard: 0, usedWidth: 0, offsetLeft: 0 };
  }

  let steps = Math.floor(wrapperWidth / (cardGap)) * cardGap;

  let gridWidth = (steps - (cardGap* (cardsPerRow-1)));
  

  const cardWidth =  gridWidth / cardsPerRow;

  return { cardWidth };
}
