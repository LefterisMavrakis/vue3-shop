import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filters', () => {
  const route = useRoute()
  const currentPage = ref(Number(route.query.page || 1))

  const setCurrentPage = (page: number) => {
    currentPage.value = page
  }

  const resetFilters = () => {
    setCurrentPage(1)
  }

  return {
    currentPage,
    setCurrentPage,
    resetFilters,
  }
})

export default useFiltersStore
