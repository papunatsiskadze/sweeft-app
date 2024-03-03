import React, {useContext, useState} from 'react';
import {CacheContext} from "../providers/ChacheProvider";
import {UnsplashImage} from "../utils/api";
import ImageList from "../components/ImageList";

function History() {

  const {getAllCacheKeys, getDataFromCache} = useContext(CacheContext);
  const cacheKeys = getAllCacheKeys();
  const [selectedCacheKey, setSelectedCacheKey] = useState('');
  const [images, setImages] = useState<UnsplashImage[]>([]);


  const handleCacheKeyClick = (key: string) => {
    setSelectedCacheKey(key);
    const data = getDataFromCache(key);
    if (data) {
      setImages(data.results)
    }
  };

  return (
    <div>
      <h2>History Page</h2>

      <div>
        <h3>Cache Keys:</h3>
        <ul>
          {cacheKeys.map((key, index) => (
            <li key={key} onClick={() => handleCacheKeyClick(key)} style={{cursor: 'pointer'}}>
              {key}
            </li>
          ))}
        </ul>
      </div>
      {selectedCacheKey && (
        <div>
          <h3>Images for Cache Key: {selectedCacheKey}</h3>
          <ImageList initialImages={images} queryString={selectedCacheKey}/>
        </div>
      )}
    </div>
  );
}

export default History;
