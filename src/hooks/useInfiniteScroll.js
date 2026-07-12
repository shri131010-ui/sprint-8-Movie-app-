import { useEffect, useRef } from "react";

function useInfiniteScroll(callback) {
  const observer = useRef(null);

  const lastElementRef = (node) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return lastElementRef;
}

export default useInfiniteScroll;