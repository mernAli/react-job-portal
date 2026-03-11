import { useState, useMemo, useEffect } from "react";

const usePagination = (items, itemsPerPageDefault = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);

  // Reset to page 1 whenever items or itemsPerPage changes
  // This handles filter changes automatically
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length, itemsPerPage]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Slice items for current page
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [items, currentPage, itemsPerPage]);

  // Page numbers to display (max 5 visible)
  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Show pages around current page
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);

    // Adjust if near the end
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top smoothly on page change
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToNext = () => goToPage(currentPage + 1);
  const goToPrev = () => goToPage(currentPage - 1);

  // Summary text e.g. "Showing 11–20 of 87 jobs"
  const summaryText = items.length === 0
    ? "No results"
    : `Showing ${(currentPage - 1) * itemsPerPage + 1}–${Math.min(currentPage * itemsPerPage, items.length)} of ${items.length} jobs`;

  return {
    currentPage,
    totalPages,
    paginatedItems,
    pageNumbers,
    itemsPerPage,
    setItemsPerPage,
    goToPage,
    goToNext,
    goToPrev,
    summaryText,
  };
};

export default usePagination;