import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.0.211.63:8000/sim/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const api_form = axios.create({
  baseURL: "http://10.0.211.63:8000/sim/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
