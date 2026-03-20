
import axios from "axios";

const API = "http://127.0.0.1:8000";

export const predict = async (text) => {
  const response = await axios.post(`${API}/predict`, { text });
  return response.data;
};