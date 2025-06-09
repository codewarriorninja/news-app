import { create } from 'zustand';
import { Article, NewsFilters } from '../types/news';

interface NewsStore {
  // State
  bookmarkedArticles: Article[];
  currentFilters: NewsFilters;
  isOffline: boolean;
  
  // Actions
  bookmarkArticle: (article: Article) => void;
  removeBookmark: (articleUrl: string) => void;
  updateFilters: (filters: Partial<NewsFilters>) => void;
  setOfflineStatus: (status: boolean) => void;
  isBookmarked: (articleUrl: string) => boolean;
}

export const useNewsStore = create<NewsStore>((set, get) => ({
  // Initial state
  bookmarkedArticles: [],
  currentFilters: { category: 'sports', country: 'us' },
  isOffline: false,

  // Bookmark an article
  bookmarkArticle: (article) =>
    set((state) => ({
      bookmarkedArticles: [...state.bookmarkedArticles, article],
    })),

  // Remove bookmark
  removeBookmark: (articleUrl) =>
    set((state) => ({
      bookmarkedArticles: state.bookmarkedArticles.filter(
        (article) => article.url !== articleUrl
      ),
    })),

  // Update search/filter criteria
  updateFilters: (filters) =>
    set((state) => ({
      currentFilters: { ...state.currentFilters, ...filters },
    })),

  // Set offline status
  setOfflineStatus: (status) =>
    set({ isOffline: status }),

  // Check if article is bookmarked
  isBookmarked: (articleUrl) =>
    get().bookmarkedArticles.some((article) => article.url === articleUrl),
}));