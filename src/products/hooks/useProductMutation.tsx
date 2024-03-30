import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Product, productActions } from ".."

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate: (product) => {
      console.log('Mutando - Optimistic Update');
      // 1. Optimistic Product
      const optimisticProduct = { id: Math.random(), ...product };
      // 2. Store product in query client store
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (old) => {
          if (!old) return [optimisticProduct];
          return [...old, optimisticProduct]
        }
      );
      return {
        optimisticProduct
      }
    },
    onSuccess: (product, _, context) => {
      // queryClient.invalidateQueries({
      //   queryKey: ['products', { filterKey: product.category }]
      // })
      queryClient.removeQueries({
        queryKey: ['products', context?.optimisticProduct.id]
      })
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (old) => {
          if (!old) return [product];
          // return [...old, product]
          return old.map(cacheProduct => {
            return cacheProduct.id === context?.optimisticProduct.id ? product : cacheProduct
          })
        }
      );
    },
    onError: (_, variables, context) => {
      queryClient.removeQueries({
        queryKey: ['products', context?.optimisticProduct.id]
      });

      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: variables.category }],
        (old) => {
          if (!old) return [];
          // return [...old, product]
          return old.filter(cacheProduct => cacheProduct.id !== context?.optimisticProduct.id)
        }
      );
    }
  })

  return mutation;
}
