import { api } from "../api";


export const getMostSimilar = async (text) => {
    let response = await api.get(`most_similar/?text=${text}`)
    return response.data
}