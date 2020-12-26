import { RefObject, useEffect } from "react";

const useClickOutSide = (ref: RefObject<HTMLElement>, callback: Function) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // event.target as HTMLElement
      const target: any = event.target;
      if (!ref.current || ref.current.contains(target)) {
        return;
      }
      callback(listener);
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [ref]);
};

export default useClickOutSide;
