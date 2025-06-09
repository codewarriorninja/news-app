import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { newsApi } from '../services/newsApi';
import { useNewsStore } from '../store/newsStore';
import { NewsResponse } from '../types/news';

// Hook for fetching top headlines
export const useTopHeadlines = (): UseQueryResult<NewsResponse, Error> => {
  const { currentFilters } = useNewsStore();
  
  return useQuery<NewsResponse, Error>({
    queryKey: ['headlines', currentFilters],
    queryFn: () => newsApi.getTopHeadlines(currentFilters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook for searching articles
export const useSearchArticles = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => newsApi.searchArticles(query),
    enabled: query.length > 2, // Only search if query is meaningful
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};