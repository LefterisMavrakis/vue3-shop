export type ApiProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string | null;
  category: string;
};

export type GetProductsApiResponse = {
  data: ApiProduct[];
  next: number | null;
};

export type GetProductsRequestParams = {
  page?: number;
  per_page?: number;
  sort?: string;
};
