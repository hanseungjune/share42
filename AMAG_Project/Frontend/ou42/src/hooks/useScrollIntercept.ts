import { useCallback, useEffect, useRef } from "react";

const useScrollIntercept = (loadMore: () => Promise<void>) => {
  const loader = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entities: any) => {
      const target = entities[0];
      if (target.isIntersecting) {
        loadMore();
      }
    },
    [loadMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  return loader;
};

export default useScrollIntercept;
