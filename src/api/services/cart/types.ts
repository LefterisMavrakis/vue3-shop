export type ApiCartItem = {
  id: string
  productId: number
  name: string
  price: number
  description: string
  image: string | null
  category: string
  quantity: number
}

export type GetCartApiResponse = ApiCartItem[]
