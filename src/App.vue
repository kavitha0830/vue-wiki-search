<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, RouterView } from 'vue-router'
import { useSearchStore } from '@/stores/searchStore'

import WikiSearch from './components/search/WikiSearch.vue'
import WikiResults from './components/search/WikiResults.vue'
</script>

<template>
  <div class="wrapper">
    <WikiSearch />
    <div class='divider'></div>
    <WikiResults />
  </div>
</template>

<style scoped lang="scss">
.divider {
  border-bottom: 1px solid #aeb5ae;
}

</style>
