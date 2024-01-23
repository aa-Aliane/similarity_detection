import { api } from "../api";
import { useNavigate } from "react-router-dom";

export const getMostSimilar = async (text) => {
  let response = await api.get(`most_similar/?text=${text}`);
  console.log(response.data.results);
  return response.data.results;
};

export const getDetails = async (article_id, target) => {

  console.log("uuuuuuuuuuuuuuuuu", target, article_id);
  let response = await api.get(
    `details/?article_id=${article_id}&target=${target}`
  );

  return response.data.results;
};
