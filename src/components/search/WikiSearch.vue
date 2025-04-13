<template>
  <div class="search-header">
    <div class="query-field">
      <h1>WikiSearch</h1>
      <InputGroup>
        <InputText
          type="text"
          v-model="searchQuery"
          placeholder="Search Wikipedia..."
          @keyup.enter="debouncedFetchResults"
          @keypress="debouncedFetchResults"
        />
        <Button
          label="GO"
          v-tooltip="'Click for results'"
          @click="debouncedFetchResults"
          :disabled="loading"
        />
      </InputGroup>
    </div>
    <div class="search-log">
      <Button label="History" :disabled="searchHistory.length === 0" icon="pi pi-history" v-tooltip.left="'Search history'" @click="toggle" />
      <Popover ref="op">
        <div>
          <div>
            <ul>
              <li else v-for="(keyword, index) in sortSearchHistory"  :key="index">
                <div>
                  <span>{{ keyword }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Popover>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/stores/searchStore';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import Skeleton from 'primevue/skeleton';
import Popover from 'primevue/popover';

// Access the store
const searchStore = useSearchStore();
const { searchQuery, searchHistory, results, loading } = storeToRefs(searchStore);

const op = ref();

const sortSearchHistory = computed(() => searchHistory.value.slice().reverse());

function debounce(func, delay) {
  let timeout;
  return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

const debouncedFetchResults = debounce(() => {
  fetchSearchResults();
}, 300);

const fetchSearchResults = async () => {
  await searchStore.fetchResults();
};

const toggle = (event) => {
  op.value.toggle(event);
}
</script>

<style scoped lang="scss">
.search-header {
  display: flex;
  padding: 0 1rem;
  margin-bottom: 1.5rem;
  justify-content: space-between;

  .query-field {
    display: flex;

    h1 {
      color: var(--p-primary-500);
      margin-right: 1rem;
    }

    .p-inputgroup {
      width: 25rem;
    }
  }

  .search-log {
    .p-button {
      padding: 0.77rem;
    }
  }
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  color: var(--p-primary-500);
  margin-bottom: 20px;
}
</style>
