import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';

export type SortOptions = 'name' | 'price';

export type SortByValue = {
  label: string;
  value: SortOptions;
}[];

export const useFiltersStore = defineStore('filters', () => {
  const route = useRoute();
  const currentPage = ref(Number(route.query.page || 1));
  const searchText = ref('');
  const sortBy = ref<SortByValue>([
    {
      label: 'Name',
      value: 'name',
    },
  ]);

  const sortFilterToString = computed(
    () => sortBy.value?.map((item) => item.value).join(',') ?? undefined,
  );

  const filteringParams = computed(() => {
    return {
      page: currentPage.value,
      sort: sortFilterToString.value || undefined,
    };
  });

  const setCurrentPage = (page: number) => {
    currentPage.value = page;
  };

  const setSortBy = (options: SortByValue) => {
    sortBy.value = options;
  };

  const setSearchText = (text: string) => {
    searchText.value = text;
  };

  const resetFilters = () => {
    searchText.value = '';
    setCurrentPage(1);
  };

  return {
    currentPage,
    setCurrentPage,
    resetFilters,
    searchText,
    sortBy,
    setSortBy,
    sortFilter: sortFilterToString,
    filteringParams,
    setSearchText,
  };
});

export default useFiltersStore;
