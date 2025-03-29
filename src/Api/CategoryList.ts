import axios from "axios";
import { BASE_URL } from "./Products";

export async function getCategory() {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    return null;
  }
}
