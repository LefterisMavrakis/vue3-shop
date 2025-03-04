export type ApiProduct = {
  id: number
  name: string
  price: number
  description: string
  image: string | null
}

export type GetProductsApiResponse = ApiProduct[]

export type GetProductsRequestParams = {
  page?: number
  per_page?: number
}
