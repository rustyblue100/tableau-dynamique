// useInterval short polling.js
import { useEffect, useRef, useState } from "react";

export function useRelaxedInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    //running is local to each iteration of this effect
    //so won't pollute anything if the user starts polling again
    let running = false;
    let savedTimeout = null;

    const tick = async () => {
      if (running) {
        await savedCallback.current();
      }

      if (running) {
        savedTimeout = setTimeout(tick, delay);
      }
    };

    const stop = () => {
      running = false;
      const timeout = savedTimeout;

      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };

    if (delay !== null) {
      running = true;
      savedTimeout = setTimeout(tick, delay);
      return stop;
    }
  }, [delay]);
}

export function useViewport() {
  const [width, setWidth] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }
  }, []);

  // Return the width so we can use it in our components
  return { width };
}
