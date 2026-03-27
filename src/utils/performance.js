/**
 * Performance Optimization Registry — Day 33
 *
 * This file documents all React performance optimizations
 * applied throughout the ZECPATH application.
 */

/**
 * Components wrapped with React.memo:
 * - StatCard        → only re-renders when stat data changes
 * - JobCard         → only re-renders when job data or isApplied changes
 * - FilterPanel     → only re-renders when filter values change
 * - FilterSection   → only re-renders when title or children change
 * - Checkbox        → only re-renders when checked state changes
 *
 * Hooks used for optimization:
 * - useCallback in JobCard     → stable handler references
 * - useCallback in BrowseJobs  → stable handleApply, handleSave, handleSort
 * - useMemo in BrowseJobs      → sortedJobs recalculated only when deps change
 * - useMemo in useJobFilters   → filteredJobs and activeFilters (Day 26)
 * - useMemo in usePagination   → paginatedItems and pageNumbers (Day 27)
 *
 * Static data moved outside components:
 * - FilterPanel: JOB_TYPES, WORK_MODES, EXPERIENCE_LEVELS, SALARY_OPTIONS
 * - StatCard: COLOR_MAP
 * - FilterPanel helper arrays (previously recreated on every render)
 *
 * Code splitting (automatic via React.lazy in App.jsx):
 * - Every page is a separate JS chunk
 * - Admin pages load only when admin logs in
 * - Payment pages load only when user visits checkout
 *
 * Bundle optimizations:
 * - No full lodash import (using native JS instead)
 * - No chart library (custom CSS charts in AdminAnalytics)
 * - All imports are named imports (tree-shakeable)
 */

export const PERF_NOTES = {
  memoizedComponents: ["StatCard", "JobCard", "FilterPanel", "FilterSection", "Checkbox"],
  useCallbackComponents: ["JobCard", "BrowseJobs"],
  useMemoComponents: ["BrowseJobs", "useJobFilters", "usePagination"],
  staticDataMoved: ["FilterPanel", "StatCard"],
  lazyRoutes: ["All pages in App.jsx"],
};