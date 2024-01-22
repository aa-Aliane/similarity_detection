import { api } from "../api";

export const getMostSimilar = async (text) => {
  let response = await api.get(`most_similar/?text=${text}`);
  console.log(response.data.results);
  return response.data.results;
};

export const getDetails= async (article_id, target) => {
  let response = await api.get(`details/?article_id=${article_id}&target=${target}`);
  console.log(response.data.results);
  return response.data.results;
};
