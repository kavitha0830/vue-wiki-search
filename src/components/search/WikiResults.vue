<template>
    <div class="search-results">
        <div v-if="loading">
          <Skeleton />
        </div>
        <div v-if="error" class="error">{{ error }}</div>

        <ul>
          <li v-for="result in results" :key="result.pageid">
            <a
              :href="' https://en.wikipedia.org/?curid=' + result.pageid"
              target="_blank"
              >{{ result.title }}</a
            >
            <p v-html="result.snippet"></p>
          </li>
        </ul>

        <p
            v-if="results.length === 0 && searchQuery && !loading && !error"
            class="no-result"
        >
            No results found.
        </p>
    </div>
</template>

<script setup lang='ts'>
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/stores/searchStore';

import Skeleton from './Skeleton.vue';

const searchStore = useSearchStore()
const { results, searchQuery, loading, error } = storeToRefs(searchStore);
</script>

<style scoped lang='scss'>
.search-results {
  margin-top: 1rem;
  padding: 0 1rem;

  .error {
    color: red;
  }

  .error, .no-result {
      text-align: center;
      margin-top: 5rem;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 20px;
    a {
      font-size: 1.3rem;
      padding: 0
    }
    p {
      font-size: 1rem;
    }
  }
}
</style>
