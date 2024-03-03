import React, {createContext, ReactNode, useState} from 'react';
import {ResponseData, UnsplashImage} from "../utils/api";

export interface ContextType {
  addToCache: (key: string, data: ResponseData) => void;
  getDataFromCache: (key: string) => ResponseData;
  getAllCacheKeys: () => string[];
};

const contextDefaultValues: ContextType = {
  addToCache: () => {
  },
  getDataFromCache: (): ResponseData => {
    return {
      total: 0,
      total_pages: 0,
      results: []
    }
  },
  getAllCacheKeys: (): string[] => [],
};

export const CacheContext = createContext<ContextType>(contextDefaultValues);

interface CacheData {
  [key: string]: ResponseData;
}

export const CacheProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [cache, setCache] = useState<CacheData>({});

  // Function to set data in cache
  const addToCache = (key: string, data: ResponseData) => {
    setCache(prevCache => ({...prevCache, [key]: data}));
  };

  const getDataFromCache = (key: string) => cache[key];

  const getAllCacheKeys = () => Object.keys(cache);

  return (
    <CacheContext.Provider value={{addToCache, getDataFromCache, getAllCacheKeys}}>
      {children}
    </CacheContext.Provider>
  );
};
