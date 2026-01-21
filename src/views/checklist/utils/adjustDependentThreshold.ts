import type { ActiveChecklistSection } from '../active-checklist/useActiveChecklist';

/**
 * Adjusts a dependent weight threshold to account for N/A answers.
 *
 * When questions are marked as N/A, they don't contribute to the score.
 * This function proportionally adjusts the threshold based on how many
 * questions were actually answered vs. the total number of questions.
 *
 * @param dependSection - The section that the current section depends on
 * @param threshold - The configured threshold value
 * @returns The adjusted threshold that accounts for N/A answers
 *
 * @example
 * // Section has 5 questions (max weight 10 each), threshold is 20
 * // If 2 questions are N/A, only 3 questions answered (max 30)
 * // Adjusted threshold: 20 * (30/50) = 12
 */
export const adjustDependentThreshold = (
  dependSection: ActiveChecklistSection,
  threshold: number
): number => {
  // Calculate max possible weight for all questions
  const maxPossibleWeight = dependSection.subsections
    .flatMap((sub) =>
      sub.questions.map((q) => {
        const weights = q.weights.map((w) => w.weight);
        return Math.max(...weights, 0);
      })
    )
    .reduce((a, b) => a + b, 0);

  // Calculate max possible weight for answered questions (excluding N/A)
  const maxAnsweredWeight = dependSection.subsections
    .flatMap((sub) =>
      sub.questions.map((q) => {
        if (q.answer === 'N/A') return 0;
        const weights = q.weights.map((w) => w.weight);
        return Math.max(...weights, 0);
      })
    )
    .reduce((a, b) => a + b, 0);

  // Adjust threshold proportionally
  // If all questions are answered: maxAnsweredWeight === maxPossibleWeight, threshold unchanged
  // If some are N/A: threshold scales down proportionally
  // If all are N/A: maxAnsweredWeight = 0, adjustedThreshold = 0
  return maxPossibleWeight > 0
    ? (threshold * maxAnsweredWeight) / maxPossibleWeight
    : threshold;
};
