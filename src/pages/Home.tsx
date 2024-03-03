import React, {useContext, useEffect, useState} from 'react';
import {fetchImages, searchImages, UnsplashImage} from "../utils/api";
import {CacheContext} from "../providers/ChacheProvider";
import ImageList from "../components/ImageList";

function Home() {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const {addToCache, getDataFromCache} = useContext(CacheContext);


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchImages(1);
        setImages(data);
        console.log('data', data)
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      const cachedData = getDataFromCache(searchTerm);
      if (cachedData) {
        setImages(cachedData.results)
        console.log('Using cached data for Home:', cachedData);
      } else {
        const data = await searchImages(searchTerm);
        addToCache(searchTerm, data)
        setImages(data.results);
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>Home Page</h2>
      <div>
        <input
          type="text"
          onChange={handleSearchChange}
          value={searchTerm}
          placeholder="Search images..."
        />
      </div>
      <ImageList initialImages={images} queryString={searchTerm}/>
    </div>
  );
}

export default Home;
