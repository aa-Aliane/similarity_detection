import { useMutation, useQueryClient } from "react-query";
import { getMostSimilar, getDetails } from "../data/sim";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for performing the most similar text mutation.
 *
 * @returns {Object} - Mutation result object.
 */

export const useMostSimilarMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation((text) => getMostSimilar(text), {
    onSuccess: (data) => {
      queryClient.setQueryData("docs", data);
      navigate("/results");
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

export const useDetailsMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ article_id, target }) => getDetails(article_id, target),
    {
      onSuccess: (data) => {
        queryClient.setQueryData("details", data);
        navigate("/details");
      },
    }
  );

  const mutate = (article_id, target) =>
    mutation.mutate({ article_id, target });

  return {
    mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};
