<template>
  <div class="flex column gap-6" data-testid="product-list">
    <div class="productListTopSection">
      <div class="textTitle xl">Products</div>

      <div class="filtersWrapper">
        <TextField
          v-model="filtersStore.searchText"
          clearale
          :debounce="500"
          placeholder="Search products..."
        />

        <SelectField v-model="filtersStore.sortBy" multiselect :options="sortByOptions" />
      </div>
    </div>

    <div class="productListBottomSection flex column gap-5 justify-center">
      <template v-if="productsLoading"> Loading... </template>
      <template v-else>
        <template v-if="filteredProducts.length">
          <div class="productsListContainer">
            <ProductItem v-for="product in filteredProducts" :key="product.id" v-bind="product" />
          </div>
        </template>

        <template v-else>
          <div class="flex justify-center fullWidth textTitle sm">No products found</div>
        </template>

        <template v-if="shouldPaginate">
          <div ref="loadMoreRef"></div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useProductsStore from '@/stores/products/products';
import useFiltersStore, { type SortByValue } from '@/stores/filters/filters';
import TextField from '../shared/textField/TextField.vue';
import ProductItem from '../productItem/ProductItem.vue';
import SelectField from '../shared/selectField/SelectField.vue';

const route = useRoute();
const router = useRouter();

const sortByOptions = [
  { label: 'Name', value: 'name' },
  { label: 'Price', value: 'price' },
];

const loadMoreRef = ref(null);
const productsStore = useProductsStore();

const products = computed(() => productsStore.productsData);
const productsLoading = computed(() => productsStore.productsLoading);
const productsNextPage = computed(() => productsStore.productsNextPage);

const filtersStore = useFiltersStore();

const currentPage = computed(() => filtersStore.currentPage);
const sortFilter = computed(() => filtersStore.sortFilter);
const filteringParams = computed(() => filtersStore.filteringParams);
const searchText = computed(() => filtersStore.searchText);

const filteredProducts = computed(() => {
  const query = filtersStore.searchText.toLowerCase();

  return products.value.filter(
    (item) =>
      item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query),
  );
});

const shouldPaginate = computed(
  () => !!productsNextPage.value && filteredProducts.value.length > 7,
);

const loadMoreObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !!productsNextPage.value) {
      filtersStore.setCurrentPage(filtersStore.currentPage + 1);
    }
  },
  { rootMargin: '10px' },
);

watch(loadMoreRef, (newValue) => {
  if (newValue) {
    loadMoreObserver.observe(newValue);
  }
});

// filters store is responsible to set query params
watchEffect(async () => {
  await router.replace({
    query: {
      ...route.query,
      ...filteringParams.value,
      search: searchText.value || undefined,
    },
  });
});

// query params are responsible to fetch new data
watch(
  () => route.query,
  (newRoute, oldRoute) => {
    productsStore.fetchProducts(filteringParams.value, newRoute.sort === oldRoute.sort);
  },
  { deep: true },
);

watch(searchText, () => {
  filtersStore.setCurrentPage(1);
});

watch(sortFilter, () => {
  filtersStore.setCurrentPage(1);
});

onMounted(() => {
  //set sortBy in store from route
  if (route.query.sort) {
    const selectedSortOptions = String(route.query.sort)
      .split(',')
      .map((option) => {
        return {
          label: option.charAt(0).toUpperCase() + option.slice(1),
          value: option,
        };
      });

    filtersStore.setSortBy(selectedSortOptions as SortByValue);
  }

  //set searchtext in store from route
  if (route.query.search) {
    filtersStore.setSearchText(String(route.query.search));
  }

  productsStore.fetchProducts({
    ...filteringParams.value,
    page: currentPage.value,
  });
});
</script>

<style scoped lang="scss">
.productListTopSection {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 940px) {
    flex-direction: column;
  }

  .filtersWrapper {
    display: flex;
    gap: 20px;

    @media (max-width: 690px) {
      flex-direction: column;
    }
  }
}

.productsListContainer {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(250px, 1fr));
  }

  @media (max-width: 880px) {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(1, minmax(250px, 1fr));
  }
}

.loadMoreBtn {
  margin: auto 0 0 0;
}
</style>
