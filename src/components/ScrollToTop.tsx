import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAV_OFFSET = 96;

/**
 * Resets scroll position on route change — React Router doesn't do this
 * itself. When the new URL carries a hash (e.g. navigating from /about to
 * /#features), the target section may not exist yet on the first render
 * (the route's content is still mounting), so this retries via
 * requestAnimationFrame until it appears instead of silently giving up.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
          window.scrollTo({ top, behavior: "smooth" });
        } else if (attempts < 15) {
          attempts += 1;
          requestAnimationFrame(tryScroll);
        }
      };
      tryScroll();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
