import { useEffect, useRef } from "react";

/**
 * useInfiniteScroll - Hook to automatically hit your function on page scroll
 * @param {function} func - The function to hit
 * @param {Array} items - The list of items
 * @return {null}
 */

function useInfiniteScroll(func, items) {
  const funcRef = useRef(func);
  const prevPageHeight = useRef(document.documentElement.scrollHeight);

  // Adding event listener for scroll
  const addScrollEventListener = () => {
    window.addEventListener("scroll", () => {
      // Current height of our scroll bar
      const currScrollHeight =
        Math.round(window.scrollY + window.innerHeight) + 1;
      // Total height of page
      const pageHeight = document.documentElement.scrollHeight;

      // If current height is greater than scroll bar height
      if (currScrollHeight >= pageHeight) {
        // This line is written for preventing to call the function multiple times
        // It ensures that the function is called only once
        // Remove this line and you will see your api being called twice
        if (prevPageHeight.current == pageHeight) return;
        prevPageHeight.current = pageHeight;
        funcRef.current();
      }
    });
  };

  useEffect(() => {
    funcRef.current();
    addScrollEventListener();
  }, []);

  // Updating function ref on change on state of items
  useEffect(() => {
    funcRef.current = func;
  }, [items]);

  return null;
}

export default useInfiniteScroll;