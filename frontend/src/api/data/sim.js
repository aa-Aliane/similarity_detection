import { api } from "../api";


export const getMostSimilar = async (text) => {
  let response = await api.get(`most_similar/?text=${text}`);
  return response.data.results;
};

export const getMostSimilarMono = async (text) => {
  let response = await api.get(`most_similar_mono/?text=${text}`);
  return response.data.results;
};

export const getDetails = async (article_id, target) => {

  console.log("uuuuuuuuuuuuuuuuu", target, article_id);
  let response = await api.get(
    `details/?article_id=${article_id}&target=${target}`
  );

  return response.data.results;
};
