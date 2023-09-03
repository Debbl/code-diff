import { useEffect, useState } from "react";

// fix next.js hydration issue
const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

export default useHasHydrated;
