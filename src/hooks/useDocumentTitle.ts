import { useEffect } from 'react';

const BASE_TITLE = 'CC Lab @ XJTLU';

/**
 * Hook to dynamically set the document title
 * @param title - Page-specific title (will be appended to base title)
 * @param fullTitle - Optional full title override (ignores base title)
 */
export function useDocumentTitle(title?: string, fullTitle?: string) {
  useEffect(() => {
    const prevTitle = document.title;

    if (fullTitle) {
      document.title = fullTitle;
    } else if (title) {
      document.title = `${title} | ${BASE_TITLE}`;
    } else {
      document.title = BASE_TITLE;
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, fullTitle]);
}
