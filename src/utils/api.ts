
const API_URL = 'https://api.unsplash.com';

export interface UnsplashImage {
  id: string;
  alt_description: string;
  likes: number;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
}

export interface ResponseData {
  total: number,
  total_pages: number,
  results: UnsplashImage[]
}

export interface StatisticsData {
  id: string,
  downloads: {
    total: number
  },
  views: {
    total: number
  },
  likes: {
    total: number
  },
}


const header = {
  headers: {
    Authorization: 'Client-ID -GLApvi2jhqHzeelh_A6H2aT9do1wwve6yiYDrDZ_NI',
  },
}

export async function fetchImages(pageNumber: number) {
  try {
    const response = await fetch(`${API_URL}/photos?per_page=20&order_by=popular&page=${pageNumber}`, header);
    const data: UnsplashImage[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

export async function searchImages(searchQuery: string | undefined, page = 1) {
  try {
    const response = await fetch(`${API_URL}/search/photos?per_page=20&order_by=latest&query=${searchQuery}&page=${page}`, header);
    const data: ResponseData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

export async function fetchImageDetails(id: string) {
  try {
    const response = await fetch(`${API_URL}/photos/${id}/statistics`, header);
    const data: StatisticsData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching images details:', error);
    throw error;
  }
}
