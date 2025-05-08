import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function UseTop() {
  const pathname = useLocation();
  useEffect(
    function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [pathname]
  );
  return null;
}
