import { useQuery } from "@tanstack/react-query"
import { productActions } from "..";

interface Options {
  filterKey?: string;
}

export const useProducts = ({ filterKey }: Options) => {
  const { isLoading, isError, data: products = [], isFetching, error } = useQuery({
    queryKey: ['products', { filterKey }],
    queryFn: ()  => productActions.getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60,
  })
  
  return {
    error,
    isError,
    isLoading,
    isFetching,
    products
  }
}
