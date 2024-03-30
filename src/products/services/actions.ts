import { type Product, productsApi } from "..";


export const sleep = (seconds: number = 1): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}

interface GetProductsOptions {
  filterKey?: string;
}

export const getProducts = async ({ filterKey }: GetProductsOptions): Promise<Product[]> => {
  const filterURL = (filterKey) ? `category=${filterKey}` : '';
  const { data } = await productsApi.get<Product[]>(`/products?${filterURL}`);
  return data;
};



export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};

interface ProductLike {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const createProduct = async (product: ProductLike) => {
  await sleep(5);
  const { data } = await productsApi.post<Product>('/products', product);
  return data;
}