import { useMemo } from "react";
import PropTypes from "prop-types";

export const DOTS = "...";

export const usePaginaton = ({
  siblingCount = 1,
  currentPage,
  totalPageCount,
}) => {
  const paginationRange = useMemo(() => {
    // Core logic here
    const totalPageNumbers = siblingCount + 5;

    // State 1: If number of pages is less than the numbers
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // Caculate the left and right sibling index
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    // Caculate that whether need show left dots, right dots or both of them
    // Don't show dots just when these is just one page number to be inserted between the sibling and the page limit
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // State 2: Show right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    // State 3: Show left dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    // State 4: Show Both left and right dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, middleRange, DOTS, lastPageIndex];
    }
  }, [siblingCount, currentPage, totalPageCount]);
  return paginationRange;
};

function range(start, end) {
  const length = end - start + 1;

  return Array.from({ length }, (value, index) => index + start);
}

usePaginaton.propTypes = {
  siblingCount: PropTypes.any,
  currentPage: PropTypes.any,
  totalPageCount: PropTypes.any,
};
