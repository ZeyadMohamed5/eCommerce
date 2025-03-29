import axios from "axios";

export const BASE_URL = "https://dummyjson.com/products";

export async function getProducts() {
  try {
    const response = await axios.get(`${BASE_URL}?limit=0`);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

export async function fetchProducts(
  limit: number,
  skip: number,
  category?: string
) {
  let URL = `${BASE_URL}?limit=${limit}&skip=${skip}`;

  if (category) {
    URL = `${BASE_URL}/category/${category}/?limit=${limit}&skip=${skip}`;
  }
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return { products: [], total: 0 };
  }
}

export async function getProductById(id: number | undefined | string) {
  // I used Number and string because in product page the useParams needs it to be string
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}

export async function getBySearch(query: number | string) {
  try {
    const response = await axios.get(`${BASE_URL}/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with query ${query}:`, error);
    return null;
  }
}
