import { NewsFilters, NewsResponse } from "@/types/news";

const API_KEY = process.env.NEWS_API_KEY; // Get from newsapi.org
const BASE_URL = 'https://newsapi.org/v2';

if(!API_KEY){
    throw new Error('Missing NEWS_API_KEY')
}

export const newsApi = {
  // Fetch top headlines with filters
  getTopHeadlines: async (filters: NewsFilters = {}): Promise<NewsResponse> => {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      category: filters.category || 'sports',
      country: filters.country || 'us',
      pageSize: '20',
    });

    const response = await fetch(`${BASE_URL}/top-headlines?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // Search for specific articles
  searchArticles: async (query: string): Promise<NewsResponse> => {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      q: query,
      sortBy: 'publishedAt',
      pageSize: '20',
    });

    const response = await fetch(`${BASE_URL}/everything?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};
