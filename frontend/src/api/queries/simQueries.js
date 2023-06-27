import { useMutation, useQuery } from "react-query";
import { getMostSimilar } from "../data/sim";

/**
 * Custom hook for performing the most similar text mutation.
 *
 * @returns {Object} - Mutation result object.
 */
export const useMostSimilarMutation = () => {
  const mutation = useMutation((text) => getMostSimilar(text), {
    onSuccess: (data) => {
      queryClient.setQueryData("docs", data);
    },
  });

  const mutate = (text) => mutation.mutate(text);

  

  return {
    mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};
