import { defineStore } from 'pinia';
import { wikiSearch } from '../services/apiService';

interface searchState {
  searchQuery: string;
  results: Array<Object>;
  loading: boolean;
  error: string | null;
  searchHistory: Array<string>;
}

export const useSearchStore = defineStore('search', {
  state: (): searchState => {
    return {
      searchQuery: '',
      results: [],
      loading: false,
      error: null,
      searchHistory: [],
    };
  },

  actions: {
    async fetchResults() {
      this.results = [];
      if (!this.searchQuery) {
        this.error = 'Search query cannot be empty!';
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        this.results = await wikiSearch(this.searchQuery);
        if (!this.results || this.results.length === 0) {
          this.error = 'No results found.';
        }
       else {
        this.addToHistory(this.searchQuery);  // Save to search history
      }
      } catch (err) {
        console.error('Error fetching data:', err);
        this.error = 'Failed to fetch search results. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    addToHistory(query) { // push search keyword to searchHistory array
      if (!this.searchHistory.includes(query)) {
        this.searchHistory.push(query);
      }
    },
  },
});
