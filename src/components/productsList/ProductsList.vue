<template>
  <div class="flex column gap-6" data-testid="product-list">
    <div class="productListTopSection">
      <div class="textTitle xl">Products List</div>

      <TextField
        v-model="filtersStore.searchText"
        clearale
        :debounce="500"
        placeholder="Search product by name or category"
      />
    </div>

    <div class="productListBottomSection flex column gap-5 justify-center">
      <template v-if="productsLoading"> Loading... </template>
      <template v-else>
        <div class="productsListContainer">
          <ProductItem v-for="product in filteredProducts" :key="product.id" v-bind="product" />
        </div>

        <template v-if="!!productsNextPage">
          <div ref="loadMoreRef" class="mainButton small outlined loadMoreBtn">Load more</div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import useProductsStore from '@/stores/products/products'
import useFiltersStore from '@/stores/filters/filters'
import TextField from '../shared/textField/TextField.vue'
import ProductItem from '../productItem/ProductItem.vue'

const loadMoreRef = ref(null)
const productsStore = useProductsStore()

const products = computed(() => productsStore.productsData)
const productsLoading = computed(() => productsStore.productsLoading)
const productsNextPage = computed(() => productsStore.productsNextPage)

const filtersStore = useFiltersStore()
const currentPage = computed(() => filtersStore.currentPage)

const filteredProducts = computed(() => {
  const query = filtersStore.searchText.toLowerCase()

  return products.value.filter(
    (item) =>
      item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query),
  )
})

const loadMoreObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !!productsNextPage.value) {
      filtersStore.setCurrentPage(filtersStore.currentPage + 1)
    }
  },
  { rootMargin: '10px' },
)

watch(loadMoreRef, (newValue) => {
  if (newValue) {
    loadMoreObserver.observe(newValue)
  }
})

watch(currentPage, (newValue) => {
  productsStore.fetchProducts(
    {
      page: newValue,
    },
    true,
  )
})

onMounted(() => {
  productsStore.fetchProducts({
    page: currentPage.value,
  })
})
</script>

<style scoped lang="scss">
.productListTopSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
