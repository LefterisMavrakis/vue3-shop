import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filters', () => {
  const route = useRoute()
  const currentPage = ref(Number(route.query.page || 1))
  const searchText = ref('')

  const setCurrentPage = (page: number) => {
    currentPage.value = page
  }

  const resetFilters = () => {
    searchText.value = ''
    setCurrentPage(1)
  }

  return {
    currentPage,
    setCurrentPage,
    resetFilters,
    searchText,
  }
})

export default useFiltersStore
