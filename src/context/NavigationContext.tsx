import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type PageRoute =
  | 'home'
  | 'admission'
  | 'result-checker'
  | 'gallery'
  | 'news'
  | 'contact'
  | 'admin'
  | 'admin-settings'
  | 'admin-admissions'
  | 'admin-results'
  | 'admin-gallery'
  | 'admin-news'
  | 'admin-pins'
  | 'admin-help';

interface NavigationContextType {
  currentPage: PageRoute;
  params: Record<string, string>;
  navigateTo: (page: PageRoute, params?: Record<string, string>) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

function parseHashOrPath(): { page: PageRoute; params: Record<string, string> } {
  let path = window.location.hash.replace(/^#\/?/, '') || window.location.pathname.replace(/^\//, '');
  if (!path) return { page: 'home', params: {} };

  // Strip query string
  const [cleanPath, queryString] = path.split('?');
  const params: Record<string, string> = {};
  if (queryString) {
    const urlParams = new URLSearchParams(queryString);
    urlParams.forEach((val, key) => {
      params[key] = val;
    });
  }

  const routeMap: Record<string, PageRoute> = {
    '': 'home',
    'home': 'home',
    'admission': 'admission',
    'result-checker': 'result-checker',
    'gallery': 'gallery',
    'news': 'news',
    'contact': 'contact',
    'admin': 'admin',
    'admin/dashboard': 'admin',
    'admin/settings': 'admin-settings',
    'admin/admissions': 'admin-admissions',
    'admin/results': 'admin-results',
    'admin/gallery': 'admin-gallery',
    'admin/news': 'admin-news',
    'admin/pins': 'admin-pins',
    'admin/help': 'admin-help',
  };

  const matched = routeMap[cleanPath] || (cleanPath.startsWith('admin') ? 'admin' : 'home');
  return { page: matched, params };
}

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [current, setCurrent] = useState<{ page: PageRoute; params: Record<string, string> }>(() =>
    parseHashOrPath()
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrent(parseHashOrPath());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (page: PageRoute, newParams?: Record<string, string>) => {
    const routeToPath: Record<PageRoute, string> = {
      'home': '/',
      'admission': '/admission',
      'result-checker': '/result-checker',
      'gallery': '/gallery',
      'news': '/news',
      'contact': '/contact',
      'admin': '/admin',
      'admin-settings': '/admin/settings',
      'admin-admissions': '/admin/admissions',
      'admin-results': '/admin/results',
      'admin-gallery': '/admin/gallery',
      'admin-news': '/admin/news',
      'admin-pins': '/admin/pins',
      'admin-help': '/admin/help',
    };

    const targetPath = routeToPath[page] || '/';
    // Update hash so it works in iframes and static file servers without rewriting
    window.location.hash = targetPath === '/' ? '' : targetPath;
    setCurrent({ page, params: newParams || {} });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage: current.page,
        params: current.params,
        navigateTo,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
