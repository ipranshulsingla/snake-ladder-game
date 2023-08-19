import { useCallback, useRef } from "react";

// It keeps same reference of the function across rerenders. Which make it safe to use in useEffect, React.memo().

const useSafeCallback = <T extends Function>(cb?: T) => {
  const cbRef = useRef(cb);
  cbRef.current = cb;

  const safeCb = useCallback((...args: any[]) => {
    return cbRef.current?.(...args);
  }, []);

  return safeCb as unknown as T;
};

export default useSafeCallback;
