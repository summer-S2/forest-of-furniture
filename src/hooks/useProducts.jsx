import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts as fetchProducts,
  addNewProduct,
  updateToProduct,
} from "../api/firebase";

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(["products"], fetchProducts, {
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    }
  );

  const updateProduct = useMutation(
    ({ id, product, url }) => updateToProduct(id, product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    }
  );

  return { productsQuery, addProduct, updateProduct };
}
