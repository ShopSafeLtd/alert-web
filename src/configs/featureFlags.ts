/**
 * Feature flags for gradual rollout of new features.
 *
 * Usage:
 * - Set flag to `true` to enable the feature
 * - Set flag to `false` to disable the feature (use old implementation)
 *
 * These flags can be overridden by environment variables for production rollout:
 * - REACT_APP_FEATURE_RELAY_PAGINATION_OFFENDERS
 * - REACT_APP_FEATURE_RELAY_PAGINATION_INCIDENTS
 */

export const FEATURE_FLAGS = {
  /**
   * Use Relay cursor-based pagination for OffenderGrid.
   * When enabled, uses listOffendersRelay query instead of listOffendersForGrid.
   */
  USE_RELAY_PAGINATION_OFFENDERS:
    process.env.REACT_APP_FEATURE_RELAY_PAGINATION_OFFENDERS === 'true' || true, // Changed to true for testing

  /**
   * Use Relay cursor-based pagination for IncidentTable.
   * When enabled, uses incidentsRelay query instead of listIncidentsForTable.
   */
  USE_RELAY_PAGINATION_INCIDENTS:
    process.env.REACT_APP_FEATURE_RELAY_PAGINATION_INCIDENTS === 'true' || true, // Changed to true for testing
} as const;
