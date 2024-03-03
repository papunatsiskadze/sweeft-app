// ImageList.tsx
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {fetchImageDetails, fetchImages, searchImages, StatisticsData, UnsplashImage} from '../utils/api';

interface ImageListProps {
  initialImages: UnsplashImage[];
  queryString?: string;
}

const ImageList: React.FC<ImageListProps> = ({initialImages, queryString}) => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);
  const [selectedImageDetails, setSelectedImageDetails] = useState<StatisticsData | null>(null);

  const fetchData = useCallback(async () => {
    if (isLoading) return;
    if (!queryString) {
      fetchImages(page).then(data => {
        setImages((prevImages) => [...prevImages, ...data]);
        setPage((prevIndex) => prevIndex + 1);
      })
    } else {
      searchImages(queryString, page).then(data => {
        setImages((prevImages) => [...prevImages, ...data.results]);
        if (page < data.total_pages) {
          setPage((prevIndex) => prevIndex + 1);
        }
      })
    }
    setIsLoading(false);
  }, [page, initialImages]);

  useEffect(() => {
    setImages(initialImages)
    setInitialLoad(false)
  }, [initialImages]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        if (initialLoad) return;
        fetchData();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchData, initialLoad]);
  const handleImageClick = (image: UnsplashImage) => {
    setSelectedImage(image);
    try {
      fetchImageDetails(image.id).then(data => {
        console.log(111, data)
        setSelectedImageDetails(data);
      });
    } catch (error) {
      console.error('Error fetching image details:', error);
    }
  };
  return (
    <div>
      <div className="image-container">
        {images.map((image) => (
          <div key={image.id}>
            <img key={image.id} src={image.urls.small}
                 alt={image.alt_description} className="image-item"
                 onClick={() => handleImageClick(image)}/>
            {selectedImage && selectedImage.id === image.id && (
              <div className="image-details">
                <p>Likes: {selectedImageDetails?.likes.total}</p>
                <p>Downloads: {selectedImageDetails?.downloads.total}</p>
                <p>Views: {selectedImageDetails?.views.total}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div ref={observerRef}>{isLoading && <div>loading</div>}</div>
    </div>
  );
};

export default ImageList;
