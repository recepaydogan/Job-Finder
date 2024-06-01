import { useEffect } from "react";

function useClickOutside({ itemRef, setItem }) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!itemRef.current?.contains(e.target)) {
        setItem(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [itemRef, setItem]);
}

export default useClickOutside;
